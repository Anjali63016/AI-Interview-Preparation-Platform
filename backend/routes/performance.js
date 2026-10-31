const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {

    db.query(
        `
        SELECT
            COUNT(*) AS interviews,
            AVG(score) AS interview_score
        FROM interviews
        WHERE user_id = 1
        `,
        (err, interviewResult) => {

            if (err) return res.status(500).json(err);

            db.query(
                `
                SELECT ats_score
                FROM resumes
                WHERE user_id = 1
                ORDER BY id DESC
                LIMIT 1
                `,
                (err2, resumeResult) => {

                    if (err2) return res.status(500).json(err2);

                    res.json({

                        interviewCount:
                            interviewResult[0].interviews || 0,

                        interviewScore:
                            Math.round(interviewResult[0].interview_score || 0),

                        resumeScore:
                            resumeResult.length
                                ? resumeResult[0].ats_score
                                : 0

                    });

                }
            );

        }
    );

});

module.exports = router;