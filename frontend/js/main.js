// Counter Animation

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText;

        const increment = target / 200;

        if(current < target){

            counter.innerText = Math.ceil(current + increment);

            setTimeout(updateCounter,10);

        }else{

            counter.innerText = target.toLocaleString();

        }

    };

    updateCounter();

});
function animateValue(id, end, duration){

let start = 0;

let increment = end / (duration / 20);

let obj = document.getElementById(id);

let timer = setInterval(function(){

start += increment;

if(start >= end){

start = end;

clearInterval(timer);

}

if(id === "success"){

obj.innerHTML = Math.floor(start) + "%";

}else{

obj.innerHTML = Math.floor(start) + "+";

}

},20);

}

animateValue("users",10000,2000);
animateValue("interviews",25000,2000);
animateValue("companies",500,2000);
animateValue("success",95,2000);
function toggleChat(){

const chat=document.getElementById("chatBox");

if(chat.style.display==="flex"){

chat.style.display="none";

}else{

chat.style.display="flex";

}

}

function sendMessage(){

const input=document.getElementById("userInput");

const body=document.getElementById("chatBody");

const message=input.value.trim();

if(message==="") return;

body.innerHTML += `
<div class="user-message">${message}</div>
`;

let reply="I'm still learning. Soon I'll answer using Gemini AI!";

if(message.toLowerCase().includes("java")){
reply="Practice OOP, Collections, Exception Handling, and JDBC.";
}

else if(message.toLowerCase().includes("python")){
reply="Focus on functions, OOP, file handling, and popular libraries.";
}

else if(message.toLowerCase().includes("resume")){
reply="Keep your resume to one page and highlight projects and skills.";
}

else if(message.toLowerCase().includes("interview")){
reply="Prepare introductions, projects, strengths, and problem-solving questions.";
}

body.innerHTML += `
<div class="bot-message">${reply}</div>
`;

input.value="";

body.scrollTop=body.scrollHeight;

}