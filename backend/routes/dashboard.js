const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {

    const userId = 1;

    const dashboard = {};

    db.query(
        "SELECT COUNT(*) AS totalJobs FROM applications WHERE user_id=?",
        [userId],
        (err, jobs) => {

            if (err) return res.status(500).json(err);

            dashboard.jobsApplied = jobs[0].totalJobs;

            db.query(
                "SELECT COUNT(*) AS totalInterviews FROM interview_results WHERE user_id=?",
                [userId],
                (err2, interviews) => {

                    if (err2) return res.status(500).json(err2);

                    dashboard.totalInterviews = interviews[0].totalInterviews;

                    db.query(
                        "SELECT AVG(score) AS averageScore FROM interview_results WHERE user_id=?",
                        [userId],
                        (err3, score) => {

                            if (err3) return res.status(500).json(err3);

                            dashboard.averageScore =
                                Math.round(score[0].averageScore || 0);

                            res.json(dashboard);

                        }
                    );

                }
            );

        }
    );

});

module.exports = router;