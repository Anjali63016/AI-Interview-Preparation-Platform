const express = require("express");
const router = express.Router();

const { evaluateAnswer } =
    require("../utils/interviewAI");


router.post("/start", (req, res) => {

    const { role, difficulty } = req.body;

    const questionBank = {

        "Java Developer": [
            "Tell me about yourself.",
            "What are the main features of Java?",
            "Explain the difference between JDK, JRE and JVM.",
            "What is OOP? Explain its four principles.",
            "What is the difference between ArrayList and LinkedList?"
        ],

        "Python Developer": [
            "Tell me about yourself.",
            "What are the advantages of Python?",
            "What is the difference between a list and a tuple?",
            "What are Python decorators?",
            "What is exception handling in Python?"
        ],

        "Full Stack Developer": [
            "Tell me about yourself.",
            "What is the difference between frontend and backend?",
            "What is REST API?",
            "What is Node.js?",
            "What is the difference between SQL and NoSQL?"
        ],

        "Data Analyst": [
            "Tell me about yourself.",
            "What is data analysis?",
            "What is the difference between mean, median and mode?",
            "What is SQL?",
            "What is the purpose of data visualization?"
        ]

    };

    const selectedRole =
        role || "Full Stack Developer";

    const questions =
        questionBank[selectedRole] ||
        questionBank["Full Stack Developer"];

    res.json({
        success: true,
        role: selectedRole,
        difficulty: difficulty || "Medium",
        questions
    });

});


router.post("/evaluate", async (req, res) => {

    try {

        const {
            question,
            answer
        } = req.body;

        if (!question || !answer) {

            return res.status(400).json({
                success: false,
                message:
                    "Question and answer are required."
            });
        }

        console.log("🤖 Evaluating interview answer...");

        const evaluation =
            await evaluateAnswer(
                question,
                answer
            );

        console.log("✅ Answer evaluated");

        res.json({
            success: true,
            evaluation
        });

    } catch (error) {

        console.error(
            "❌ Interview evaluation error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "AI evaluation failed.",
            error: error.message
        });

    }

});


module.exports = router;