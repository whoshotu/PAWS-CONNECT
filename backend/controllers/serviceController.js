const Service = require('../models/serviceModel');
const { moderateContent } = require('../ai/utils/contentModeration');

// @desc    Create a new service
// @route   POST /api/services
// @access  Private
const createService = async (req, res) => {
  const { name, category, location, contactInfo, website, businessHours, serviceType } = req.body;

  // TODO: Add user role check here (only 'business' and 'admin' users can create services)

  if (!name || !category || !contactInfo || !businessHours || !serviceType) {
    return res.status(400).json({ message: 'Please provide all required fields: name, category, contactInfo, businessHours, and serviceType' });
  }

  if ((serviceType === 'on-site' || serviceType === 'both') && !location) {
    return res.status(400).json({ message: 'Please provide a location for on-site businesses' });
  }

  try {
    const isNameSafe = await moderateContent(name);
    if (!isNameSafe) {
      return res.status(400).json({ message: 'Service name contains inappropriate content.' });
    }

    const service = await Service.create({
      owner: req.user.id,
      name,
      category,
      location,
      contactInfo,
      website,
      businessHours,
      serviceType,
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const { category, serviceType, lat, lng, radius } = req.query;

  const query = {};

  if (category) {
    query.category = category;
  }

  if (serviceType) {
    query.serviceType = serviceType;
  }

  // Geospatial query
  if (lat && lng) {
    const radiusInKm = radius ? Number(radius) : 10; // Default radius of 10km
    query.location = {
      $geoWithin: {
        $centerSphere: [[Number(lng), Number(lat)], radiusInKm / 6378.1], // 6378.1 is the radius of the Earth in km
      },
    };
  }

  try {
    const count = await Service.countDocuments(query);
    const services = await Service.find(query)
      .sort({ name: 1 }) // Default sort by name ascending
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.status(200).json({
      services,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single service by ID
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Check if the logged-in user is the owner of the service
    if (service.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const isNameSafe = await moderateContent(req.body.name);
    if (!isNameSafe) {
      return res.status(400).json({ message: 'Service name contains inappropriate content.' });
    }

    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Check if the logged-in user is the owner of the service
    if (service.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await service.deleteOne();

    res.status(200).json({ message: 'Service removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};