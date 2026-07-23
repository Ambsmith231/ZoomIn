const db = require('../config/db');

// Get only active products for the public shop page
exports.getAvailableProducts = (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products WHERE isAvailable = 1 ORDER BY createdAt DESC').all();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin posts a new product
exports.createProduct = (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  try {
    const stmt = db.prepare('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)');
    const info = stmt.run(title, price, description, imageUrl);
    res.status(201).json({ id: info.lastInsertRowid, title, price });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin archives/deletes product after payment verification
exports.archiveProduct = (req, res) => {
  const { id } = req.params;
  try {
    const stmt = db.prepare('UPDATE products SET isAvailable = 0 WHERE id = ?');
    stmt.run(id);
    res.json({ message: 'Product archived successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};