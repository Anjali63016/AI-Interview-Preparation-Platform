const express = require("express");
const router = express.Router();
const db = require("../config/db");

// =========================
// GET ALL JOBS
// =========================
router.get("/", (req, res) => {

    db.query(
        "SELECT * FROM jobs ORDER BY created_at DESC",
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Failed to fetch jobs."
                });
            }

            res.json(result);

        }
    );

});

// =========================
// GET SINGLE JOB
// =========================
router.get("/:id", (req, res) => {

    const jobId = req.params.id;

    db.query(
        "SELECT * FROM jobs WHERE id = ?",
        [jobId],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    message: "Job Not Found"
                });
            }

            res.json(result[0]);

        }
    );

});

module.exports = router;