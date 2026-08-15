const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

// Initialize database
require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// Serve uploaded images
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/users", userRoutes);

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the E-Commerce API"
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

module.exports = app;