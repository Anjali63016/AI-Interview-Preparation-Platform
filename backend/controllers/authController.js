const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// REGISTER
exports.register = async (req, res) => {
    try {
        const { full_name, email, phone, password } = req.body;

        if (!full_name || !email || !phone || !password) {
            return res.status(400).json({
                message: "Please fill in all fields."
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must contain at least 6 characters."
            });
        }

        const checkSql = "SELECT id FROM users WHERE email = ?";

        db.query(checkSql, [email.trim()], async (err, result) => {
            if (err) {
                console.error("Email check error:", err);
                return res.status(500).json({
                    message: "Database error while checking email."
                });
            }

            if (result.length > 0) {
                return res.status(409).json({
                    message: "This email is already registered."
                });
            }

            try {
                const hashedPassword = await bcrypt.hash(password, 10);

                const insertSql = `
                    INSERT INTO users (full_name, email, password, phone)
                    VALUES (?, ?, ?, ?)
                `;

                db.query(
                    insertSql,
                    [full_name.trim(), email.trim(), hashedPassword, phone.trim()],
                    (insertError, insertResult) => {
                        if (insertError) {
                            console.error("Registration SQL error:", insertError);
                            return res.status(500).json({
                                message: "Could not save your account."
                            });
                        }

                        return res.status(201).json({
                            message: "Registration successful!",
                            userId: insertResult.insertId
                        });
                    }
                );
            } catch (hashError) {
                console.error("Password hashing error:", hashError);
                return res.status(500).json({
                    message: "Could not process the password."
                });
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            message: "Registration failed."
        });
    }
};


// LOGIN
exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Enter your email and password."
        });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email.trim()], async (err, result) => {
        if (err) {
            console.error("Login SQL error:", err);
            return res.status(500).json({
                message: "Database error during login."
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Account not found. Please register first."
            });
        }

        try {
            const user = result[0];
            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                return res.status(401).json({
                    message: "Incorrect password."
                });
            }

            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET || "secretkey",
                { expiresIn: "1d" }
            );

            return res.status(200).json({
                message: "Login successful!",
                token: token,
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email
                }
            });
        } catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({
                message: "Login failed."
            });
        }
    });
};