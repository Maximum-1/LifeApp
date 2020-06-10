/*      last rating router    */
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


 // Post route to allow user insert the rating info for user after their finish of a tree
router.post('/:tree_id', rejectUnauthenticated, (req, res) => {
    let tree_id = req.params.tree_id;
    console.log('in last rating roruter', req.body);
    const queryText = `INSERT INTO "last_rating"("tree_id","user_id","recurrence","day_week_month",
    "duration_days","intensity","transparency") VALUES ($1,$2,$3,$4,$5,$6,$7);`;

    pool.query(queryText, [tree_id, req.user.id, req.body.recurrence, req.body.dayWeekMonth, req.body.duration, req.body.intensity, req.body.transparency])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});



module.exports = router;