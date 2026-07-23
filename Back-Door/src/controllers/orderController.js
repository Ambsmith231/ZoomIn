const db = require('../config/db');

// Client creates an order
exports.createOrder = (req, res) => {
  const { productId, paymentMethod, paymentReference } = req.body;
  const userId = req.user.id; // From authMiddleware

  try {
    // Check if product exists and is available
    const product = db.prepare('SELECT * FROM products WHERE id = ? AND isAvailable = 1').get(productId);
    if (!product) {
      return res.status(400).json({ error: 'Product is no longer available.' });
    }

    const stmt = db.prepare(`
      INSERT INTO orders (userId, productId, paymentMethod, paymentReference, paymentStatus)
      VALUES (?, ?, ?, ?, 'Pending')
    `);
    const result = stmt.run(userId, productId, paymentMethod, paymentReference);

    res.status(201).json({
      message: 'Order created successfully. Pending payment verification.',
      orderId: result.lastInsertRowid
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin views all orders
exports.getAllOrders = (req, res) => {
  try {
    const orders = db.prepare(`
      SELECT 
        orders.id as orderId,
        orders.paymentMethod,
        orders.paymentReference,
        orders.paymentStatus,
        orders.createdAt,
        users.name as customerName,
        users.phone as customerPhone,
        products.id as productId,
        products.title as productTitle,
        products.price as productPrice
      FROM orders
      JOIN users ON orders.userId = users.id
      JOIN products ON orders.productId = products.id
      ORDER BY orders.createdAt DESC
    `).all();

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin verifies payment AND hides/archives item from store
exports.verifyAndArchiveOrder = (req, res) => {
  const { orderId } = req.params;

  try {
    // 1. Get order details
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    if (!order) return res.status(404).json({ error: 'Order not found.' });

    // Transaction to update both Order and Product atomically
    const verifyTransaction = db.transaction(() => {
      // Update order status to Verified
      db.prepare("UPDATE orders SET paymentStatus = 'Verified' WHERE id = ?").run(orderId);

      // Hide/Archive product from shop (isAvailable = 0)
      db.prepare("UPDATE products SET isAvailable = 0 WHERE id = ?").run(order.productId);
    });

    verifyTransaction(); // Execute transaction

    res.json({ message: 'Payment verified and product successfully archived from storefront.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};