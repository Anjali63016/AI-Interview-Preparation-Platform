exports.generateQuestions = async (req, res) => {

    const { role } = req.body;

    const questions = {

        Java: [
            "What is JVM?",
            "Explain OOP.",
            "What is Inheritance?",
            "Difference between ArrayList and LinkedList?",
            "What is Exception Handling?"
        ],

        Python: [
            "What is Python?",
            "Explain List and Tuple.",
            "What is Lambda Function?",
            "Explain Decorators.",
            "What is Exception Handling?"
        ],

        DBMS: [
            "What is Normalization?",
            "Primary Key vs Foreign Key?",
            "Explain ACID properties.",
            "What is SQL Join?",
            "Difference between DELETE and TRUNCATE?"
        ],

        "Operating Systems": [
            "What is Process?",
            "Difference between Process and Thread?",
            "Explain Deadlock.",
            "What is Paging?",
            "CPU Scheduling Algorithms?"
        ],

        "Computer Networks": [
            "Explain TCP/IP.",
            "Difference between TCP and UDP?",
            "What is DNS?",
            "Explain HTTP.",
            "OSI Layers?"
        ],

        "HR Interview": [
            "Tell me about yourself.",
            "Why should we hire you?",
            "What are your strengths?",
            "Where do you see yourself in 5 years?",
            "Why do you want this job?"
        ]

    };

    res.json({
        questions: questions[role].join("\n\n")
    });

};