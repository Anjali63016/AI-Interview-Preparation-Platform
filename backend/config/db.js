const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "ai_interview_db",
    port: process.env.DB_PORT || 3307
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database Connection Failed:", err.message);
        return;
    }

    console.log("✅ MySQL Connected Successfully");
});

module.exports = db;