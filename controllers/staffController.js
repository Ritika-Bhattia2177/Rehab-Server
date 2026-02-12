const Staff = require('../models/Staff');

// Get all active staff
exports.getAllStaff = async (req, res) => {
  try {
    const { role } = req.query;
    const filter = { isActive: true };
    
    if (role) {
      filter.role = role;
    }

    const staff = await Staff.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: staff.length,
      data: staff
    });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch staff'
    });
  }
};

// Get staff by ID
exports.getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        error: 'Staff member not found'
      });
    }

    res.json({
      success: true,
      data: staff
    });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch staff'
    });
  }
};

// Create staff (admin)
exports.createStaff = async (req, res) => {
  try {
    const staff = await Staff.create(req.body);

    res.status(201).json({
      success: true,
      data: staff
    });
  } catch (error) {
    console.error('Error creating staff:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to create staff'
    });
  }
};

// Update staff (admin)
exports.updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!staff) {
      return res.status(404).json({
        success: false,
        error: 'Staff member not found'
      });
    }

    res.json({
      success: true,
      data: staff
    });
  } catch (error) {
    console.error('Error updating staff:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to update staff'
    });
  }
};

// Delete staff (admin)
exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        error: 'Staff member not found'
      });
    }

    res.json({
      success: true,
      message: 'Staff member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting staff:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete staff'
    });
  }
};
