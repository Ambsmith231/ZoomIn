const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

const upload = require("../middleware/uploadMiddleware");

// Public
router.get("/", productController.getProducts);

router.get("/:id", productController.getProduct);

router.get("/:id", productController.getProductById);

// Admin
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    upload.single("image"),
    productController.createProduct
);

router.put(
    "/archive/:id",
    authMiddleware,
    adminMiddleware,
    productController.archiveProduct
);

module.exports = router;