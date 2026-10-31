const db = require("../config/db");

exports.getDashboard = (req, res) => {

    db.query("SELECT COUNT(*) AS users FROM users", (err, users) => {

        if (err) return res.status(500).json(err);

        db.query("SELECT COUNT(*) AS resumes FROM resumes", (err, resumes) => {

            if (err) return res.status(500).json(err);

            db.query("SELECT COUNT(*) AS interviews FROM interviews", (err, interviews) => {

                if (err) return res.status(500).json(err);

                db.query("SELECT COUNT(*) AS challenges FROM coding_challenges", (err, challenges) => {

                    if (err) return res.status(500).json(err);

                    res.json({
                        users: users[0].users,
                        resumes: resumes[0].resumes,
                        interviews: interviews[0].interviews,
                        challenges: challenges[0].challenges
                    });

                });

            });

        });

    });

};