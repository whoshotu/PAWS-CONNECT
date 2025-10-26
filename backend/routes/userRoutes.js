const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// POST /api/users - Create a new user (register)
router.post('/', userController.createUser);

// POST /api/users/login - Authenticate a user
router.post('/login', userController.loginUser);

// GET /api/users - Get all users
router.get('/', userController.getUsers);

// GET /api/users/:id - Get a single user by ID
router.get('/:id', userController.getUserById);

// PUT /api/users/:id - Update a user
router.put('/:id', protect, upload, userController.updateUser);

// DELETE /api/users/:id - Delete a user
router.delete('/:id', protect, userController.deleteUser);

module.exports = router;