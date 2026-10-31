const chatBox = document.getElementById("chatBox");
const input = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");

function addMessage(sender, text) {

    const div = document.createElement("div");

    div.className = sender;

    div.innerHTML = `
        <p><strong>${sender === "user" ? "👤 You" : "🤖 AI"}:</strong></p>
        <p>${text}</p>
    `;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
}
function getAIResponse(message) {

    message = message.toLowerCase();

    // ===== Java =====
    if(message.includes("what is java"))
        return "Java is an object-oriented, platform-independent programming language developed by Sun Microsystems. It follows the principle 'Write Once, Run Anywhere'.";

    if(message.includes("oops"))
        return "OOP has four pillars:\n\n1. Encapsulation\n2. Inheritance\n3. Polymorphism\n4. Abstraction";

    if(message.includes("java interview questions"))
        return "Top Java Interview Questions:\n\n• What is JVM?\n• Difference between JDK and JRE?\n• Explain OOP.\n• What is Exception Handling?\n• What are Collections?";

    // ===== Python =====
    if(message.includes("what is python"))
        return "Python is a high-level, interpreted programming language known for its simple syntax and extensive libraries.";

    if(message.includes("python interview"))
        return "Python Interview Topics:\n\n• Data Types\n• Functions\n• OOP\n• File Handling\n• List vs Tuple\n• Dictionaries";

    // ===== SQL =====
    if(message.includes("join"))
        return "SQL JOIN combines rows from two or more tables based on a related column.\n\nTypes:\n• INNER JOIN\n• LEFT JOIN\n• RIGHT JOIN\n• FULL JOIN";

    if(message.includes("sql"))
        return "SQL Topics:\n\n• SELECT\n• WHERE\n• GROUP BY\n• HAVING\n• JOINS\n• INDEXES";

    // ===== Resume =====
    if(message.includes("resume"))
        return "Resume Tips:\n\n✔ Add projects\n✔ Mention internships\n✔ Use action verbs\n✔ Include GitHub\n✔ Keep it one page";

    // ===== HR =====
    if(message.includes("tell me about yourself"))
        return "Introduce yourself in this order:\n\n• Name\n• Education\n• Skills\n• Projects\n• Career Goal";

    if(message.includes("hr"))
        return "Common HR Questions:\n\n• Tell me about yourself\n• Why should we hire you?\n• Strengths & Weaknesses\n• Where do you see yourself in 5 years?";

    // ===== Coding =====
    if(message.includes("coding"))
        return "Practice these topics:\n\n• Arrays\n• Strings\n• Linked Lists\n• Trees\n• Dynamic Programming\n• Graphs";

    // ===== Greetings =====
    if(message.includes("hello") || message.includes("hi"))
        return "Hello! 👋 I'm your AI Career Assistant. Ask me about Java, Python, SQL, Resume, HR interviews, Coding, or Interview Tips.";

    // ===== Default =====
    return "Sorry, I don't know that yet.\n\nTry asking:\n\n• What is Java?\n• Explain OOP.\n• Tell me about yourself.\n• What is SQL JOIN?\n• Resume tips.\n• HR interview questions.";
}
sendBtn.onclick = () => {

    const message = input.value.trim();

    if(message === "") return;

    addMessage("user", message);

    setTimeout(()=>{

        addMessage("bot", getAIResponse(message));

    },600);

    input.value="";

}

input.addEventListener("keypress",(e)=>{

    if(e.key==="Enter")
        sendBtn.click();

});