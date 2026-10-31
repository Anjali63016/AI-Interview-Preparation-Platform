async function loadDashboard() {

    try {

        const response = await fetch("http://localhost:5000/api/dashboard");
        const data = await response.json();

        console.log(data);

        document.getElementById("jobsApplied").innerText =
            data.jobsApplied ?? 0;

        document.getElementById("interviews").innerText =
            data.totalInterviews ?? 0;

        document.getElementById("averageScore").innerText =
            (data.averageScore ?? 0) + "%";

    } catch (err) {

        console.log(err);

        document.getElementById("jobsApplied").innerText = 0;
        document.getElementById("interviews").innerText = 0;
        document.getElementById("averageScore").innerText = "0%";

    }

}

loadDashboard();