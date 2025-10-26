const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// GET /api/ai/recommendations/pets - Get pet recommendations for the logged-in user
router.get('/recommendations/pets', protect, aiController.getPetRecommendations);

module.exports = router;