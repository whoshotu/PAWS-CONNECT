const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/services - Create a new service
router.post('/', protect, serviceController.createService);

// GET /api/services - Get all services
router.get('/', serviceController.getServices);

// GET /api/services/:id - Get a single service by ID
router.get('/:id', serviceController.getServiceById);

// PUT /api/services/:id - Update a service
router.put('/:id', protect, serviceController.updateService);

// DELETE /api/services/:id - Delete a service
router.delete('/:id', protect, serviceController.deleteService);

module.exports = router;
