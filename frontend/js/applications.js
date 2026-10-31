async function loadApplications() {

    try {

        const response = await fetch("http://localhost:5000/api/applications/1");

        const applications = await response.json();

        const container = document.getElementById("applicationsContainer");

        container.innerHTML = "";

        if (applications.length === 0) {

            container.innerHTML = `
                <div class="card">
                    <h2>No Applications Yet</h2>
                    <p>You haven't applied for any jobs.</p>
                </div>
            `;

            return;

        }

        applications.forEach(app => {

            container.innerHTML += `

            <div class="card">

                <h2>${app.job_role}</h2>

                <p><strong>🏢 Company:</strong> ${app.company_name}</p>

                <p><strong>📍 Location:</strong> ${app.location}</p>

                <p><strong>💰 Salary:</strong> ${app.salary}</p>

                <p><strong>📅 Applied:</strong> ${new Date(app.applied_at).toLocaleDateString()}</p>

                <p><strong>📌 Status:</strong> ${app.status}</p>

            </div>

            `;

        });

    } catch (err) {

        console.log(err);

    }

}

loadApplications();