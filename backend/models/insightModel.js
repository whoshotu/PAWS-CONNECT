const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
  metricName: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

const Insight = mongoose.model('Insight', insightSchema);

module.exports = Insight;
