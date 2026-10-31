const API_URL = "https://ai-interview-preparation-platform-sojn.onrender.com/api/jobs";

let allJobs = [];

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchJob");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const keyword = this.value.toLowerCase().trim();

            const filteredJobs = allJobs.filter(job =>
                (job.job_role || "").toLowerCase().includes(keyword) ||
                (job.company_name || "").toLowerCase().includes(keyword)
            );

            displayJobs(filteredJobs);
        });
    }

    loadJobs();
});

async function loadJobs() {
    const container = document.getElementById("jobsContainer");

    if (!container) {
        console.error("jobsContainer not found.");
        return;
    }

    container.innerHTML = "<p>Loading jobs...</p>";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Unable to fetch jobs. Status: " + response.status);
        }

        const data = await response.json();

        allJobs = Array.isArray(data) ? data : [];

        displayJobs(allJobs);

    } catch (error) {
        console.error("Jobs loading error:", error);

        container.innerHTML = `
            <div class="card">
                <h2>Unable to Load Jobs</h2>
                <p>Please try again later.</p>
                <button onclick="loadJobs()">Try Again</button>
            </div>
        `;
    }
}

function displayJobs(jobs) {
    const container = document.getElementById("jobsContainer");

    if (!container) return;

    container.innerHTML = "";

    if (jobs.length === 0) {
        container.innerHTML = `
            <div class="card">
                <h2>No Jobs Found</h2>
                <p>No jobs are currently available.</p>
            </div>
        `;
        return;
    }

    jobs.forEach(job => {
        const card = document.createElement("div");
        card.className = "card";

        const title = document.createElement("h2");
        title.textContent = job.job_role || "Job Role Not Available";

        const company = document.createElement("p");
        company.textContent = "🏢 Company: " + (job.company_name || "Not specified");

        const location = document.createElement("p");
        location.textContent = "📍 Location: " + (job.location || "Not specified");

        const experience = document.createElement("p");
        experience.textContent = "💼 Experience: " + (job.experience_required || "Not specified");

        const salary = document.createElement("p");
        salary.textContent = "💰 Salary: " + (job.salary || "Not specified");

        const button = document.createElement("button");
        button.textContent = "Apply Now";

        button.addEventListener("click", () => {
            applyJob(job.id, job.apply_link);
        });

        card.append(title, company, location, experience, salary, button);
        container.appendChild(card);
    });
}

async function applyJob(jobId, applyLink) {
    alert("Please check the job application API configuration before submitting.");
}

