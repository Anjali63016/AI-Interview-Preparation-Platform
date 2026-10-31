
const express = require("express");
const router = express.Router();

const JUDGE0_URL = "https://ce.judge0.com";

// Language IDs from Judge0
const languages = {
    C: 103,
    "C++": 105,
    Java: 91,
    JavaScript: 102,
    Python: 100
};

// Coding questions
const questions = [
    {
        id: 1,
        title: "Reverse a String",
        difficulty: "Easy",
        description: "Write a program to reverse a string.",
        inputFormat: "Enter one string."
    },
    {
        id: 2,
        title: "Palindrome",
        difficulty: "Easy",
        description: "Check whether a string is a palindrome.",
        inputFormat: "Enter one string."
    },
    {
        id: 3,
        title: "Find Maximum Number",
        difficulty: "Medium",
        description: "Find the largest number in an array.",
        inputFormat: "Enter n, followed by n integers."
    },
    {
        id: 4,
        title: "Factorial",
        difficulty: "Easy",
        description: "Find the factorial of a number.",
        inputFormat: "Enter one integer n."
    },
    {
        id: 5,
        title: "Fibonacci Series",
        difficulty: "Medium",
        description: "Print the first N Fibonacci numbers.",
        inputFormat: "Enter one integer n."
    }
];

// Send questions to frontend
router.get("/", (req, res) => {
    res.json(questions);
});

// Run code using Judge0
router.post("/run", async (req, res) => {
    try {
        const { language, sourceCode, stdin = "" } = req.body;

        if (!language || !sourceCode || !sourceCode.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please select a language and enter your code."
            });
        }

        const languageId = languages[language];

        if (!languageId) {
            return res.status(400).json({
                success: false,
                message: "Unsupported programming language."
            });
        }

        // Create a submission
        const submissionResponse = await fetch(
            `${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    language_id: languageId,
                    source_code: sourceCode,
                    stdin: stdin
                })
            }
        );

        if (!submissionResponse.ok) {
            throw new Error("Judge0 could not accept the code.");
        }

        const submission = await submissionResponse.json();

        if (!submission.token) {
            throw new Error("Could not create code submission.");
        }

        // Wait for the execution result
        let result;

        for (let attempt = 0; attempt < 15; attempt++) {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const resultResponse = await fetch(
                `${JUDGE0_URL}/submissions/${submission.token}?base64_encoded=false`,
                { method: "GET" }
            );

            if (!resultResponse.ok) {
                throw new Error("Could not retrieve execution result.");
            }

            result = await resultResponse.json();

            // Status 1 = In Queue, 2 = Processing
            if (result.status && result.status.id > 2) {
                break;
            }
        }

        if (!result || !result.status || result.status.id <= 2) {
            return res.status(504).json({
                success: false,
                message: "Execution is taking too long. Please try again."
            });
        }

        res.json({
            success: true,
            status: result.status.description,
            output: result.stdout || "",
            error: result.stderr || result.compile_output || "",
            time: result.time,
            memory: result.memory
        });

    } catch (error) {
        console.error("Code execution error:", error);

        res.status(500).json({
            success: false,
            message: error.message || "Code execution failed."
        });
    }
});

module.exports = router;
