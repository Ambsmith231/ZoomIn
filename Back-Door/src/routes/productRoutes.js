const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public route: view available items
router.get('/', productController.getAvailableProducts);

// Admin routes: post new item (with image) & archive sold item
router.post(
  '/', 
  [authMiddleware, adminMiddleware, upload.single('image')], 
  productController.createProduct
);

router.patch(
  '/:id/archive', 
  [authMiddleware, adminMiddleware], 
  productController.archiveProduct
);

module.exports = router;