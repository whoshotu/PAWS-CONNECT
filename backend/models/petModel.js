const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
  },
  photos: {
    type: [String],
  },
  temperament: {
    type: String,
  },
  healthIssues: {
    type: [String],
  },
  allergies: {
    type: [String],
  },
  medications: {
    type: [String],
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual for pet's age
petSchema.virtual('age').get(function() {
  if (this.dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  } else {
    const today = new Date();
    const createDate = new Date(this.createdAt);
    let age = today.getFullYear() - createDate.getFullYear();
    const m = today.getMonth() - createDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < createDate.getDate())) {
      age--;
    }
    return age;
  }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
