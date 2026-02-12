const Service = require('../models/Service');

// Get all active services
exports.getAllServices = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    
    if (category && category !== 'all') {
      filter.category = category;
    }

    const services = await Service.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch services'
    });
  }
};

// Get service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch service'
    });
  }
};

// Create service (admin)
exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to create service'
    });
  }
};

// Update service (admin)
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to update service'
    });
  }
};

// Delete service (admin)
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete service'
    });
  }
};

// Enroll in service (increment enrolled count)
exports.enrollService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service not found'
      });
    }

    if (service.enrolled >= service.capacity) {
      return res.status(400).json({
        success: false,
        error: 'Service is at full capacity'
      });
    }

    service.enrolled += 1;
    await service.save();

    res.json({
      success: true,
      message: 'Enrolled successfully',
      data: service
    });
  } catch (error) {
    console.error('Error enrolling service:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to enroll'
    });
  }
};
