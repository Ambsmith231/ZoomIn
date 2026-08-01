const Database = require("better-sqlite3");
const path = require("path");
const bcrypt = require("bcryptjs");

// Create/Open database
const db = new Database(path.join(__dirname, "../database.db"));

console.log("✅ Connected to SQLite database");

// Enable foreign keys
db.pragma("foreign_keys = ON");

// ==============================
// USERS TABLE
// ==============================
db.prepare(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'client',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
`).run();

// ==============================
// PRODUCTS TABLE
// ==============================
db.prepare(`
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 0,
    imageUrl TEXT,
    isAvailable INTEGER DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
`).run();

// ==============================
// ORDERS TABLE
// ==============================
db.prepare(`
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    productId INTEGER NOT NULL,

    paymentMethod TEXT NOT NULL,
    paymentStatus TEXT DEFAULT 'Pending',
    orderStatus TEXT DEFAULT 'Pending',

    transactionReference TEXT,
    proofImage TEXT,

    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE
)
`).run();

// ==============================
// CREATE DEFAULT ADMIN
// ==============================
// const adminEmail = "admin@example.com";

// const admin = db
//     .prepare("SELECT * FROM users WHERE email = ?")
//     .get(adminEmail);

// if (!admin) {

//     const hashedPassword = bcrypt.hashSync("Admin123!", 10);

//     db.prepare(`
//         INSERT INTO users
//         (name, email, password, role)
//         VALUES (?, ?, ?, ?)
//     `).run(
//         "System Administrator",
//         adminEmail,
//         hashedPassword,
//         "admin"
//     );

//     console.log("✅ Default admin created");
//     console.log("Email: admin@example.com");
//     console.log("Password: admin1234");
// }

module.exports = db;