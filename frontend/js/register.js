document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    if (!form) {
        console.error("registerForm not found.");
        return;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const user = {
            full_name: document.getElementById("full_name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            password: document.getElementById("password").value
        };

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Registration failed.");
                console.error("Registration response:", data);
                return;
            }

            alert("Registration successful! Please log in.");
            window.location.href = "login.html";

        } catch (error) {
            console.error("Registration error:", error);
            alert("Cannot connect to the backend. Check that the server is running.");
        }
    });
});