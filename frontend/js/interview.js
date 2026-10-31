const startScreen =
    document.getElementById("startScreen");

const interviewScreen =
    document.getElementById("interviewScreen");

const resultScreen =
    document.getElementById("resultScreen");

const role =
    document.getElementById("role");

const difficulty =
    document.getElementById("difficulty");

const startBtn =
    document.getElementById("startBtn");

const question =
    document.getElementById("question");

const answer =
    document.getElementById("answer");

const submitAnswerBtn =
    document.getElementById("submitAnswerBtn");

const questionNumber =
    document.getElementById("questionNumber");

const totalQuestions =
    document.getElementById("totalQuestions");

const startStatus =
    document.getElementById("startStatus");

const answerStatus =
    document.getElementById("answerStatus");


let questions = [];

let currentQuestion = 0;

let scores = [];


startBtn.addEventListener(
    "click",
    async () => {

        startStatus.innerText =
            "Starting interview...";

        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/ai/start",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            role: role.value,

                            difficulty:
                                difficulty.value

                        })
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Failed to start interview."
                );
            }

            questions =
                data.questions;

            currentQuestion = 0;

            scores = [];

            totalQuestions.innerText =
                questions.length;

            startScreen.classList.add(
                "hidden"
            );

            interviewScreen.classList.remove(
                "hidden"
            );

            showQuestion();

        } catch (error) {

            console.error(error);

            startStatus.innerText =
                "Failed to start interview ❌";
        }

    }
);


function showQuestion() {

    question.innerText =
        questions[currentQuestion];

    questionNumber.innerText =
        currentQuestion + 1;

    answer.value = "";

    answerStatus.innerText = "";

}

submitAnswerBtn.addEventListener(
    "click",
    async () => {

        const userAnswer =
            answer.value.trim();

        if (!userAnswer) {

            answerStatus.innerText =
                "Please enter your answer.";

            return;
        }

        submitAnswerBtn.disabled = true;

        answerStatus.innerText =
            "🤖 AI is evaluating your answer...";

        try {

            const response =
                await fetch(
                    "http://localhost:5000/api/ai/evaluate",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            question:
                                questions[currentQuestion],

                            answer:
                                userAnswer

                        })
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "AI evaluation failed."
                );
            }

            console.log(
                "AI Evaluation:",
                data
            );

            const evaluation =
                data.evaluation;

            scores.push(
                Number(evaluation.score)
            );

            showEvaluation(
                evaluation
            );

        } catch (error) {

            console.error(error);

            answerStatus.innerText =
                "AI evaluation failed ❌";

            submitAnswerBtn.disabled =
                false;
        }

    }
);


function showResults() {

    interviewScreen.classList.add(
        "hidden"
    );

    resultScreen.classList.remove(
        "hidden"
    );

    const total =
        scores.reduce(
            (sum, score) =>
                sum + score,
            0
        );

    const average =
        total / scores.length;

    document.getElementById(
        "overallScore"
    ).innerText =
        `${average.toFixed(1)}/10`;

    document.getElementById(
        "summary"
    ).innerText =
        "You completed the mock interview. Review your performance and continue practicing to improve your interview skills.";

    document.getElementById(
        "strengths"
    ).innerHTML = `
        <li>Completed all interview questions.</li>
        <li>Attempted every answer.</li>
        <li>Good participation.</li>
    `;

    document.getElementById(
        "improvements"
    ).innerHTML = `
        <li>Give more detailed answers.</li>
        <li>Use practical examples.</li>
        <li>Structure your answers clearly.</li>
    `;

}
function showEvaluation(evaluation) {

    answerStatus.innerHTML = `

        <div class="evaluation-box">

            <h3>
                🤖 AI Evaluation
            </h3>

            <p>
                <strong>Score:</strong>
                ${evaluation.score}/10
            </p>

            <p>
                <strong>Relevance:</strong>
                ${evaluation.relevance}
            </p>

            <p>
                <strong>Technical Accuracy:</strong>
                ${evaluation.technicalAccuracy}
            </p>

            <h4>💪 Strengths</h4>

            <ul>
                ${
                    evaluation.strengths
                    .map(item => `<li>${item}</li>`)
                    .join("")
                }
            </ul>

            <h4>⚠️ Weaknesses</h4>

            <ul>
                ${
                    evaluation.weaknesses
                    .map(item => `<li>${item}</li>`)
                    .join("")
                }
            </ul>

            <h4>💡 Suggestions</h4>

            <ul>
                ${
                    evaluation.suggestions
                    .map(item => `<li>${item}</li>`)
                    .join("")
                }
            </ul>

        </div>

        <button id="nextQuestionBtn">
            ${
                currentQuestion + 1 <
                questions.length
                ? "Next Question →"
                : "Finish Interview"
            }
        </button>
    `;


    document
        .getElementById("nextQuestionBtn")
        .addEventListener(
            "click",
            () => {

                currentQuestion++;

                submitAnswerBtn.disabled =
                    false;

                if (
                    currentQuestion <
                    questions.length
                ) {

                    showQuestion();

                } else {

                    showResults();

                }

            }
        );

}