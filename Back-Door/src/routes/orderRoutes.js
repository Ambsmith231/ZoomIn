const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Client routes
router.post('/', authMiddleware, orderController.createOrder);

// Admin routes
router.get('/', [authMiddleware, adminMiddleware], orderController.getAllOrders);
router.patch('/:orderId/verify', [authMiddleware, adminMiddleware], orderController.verifyAndArchiveOrder);

module.exports = router;