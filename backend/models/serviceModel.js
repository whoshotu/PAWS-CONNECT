const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['vet', 'groomer', 'store', 'fashion', 'rehoming', 'specialty medical', 'cosmetic services'],
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    },
  },
  contactInfo: {
    type: Object,
    required: true,
  },
  website: {
    type: String,
  },
  businessHours: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
    enum: ['mobile', 'on-site', 'both'],
    required: true,
  },
}, {
  timestamps: true,
});

serviceSchema.index({ location: '2dsphere' });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
