const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/pets - Create a new pet
router.post('/', protect, petController.createPet);

// GET /api/pets - Get all pets for the logged-in user
router.get('/', protect, petController.getPets);

// GET /api/pets/:id - Get a single pet by ID
router.get('/:id', petController.getPetById);

// PUT /api/pets/:id - Update a pet
router.put('/:id', protect, petController.updatePet);

// DELETE /api/pets/:id - Delete a pet
router.delete('/:id', protect, petController.deletePet);

module.exports = router;
