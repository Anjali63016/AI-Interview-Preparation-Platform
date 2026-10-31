document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    if (!form) {
        console.error("loginForm not found.");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const user = {
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value
        };

        try {
            const response = await fetch("https://ai-interview-preparation-platform-sojn.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Login failed.");
                console.error("Login response:", data);
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login successful!");
            window.location.href = "index.html";

        } catch (error) {
            console.error("Login error:", error);
            alert("Cannot connect to the backend. Check that the server is running.");
        }
    });
});