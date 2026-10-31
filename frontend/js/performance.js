async function loadPerformance() {

    try {

        const response = await fetch("http://localhost:5000/api/performance");

        const data = await response.json();

        document.getElementById("interviews").innerText =
            data.interviewCount || 0;

        document.getElementById("interviewScore").innerText =
            (data.interviewScore || 0) + "%";

        document.getElementById("resumeScore").innerText =
            (data.resumeScore || 0) + "%";

        const overall = Math.round(
            ((Number(data.interviewScore) || 0) +
            (Number(data.resumeScore) || 0)) / 2
        );

        document.getElementById("overall").innerText =
            overall + "%";

        const ctx = document.getElementById("performanceChart");

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Resume ATS", "Interview", "Overall"],
                datasets: [{
                    label: "Performance",
                    data: [
                        data.resumeScore || 0,
                        data.interviewScore || 0,
                        overall
                    ]
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });

    } catch (err) {

        console.log(err);

    }

}

loadPerformance();