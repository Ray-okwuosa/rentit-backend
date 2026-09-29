const Category = require('../models/Category');

// @desc  Get all categories (Renter/Owner see active only, Admin sees all)
// @route GET /api/categories
exports.getCategories = async (req, res) => {
  try {
    const filter = req.user && req.user.role === 'admin' ? {} : { isActive: true };
    const categories = await Category.find(filter).sort({ name: 1 });
    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc  Get a single category
// @route GET /api/categories/:id
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc  Create a category (Admin only)
// @route POST /api/categories
exports.createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Category name is required' });
    const category = await Category.create({ name, description, image });
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'A category with this name already exists' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc  Update a category (Admin only)
// @route PUT /api/categories/:id
exports.updateCategory = async (req, res) => {
  try {
    const { name, description, image, isActive } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, image, isActive },
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc  Delete a category (Admin only)
// @route DELETE /api/categories/:id
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
    res.status(200).json({ success: true, message: 'Category deleted', data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
