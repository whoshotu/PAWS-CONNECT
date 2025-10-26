const Insight = require('../models/insightModel');

// @desc    Get all insights
// @route   GET /api/insights
// @access  Public
const getInsights = async (req, res) => {
  try {
    const insights = await Insight.find({}).sort({ date: -1 });
    res.status(200).json(insights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInsights,
};