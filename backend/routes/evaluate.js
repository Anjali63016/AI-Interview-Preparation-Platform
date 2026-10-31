const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {

    const { answer } = req.body;

    let score = 0;
    let feedback = "";

    if (!answer || answer.trim() === "") {

        score = 0;
        feedback = "Please enter your code before submitting.";

    }

    // C Language
    else if (
        answer.includes("#include") &&
        answer.includes("main")
    ) {

        score = 10;
        feedback = "✅ Excellent! Your C program structure looks correct.";

    }

    // Java
    else if (
        answer.includes("public class") ||
        answer.includes("public static void main")
    ) {

        score = 10;
        feedback = "✅ Excellent! Java program detected.";

    }

    // Python
    else if (
        answer.includes("def ") ||
        answer.includes("print(")
    ) {

        score = 9;
        feedback = "✅ Good! Python solution detected.";

    }

    // JavaScript
    else if (
        answer.includes("function") ||
        answer.includes("console.log")
    ) {

        score = 9;
        feedback = "✅ JavaScript solution detected.";

    }

    // HTML
    else if (
        answer.includes("<html") ||
        answer.includes("<div")
    ) {

        score = 8;
        feedback = "✅ HTML code detected.";

    }

    // SQL
    else if (
        answer.includes("SELECT") ||
        answer.includes("select")
    ) {

        score = 9;
        feedback = "✅ SQL query detected.";

    }

    // Random text
    else {

        score = 2;
        feedback = "❌ This doesn't look like valid programming code. Please submit code related to the challenge.";

    }

    res.json({
        score,
        feedback
    });

});

module.exports = router;