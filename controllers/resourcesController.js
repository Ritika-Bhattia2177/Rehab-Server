const Resource = require('../models/Resource');

// Get all active resources
exports.getAllResources = async (req, res) => {
  try {
    const { type, category } = req.query;
    const filter = { isActive: true };
    
    if (type && type !== 'all') {
      filter.type = type;
    }
    
    if (category && category !== 'all') {
      filter.category = category;
    }

    const resources = await Resource.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch resources'
    });
  }
};

// Get resource by ID
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        error: 'Resource not found'
      });
    }

    // Increment views
    resource.views += 1;
    await resource.save();

    res.json({
      success: true,
      data: resource
    });
  } catch (error) {
    console.error('Error fetching resource:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch resource'
    });
  }
};

// Create resource (admin)
exports.createResource = async (req, res) => {
  try {
    const resource = await Resource.create(req.body);

    res.status(201).json({
      success: true,
      data: resource
    });
  } catch (error) {
    console.error('Error creating resource:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to create resource'
    });
  }
};

// Update resource (admin)
exports.updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!resource) {
      return res.status(404).json({
        success: false,
        error: 'Resource not found'
      });
    }

    res.json({
      success: true,
      data: resource
    });
  } catch (error) {
    console.error('Error updating resource:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to update resource'
    });
  }
};

// Delete resource (admin)
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        error: 'Resource not found'
      });
    }

    res.json({
      success: true,
      message: 'Resource deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete resource'
    });
  }
};
