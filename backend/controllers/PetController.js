const Pet = require('../models/Pet');
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const User = require("../models/User");
const { ObjectId } = require('mongodb');

module.exports = class PetController {
  static async register(req, res){

    const { name, age, weight, color } = req.body;
    const images = req.files;

    const available = true;

    if(!name) {
      return res.status(400).json({
        error: 'Nome é obrigário!'
      });
    }

    if(!age) {
      return res.status(400).json({ error: 'Idade é obrigária!' });
    }

    if(!weight) { 
      return res.status(400).json({ error: 'Peso é obrigário!' });
    }

    if(!color) {
      return res.status(400).json({ error: 'Cor é obrigária!' });
    }

    if(!images) {
      return res.status(400).json({ error: 'Imagem é obrigária!'});
    }

    const token = getToken(req);
    const user = await getUserByToken(token, User);
    const pet = new Pet({
      name,
      age,
      weight,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone
      }
    })

    images.map((image) => {
      console.log(image);
      pet.images.push(image.filename);
    })
    
    try {
      const newPet = await pet.save();
      return res.status(201).json({ 
        message: 'Pet criado com sucesso!',
        newPet
      });
      
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getAll(req, res){ 
    const pets = await Pet.find().sort('-createdAt');
    return res.status(200).json({ pets });
  }

  static async getAllUserPets(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token, User);

    const userPets = await Pet.find({'user._id': user._id}).sort('-createdAt');
    return res.status(200).json({ userPets });
  }
}