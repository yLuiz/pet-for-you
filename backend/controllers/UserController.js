const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const environment = require('../environment/environment');

// Helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');


module.exports = class UserController {
  static async register(req, res) {
    
    const { name, email, phone, password, confirmpassword } = req.body;

    if(!name) {
      return res.status(422).json({
        message: 'O nome é obrigatório!'
      })
    }

    if(!email) {
      return res.status(422).json({
        message: 'O e-mail é obrigatório!'
      })
    }

    if(!password) {
      return res.status(422).json({
        message: 'A senha é obrigatória!'
      })
    }

    if(!confirmpassword) {
      return res.status(422).json({
        message: 'A confirmação de senha é obrigatória!'
      })
    }

    if(!phone) {
      return res.status(422).json({
        message: 'O telefone é obrigatório!'
      })
    }

    if(password !== confirmpassword) {
      return res.status(422).json({
        message: 'A confirmação de senha não corresponde a senha inserida!'
      });
    }

    const userExists = await User.findOne({ email });
    if(userExists) {
      return res.status(422).json({
        message: "Por favor, utilize outro e-mail!"
      })
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // // Create user
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash
    })

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
       
    } 
    catch (error) {
      res.status(500).json({ message: error.message ? error.message : "Internal error!" });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!email) {
      return res.status(422).json({ 
        message: 'O e-mail é obrigatório!' 
      })
    }
    
    if(!password) {
      return res.status(422).json({ 
        message: 'A senha é obrigatória!' 
      })
    }

    if(!user) {
      return res.status(422).json({
        message: "Usuário não encontrado!"
      })
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if(!isCorrectPassword) {
      return res.status(400).json({ messages: 'Credênciais incorretas!' })
    }

    try {
      await createUserToken(user, req, res);
    } 
    catch (error) {
      res.status(500).json({ message: error.message ? error.message : "Internal error!" });
    }
  }

  static async checkUser(req, res) {  
    let currentUser;

    if(req.headers.authorization) {
      try {
        const token = getToken(req);
        const isValidToken = jwt.verify(token, environment.JWT_SECRET);
        const userInformations = isValidToken;

        currentUser = await User.findById(userInformations.id);
        currentUser.password = undefined;

        return res.status(200).json({ message: "Autenticado!", data: currentUser });

      } 
      catch (error) {
        res.status(500).json({ message: error.message ? error.message : "Internal error!" });
      }
    } else {
      currentUser = null;
    }
  }

  static async getUserById(req, res) {  
    const userId = req.params.id;

    try {
      const user = await User.findById(userId).select("-password");

      if(!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }
      return res.status(200).json({ message: "Usuário encontrado!", data: user });
    } 
    catch (error) { 
      res.status(500).json({ message: error.message ? error.message : "Internal error!" });
    }
  }

  static async updateUser(req, res) { 
    const userId = req.params.id;
    const token = getToken(req);

    const userExists = await getUserByToken(token, User);
    if(!userExists) { 
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const { name, email, password, confirmpassword, phone} = req.body
    const emailDuplicate = await User.findOne({ email });

    if(!name) {
      return res.status(422).json({
        message: 'O nome é obrigatório!'
      })
    }

    userExists.name = name;

    if(!email) {
      return res.status(422).json({
        message: 'O e-mail é obrigatório!'
      })
    }

    if(emailDuplicate && emailDuplicate.email !== userExists.email) { 
      return res.status(400).json({ message: "Este e-mail já está em uso!"});
    }

    userExists.email = email;

    if(!password) {
      return res.status(422).json({
        message: 'A senha é obrigatória!'
      })
    }

    if(!confirmpassword) {
      return res.status(422).json({
        message: 'A confirmação de senha é obrigatória!'
      })
    }

    if(!phone) { 
      return res.status(422).json({
        message: 'O telefone é obrigatório!'
      })
    }

    userExists.phone = phone;

    if(password !== confirmpassword) {
      return res.status(422).json({
        message: 'A confirmação de senha não corresponde a senha inserida!'
      });
    } else if(password !== null && password === confirmpassword) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      userExists.password = passwordHash;
    }

    try { 
      const userUpdate = await User.findByIdAndUpdate(userId, userExists, { new: true });
      userUpdate.password = undefined;
      return res.status(200).json({ message: "Usuário atualizado!", data: userUpdate });
    }
    catch (error) {
      return res.status(500).json({ message: error.message ? error.message : "Internal error!" });
    }
  }

}