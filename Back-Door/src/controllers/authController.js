const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required."
            });
        }

        // Check if email exists
        const existingUser = db
            .prepare("SELECT * FROM users WHERE email = ?")
            .get(email);

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Only allow admin role if explicitly sent
        const userRole = role === "admin" ? "admin" : "client";

        // Save user
        const result = db.prepare(`
            INSERT INTO users
            (name, email, password, phone, role)
            VALUES (?, ?, ?, ?, ?)
        `).run(
            name,
            email,
            hashedPassword,
            phone || "",
            userRole
        );

        return res.status(201).json({
            success: true,
            message: "Registration successful.",
            userId: result.lastInsertRowid
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const user = db
            .prepare("SELECT * FROM users WHERE email = ?")
            .get(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};