const express = require('express');
const router = express.Router();
const insightController = require('../controllers/insightController');

// GET /api/insights - Get all insights
router.get('/', insightController.getInsights);

module.exports = router;