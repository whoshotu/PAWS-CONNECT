require('dotenv').config({ path: __dirname + '/../.env' });
const connectDB = require('../config/db');
const User = require('../models/userModel');
const Pet = require('../models/petModel');
const Post = require('../models/postModel');
const Service = require('../models/serviceModel');
const Insight = require('../models/insightModel');

const generateInsights = async () => {
  try {
    await connectDB();

    const userCount = await User.countDocuments();
    const petCount = await Pet.countDocuments();
    const postCount = await Post.countDocuments();
    const serviceCount = await Service.countDocuments();

    const insights = [
      { metricName: 'userCount', value: userCount, date: new Date() },
      { metricName: 'petCount', value: petCount, date: new Date() },
      { metricName: 'postCount', value: postCount, date: new Date() },
      { metricName: 'serviceCount', value: serviceCount, date: new Date() },
    ];

    await Insight.insertMany(insights);

    console.log('Successfully generated and saved insights.');
  } catch (error) {
    console.error('Error generating insights:', error);
  } finally {
    process.exit();
  }
};

generateInsights();
