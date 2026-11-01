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

        if (!user.full_name || !user.email || !user.phone || !user.password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch(
                "https://ai-interview-preparation-platform-sojn.onrender.com/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                }
            );

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
            alert("Cannot connect to the backend. Please try again.");
        }
    });
});