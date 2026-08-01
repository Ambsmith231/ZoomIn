const db = require("../config/db");

// =========================
// Create Product
// =========================
exports.createProduct = (req, res) => {

    try {

        const {
            title,
            description,
            category,
            price,
            
        } = req.body;

        if (
            !title ||
            !category ||
            !price
            // !quantity
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        const imageUrl = req.file
            ? "/uploads/" + req.file.filename
            : "";

        const result = db.prepare(`
            INSERT INTO products
            (
                title,
                description,
                category,
                price,
                imageUrl
            )
            VALUES
            (?, ?, ?, ?, ?)
        `).run(
            title,
            description || "",
            category,
            Number(price),
            // Number(quantity),
            imageUrl
        );

        return res.status(201).json({
            success: true,
            message: "Product created successfully.",
            productId: result.lastInsertRowid
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Unable to create product."
        });

    }

};

// =========================
// Get All Products
// =========================
exports.getProducts = (req, res) => {

    const products = db.prepare(`
        SELECT *
        FROM products
        WHERE isAvailable = 1
        ORDER BY createdAt DESC
    `).all();

    return res.json({
        success: true,
        products
    });

};

// =========================
// Get One Product
// =========================
exports.getProduct = (req, res) => {

    const product = db.prepare(`
        SELECT *
        FROM products
        WHERE id = ?
    `).get(req.params.id);

    if (!product) {

        return res.status(404).json({
            success: false,
            message: "Product not found."
        });

    }

    return res.json({
        success: true,
        product
    });

};
// To get product by ID and the product info
exports.getProductById = (req, res) => {

    const product = db.prepare(
        "SELECT * FROM products WHERE id = ?"
    ).get(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found."
        });
    }

    res.json({
        success: true,
        product
    });
};


// =========================
// Archive Product
// =========================
exports.archiveProduct = (req, res) => {

    db.prepare(`
        UPDATE products
        SET isAvailable = 0
        WHERE id = ?
    `).run(req.params.id);

    return res.json({
        success: true,
        message: "Product archived."
    });

};