const User = require('../models/userModel');
const Pet = require('../models/petModel');

// @desc    Get pet recommendations for the logged-in user
// @route   GET /api/ai/recommendations/pets
// @access  Private
const getPetRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const preferences = user.preferences.pet;

    if (!preferences || (!preferences.breed && !preferences.size && !preferences.age)) {
      return res.status(400).json({ message: 'Please set your pet preferences to get recommendations.' });
    }

    const query = {};

    if (preferences.breed && preferences.breed.length > 0) {
      query.breed = { $in: preferences.breed };
    }

    if (preferences.size && preferences.size.length > 0) {
      query.size = { $in: preferences.size };
    }

    if (preferences.age) {
      const today = new Date();
      const minAge = preferences.age.min || 0;
      const maxAge = preferences.age.max || 100;

      const minBirthDate = new Date(today.getFullYear() - maxAge - 1, today.getMonth(), today.getDate());
      const maxBirthDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());

      query.dateOfBirth = { $gte: minBirthDate, $lte: maxBirthDate };
    }

    const recommendations = await Pet.find(query).limit(10);

    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPetRecommendations,
};