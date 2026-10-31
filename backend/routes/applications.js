const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ==============================
// APPLY FOR A JOB
// ==============================
router.post("/", (req, res) => {

    const { user_id, job_id } = req.body;

    // Check if already applied
    db.query(
        "SELECT * FROM applications WHERE user_id=? AND job_id=?",
        [user_id, job_id],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            if (result.length > 0) {
                return res.json({
                    message: "You have already applied for this job."
                });
            }

            db.query(
                "INSERT INTO applications(user_id, job_id) VALUES(?, ?)",
                [user_id, job_id],
                (err2) => {

                    if (err2) {
                        console.log(err2);
                        return res.status(500).json({
                            message: "Application Failed"
                        });
                    }

                    res.json({
                        message: "🎉 Application Submitted Successfully!"
                    });

                }
            );

        }
    );

});

// ==============================
// VIEW MY APPLICATIONS
// ==============================
router.get("/:userId", (req, res) => {

    db.query(

        `SELECT
            applications.id,
            jobs.company_name,
            jobs.job_role,
            jobs.location,
            jobs.salary,
            applications.status,
            applications.applied_at
        FROM applications
        INNER JOIN jobs
        ON jobs.id = applications.job_id
        WHERE applications.user_id = ?
        ORDER BY applications.applied_at DESC`,

        [req.params.userId],

        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            res.json(result);

        }

    );

});

module.exports = router;