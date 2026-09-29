const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

// TODO: plug in your existing auth middleware, e.g.:
// const { protect, authorize } = require('../middleware/auth');

router.get('/', getCategories);
router.get('/:id', getCategory);

// Admin-only actions — wire up role protection once your auth middleware is ready:
// router.post('/', protect, authorize('admin'), createCategory);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
