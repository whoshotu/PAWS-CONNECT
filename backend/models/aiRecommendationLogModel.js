const mongoose = require('mongoose');

const aiRecommendationLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  recommendationType: {
    type: String,
    enum: ['service', 'friend'],
  },
  context: {
    type: Object,
  },
  output: {
    type: Object,
  },
  feedback: {
    type: String,
    enum: ['clicked', 'dismissed'],
  },
}, {
  timestamps: true,
});

const AIRecommendationLog = mongoose.model('AIRecommendationLog', aiRecommendationLogSchema);

module.exports = AIRecommendationLog;
