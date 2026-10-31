let allJobs = [];

async function loadJobs() {

    try {

        const response = await fetch("http://localhost:5000/api/jobs");

        allJobs = await response.json();

        displayJobs(allJobs);

    } catch (err) {

        console.log(err);

    }

}

function displayJobs(jobs) {

    const container = document.getElementById("jobsContainer");

    container.innerHTML = "";

    if (jobs.length === 0) {

        container.innerHTML = `
            <div class="card">
                <h2>No Jobs Found</h2>
            </div>
        `;

        return;

    }

    jobs.forEach(job => {

        container.innerHTML += `

        <div class="card">

            <h2>${job.job_role}</h2>

            <p><strong>🏢 Company:</strong> ${job.company_name}</p>

            <p><strong>📍 Location:</strong> ${job.location}</p>

            <p><strong>💼 Experience:</strong> ${job.experience_required}</p>

            <p><strong>💰 Salary:</strong> ${job.salary}</p>

            <button onclick="applyJob(${job.id}, '${job.apply_link}')">
                Apply Now
            </button>

        </div>

        `;

    });

}

document.getElementById("searchJob").addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filtered = allJobs.filter(job =>

        job.job_role.toLowerCase().includes(keyword) ||

        job.company_name.toLowerCase().includes(keyword)

    );

    displayJobs(filtered);

});

async function applyJob(jobId, applyLink) {

    try {

        const response = await fetch("http://localhost:5000/api/applications", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                user_id: 1,
                job_id: jobId
            })

        });

        const data = await response.json();

        alert(data.message);

        if (applyLink) {
            window.open(applyLink, "_blank");
        }

    } catch (err) {

        console.log(err);

        alert("Application Failed");

    }

}

loadJobs();