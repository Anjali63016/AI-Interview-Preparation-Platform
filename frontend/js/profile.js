console.log("PROFILE JS LOADED");

// Check login token
function getToken() {
    return localStorage.getItem("token");
}


// LOAD USER PROFILE
async function loadProfile() {
    const token = getToken();

    if (!token) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const user = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "login.html";
                return;
            }

            throw new Error(user.message || "Unable to load profile.");
        }

        // Personal information
        document.getElementById("full_name").value = user.full_name || "";
        document.getElementById("email").value = user.email || "";
        document.getElementById("phone").value = user.phone || "";
        document.getElementById("role").value = user.role || "Student";

        // Profile header
        document.getElementById("displayName").textContent =
            user.full_name || "Welcome!";

        document.getElementById("displayEmail").textContent =
            user.email || "";

        document.getElementById("displayRole").textContent =
            user.role || "Student";

        // Account creation date
        const createdAt = user.created_at
            ? new Date(user.created_at)
            : null;

        document.getElementById("created_at").textContent =
            createdAt && !isNaN(createdAt)
                ? createdAt.toLocaleDateString("en-IN")
                : "Not available";

        document.getElementById("roleCard").textContent =
            user.role || "Student";

        console.log("Profile loaded:", user.id);

    } catch (error) {
        console.error("PROFILE ERROR:", error);
        alert(error.message || "Failed to load profile.");
    }
}


// UPDATE USER PROFILE
async function updateProfile() {
    const token = getToken();

    if (!token) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
    }

    const full_name = document.getElementById("full_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!full_name || !email) {
        alert("Please enter your name and email.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                full_name,
                email,
                phone
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Profile update failed.");
        }

        alert(data.message || "Profile updated successfully!");

        await loadProfile();

    } catch (error) {
        console.error("UPDATE ERROR:", error);
        alert(error.message || "Could not update profile.");
    }
}


// PROFILE PICTURE PREVIEW
function setupProfilePicture() {
    const profilePicture = document.getElementById("profilePicture");
    const profilePreview = document.getElementById("profilePreview");
    const avatarFallback = document.querySelector(".avatar-fallback");

    if (!profilePicture || !profilePreview) {
        return;
    }

    profilePicture.addEventListener("change", function () {
        const file = this.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file.");
            this.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Please select an image smaller than 2 MB.");
            this.value = "";
            return;
        }

        const imageURL = URL.createObjectURL(file);

        profilePreview.src = imageURL;
        profilePreview.style.display = "block";

        if (avatarFallback) {
            avatarFallback.style.display = "none";
        }
    });
}


// LOGOUT
function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "login.html";
}


// PAGE INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {

    const updateBtn = document.getElementById("updateBtn");

    if (updateBtn) {
        updateBtn.addEventListener("click", updateProfile);
    }

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", logoutUser);
    }

    setupProfilePicture();
    loadProfile();

});