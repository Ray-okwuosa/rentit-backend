const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');

// TODO: plug in your existing auth middleware so req.user is set, e.g.:
// const { protect } = require('../middleware/auth');
// router.use(protect);

router.get('/', getProfile);
router.put('/', updateProfile);

module.exports = router;
