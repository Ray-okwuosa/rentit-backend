// Adjust the require path/fields below to match your existing User model.
const User = require('../models/User');

// @desc  Get the logged-in user's profile
// @route GET /api/profile
// Requires auth middleware that sets req.user.id
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc  Update the logged-in user's profile
// @route PUT /api/profile
exports.updateProfile = async (req, res) => {
  try {
    // Only allow updating safe, non-sensitive fields.
    // Rename/extend this list to match your real User schema.
    const allowedFields = ['name', 'phone', 'location'];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
