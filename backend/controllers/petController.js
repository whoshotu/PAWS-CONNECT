const Pet = require('../models/petModel');

// @desc    Create a new pet
// @route   POST /api/pets
// @access  Private
const createPet = async (req, res) => {
  const { name, breed, dateOfBirth, size, photos, temperament, healthIssues, allergies, medications } = req.body;

  if (!name || !breed) {
    return res.status(400).json({ message: 'Please provide all required fields: name and breed' });
  }

  try {
    const pet = await Pet.create({
      owner: req.user.id,
      name,
      breed,
      dateOfBirth,
      size,
      photos,
      temperament,
      healthIssues,
      allergies,
      medications,
    });

    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all pets for the logged-in user
// @route   GET /api/pets
// @access  Private
const getPets = async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user.id });
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single pet by ID
// @route   GET /api/pets/:id
// @access  Public
const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (pet) {
      res.status(200).json(pet);
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a pet
// @route   PUT /api/pets/:id
// @access  Private
const updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // Check if the logged-in user is the owner of the pet
    if (pet.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Update only the allowed fields
    pet.medications = req.body.medications || pet.medications;
    pet.healthIssues = req.body.healthIssues || pet.healthIssues;
    pet.allergies = req.body.allergies || pet.allergies;

    const updatedPet = await pet.save();
    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a pet
// @route   DELETE /api/pets/:id
// @access  Private
const deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // Check if the logged-in user is the owner of the pet
    if (pet.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Pet.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Pet removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet,
};