const Pet = require("../models/Pet");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const User = require("../models/User");
const { ObjectId } = require("mongodb");

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

module.exports = class PetController {
  static async register(req, res) {
    const { name, age, weight, color } = req.body;
    const images = req.files;

    const available = true;

    if (!images.length) {
      return res.status(400).json({ error: "Imagem é obrigária!" });
    }

    if (!name) {
      return res.status(400).json({
        error: "Nome é obrigário!",
      });
    }

    if (!age) {
      return res.status(400).json({ error: "Idade é obrigária!" });
    }

    if (!weight) {
      return res.status(400).json({ error: "Peso é obrigário!" });
    }

    if (!color) {
      return res.status(400).json({ error: "Cor é obrigária!" });
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
        phone: user.phone,
      },
    });

    images.map((image) => {
      // console.log(image);
      pet.images.push(image.filename);
    });

    try {
      const newPet = await pet.save();
      return res.status(201).json({
        message: "Pet criado com sucesso!",
        newPet,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async getAll(req, res) {
    const pets = await Pet.find().sort("-createdAt");
    return res.status(200).json({ pets });
  }

  static async getAllUserPets(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token, User);

    const userPets = await Pet.find({ "user._id": user._id }).sort(
      "-createdAt"
    );
    return res.status(200).json({ userPets });
  }

  static async getAllUserAdoptions(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token, User);
    const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt");

    return res.status(200).json({ pets });
  }

  static async getPetById(req, res) {
    const { id: _id } = req.params;

    if (!ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const pet = await Pet.findOne({ _id });
    if (!pet) return res.status(404).json({ message: "Pet não encontrado" });

    return res.status(200).json({ pet });
  }

  static async deletePetById(req, res) {
    const { id: _id } = req.params;

    if (!ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const pet = await Pet.findOne({ _id });
    if (!pet) return res.status(404).json({ message: "Pet não encontrado" });

    const token = getToken(req);
    const user = await getUserByToken(token, User);

    if (pet.user._id.toString() !== user._id.toString()) {
      return res
        .status(422)
        .json({ message: "Hoveu um problema na solicitação!" });
    }

    return Pet.findOneAndRemove(_id)
      .then(() => {
        pet.images.map(image => {
          promisify(fs.unlink)(path.resolve(__dirname, '..', 'public', 'images', 'pets', image))
        })

        return res.status(200).json({ message: "Pet deletado!", pet });
      });
  }
 
  static async updatePetById(req, res) {
    const { id: _id } = req.params;

    if (!ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const pet = await Pet.findOne({ _id });
    if (!pet) return res.status(404).json({ message: "Pet não encontrado" });

    const token = getToken(req);
    const user = await getUserByToken(token, User);

    if (pet.user._id.toString() !== user._id.toString()) {
      return res
        .status(422)
        .json({ message: "Hoveu um problema na solicitação!" });
    }

    const { name, age, weight, color, available } = req.body;
    const images = req.files;

    let updatedData = {};
    if (!name) {
      return res.status(400).json({
        error: "Name é obrigário!",
      });
    }

    if (!age) {
      return res.status(400).json({ error: "Idade é obrigária!" });
    }

    if (!weight) {
      return res.status(400).json({ error: "Peso é obrigário!" });
    }

    if (!color) {
      return res.status(400).json({ error: "Cor é obrigária!" });
    }

    if (!images) {
      return res.status(400).json({ error: "Imagem é obrigária!" });
    }

    if (!available) {
      return res.status(400).json({ error: "Status é obrigário!" });
    }

    updatedData = {
      name,
      age,
      weight,
      color,
      available
    };
    updatedData.images = [];
    images.map((image) => {
      updatedData.images.push(image.filename);
    });

    const updatedPet = await Pet.findByIdAndUpdate(_id, updatedData);

    return res.status(200).json({ message: "Pet atualizado com sucesso", updatedPet });
  }

  static async schedule(req, res) {
    const _id = req.params.id;

    const pet = await Pet.findOne({ _id });
    if (!pet) return res.status(404).json({ message: "Pet não encontrado" });

    const token = getToken(req);
    const user = await getUserByToken(token, User);

    // Check if the user is the owner of the pet, if so schedule is invalidated.
    if (pet.user._id.equals(user._id)) return res.status(400).json({ message: "Você não pode agendar seu próprio pet" });

    // Check if user has already scheduled the pet and if so, schedule is invalidated.
    if(pet.adopter) {
      if(pet.adopter._id.equals(user._id)) {
        return res.status(400).json({ message: "Você já agendou uma visita com este pet" });
      }
    }

    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image
    }

    await Pet.findByIdAndUpdate(_id, pet);

    return res.status(200).json({ message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}` });
  }

  static async concludeAdoption(req, res) {
    const _id = req.params.id;

    const pet = await Pet.findOne({ _id });
    if (!pet) return res.status(404).json({ message: "Pet não encontrado" });

    pet.available = false;
    await Pet.findByIdAndUpdate(_id, pet);

    res.status(200).json({ 
      message: "O pet foi adotado com sucesso",
      pet
    });
  }
};
