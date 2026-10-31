require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const aiRoutes = require("./routes/ai");
const interviewRoutes = require("./routes/interview");
const performanceRoutes = require("./routes/performance");
const codingRoutes = require("./routes/coding");
const jobsRoutes = require("./routes/jobs");
const chatbotRoutes = require("./routes/chatbot");
const evaluateRoutes = require("./routes/evaluate");
const profileRoutes = require("./routes/profile");
const applicationsRoutes = require("./routes/applications");

// Database
const db = require("./config/db");

const app = express();


// ================================
// MIDDLEWARE
// ================================

app.use(cors());
app.use(express.json());


// ================================
// API ROUTES
// ================================

app.use("/api/auth", authRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/ai", interviewRoutes);

app.use("/api/performance", performanceRoutes);

app.use("/api/coding", codingRoutes);

app.use("/api/jobs", jobsRoutes);

app.use("/api/chatbot", chatbotRoutes);

app.use("/api/evaluate", evaluateRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/applications", applicationsRoutes);


// ================================
// TEST ROUTE
// ================================

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "🚀 AI Interview Preparation Platform Backend is Running!"
    });

});


// ================================
// GEMINI API KEY CHECK
// ================================

console.log(
    "Gemini API Key Loaded:",
    !!process.env.GEMINI_API_KEY
);


// ================================
// START SERVER
// ================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `🚀 Server running on http://localhost:${PORT}`
    );

});