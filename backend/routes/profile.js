const express = require("express");
const router = express.Router();
const db = require("../config/db");
const jwt = require("jsonwebtoken");

// Verify logged-in user
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Please log in first."
        });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET || "secretkey",
        (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid or expired login. Please log in again."
                });
            }

            req.userId = decoded.id;
            next();
        }
    );
}

// GET LOGGED-IN USER PROFILE
router.get("/", authenticateToken, (req, res) => {
    const sql = `
        SELECT id, full_name, email, phone, role, profile_image, created_at
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [req.userId], (err, result) => {
        if (err) {
            console.error("Profile fetch error:", err);
            return res.status(500).json({
                message: "Failed to load profile."
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.json(result[0]);
    });
});

// UPDATE LOGGED-IN USER PROFILE
router.put("/", authenticateToken, (req, res) => {
    const { full_name, email, phone } = req.body;

    if (!full_name || !email) {
        return res.status(400).json({
            message: "Name and email are required."
        });
    }

    const sql = `
        UPDATE users
        SET full_name = ?, email = ?, phone = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [full_name.trim(), email.trim(), phone || "", req.userId],
        (err, result) => {
            if (err) {
                console.error("Profile update error:", err);
                return res.status(500).json({
                    message: "Profile update failed."
                });
            }

            res.json({
                message: "Profile updated successfully!"
            });
        }
    );
});

module.exports = router;