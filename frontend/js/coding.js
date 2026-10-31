
const API_URL = "http://localhost:5000/api/coding";

async function loadCodingQuestions() {
    const container = document.getElementById("codingQuestions");

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not load questions.");
        }

        const questions = await response.json();
        container.innerHTML = "";

        questions.forEach((q, index) => {
            container.innerHTML += `
                <div class="chart-card" style="margin-bottom:25px;">
                    <h2>${q.title}</h2>
                    <p><b>Difficulty:</b> ${q.difficulty}</p>
                    <p>${q.description}</p>

                    <label>Programming Language</label>
                    <select id="language${index}">
                        <option value="Java">Java</option>
                        <option value="Python">Python</option>
                        <option value="C">C</option>
                        <option value="C++">C++</option>
                        <option value="JavaScript">JavaScript</option>
                    </select>

                    <label>Input</label>
                    <textarea id="input${index}" rows="3"
                        placeholder="Enter program input here..."></textarea>

                    <label>Your Code</label>
                    <textarea id="code${index}" rows="10"
                        placeholder="Write your code here..."></textarea>

                    <button onclick="runCode(${index})">
                        ▶ Run Code
                    </button>

                    <div id="output${index}" style="margin-top:15px;">
                    </div>
                </div>
            `;
        });

    } catch (error) {
        container.innerHTML =
            `<p style="color:red;">${error.message}</p>`;
    }
}

async function runCode(index) {
    const language =
        document.getElementById(`language${index}`).value;

    const sourceCode =
        document.getElementById(`code${index}`).value;

    const stdin =
        document.getElementById(`input${index}`).value;

    const output =
        document.getElementById(`output${index}`);

    if (!sourceCode.trim()) {
        output.innerHTML =
            `<p style="color:red;">Please enter your code first.</p>`;
        return;
    }

    output.innerHTML = `<p>⏳ Running your code...</p>`;

    try {
        const response = await fetch(`${API_URL}/run`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                language,
                sourceCode,
                stdin
            })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Execution failed.");
        }

        const programOutput = result.output || "(No output)";
        const errorOutput = result.error || "";

        output.innerHTML = `
            <h3>💻 Execution Result</h3>
            <p><b>Status:</b> ${result.status}</p>
            <pre style="white-space:pre-wrap;">${escapeHTML(programOutput)}</pre>
            ${errorOutput ? `
                <p style="color:red;"><b>Error:</b></p>
                <pre style="white-space:pre-wrap;">${escapeHTML(errorOutput)}</pre>
            ` : ""}
        `;

    } catch (error) {
        output.innerHTML =
            `<p style="color:red;">❌ ${escapeHTML(error.message)}</p>`;
    }
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

loadCodingQuestions();
