const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



// GET the tree info by search Keyword
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const sortStatus = req.params.id;
    const id = req.user.id;
    const status = false;

    console.log('USER id is:', req.user);
    console.log('The Sort Status is', sortStatus);
    if (sortStatus == 1) {
        console.log('In All Trees');
        const queryText = `SELECT * FROM "tree"
                           WHERE user_id = $1 AND "is_deleted" = $2`;
        pool.query(queryText, [id, status])
            .then((result) => {
                res.send(result.rows);
            })
            .catch((err) => {
                console.log('Error completing SORT Tree query 1', err);
                res.sendStatus(500);
            });
    } else if (sortStatus == 2) {
        console.log('In Completed trees');
        const queryText = `SELECT * FROM "tree"
                           WHERE user_id = $1
                           AND status = TRUE`;
        pool.query(queryText, [id])
            .then((result) => {
                res.send(result.rows);
            })
            .catch((err) => {
                console.log('Error completing SORT Tree query 2', err);
                res.sendStatus(500);
            });
    } else if (sortStatus == 3) {
        console.log('In In Progress trees');
        const queryText = `SELECT * FROM "tree"
                           WHERE user_id = $1
                           AND steps_completed != 0
                           AND status = FALSE`;
        pool.query(queryText, [id])
            .then((result) => {
                res.send(result.rows);
            })
            .catch((err) => {
                console.log('Error completing SORT Tree query 3', err);
                res.sendStatus(500);
            });
    } else if (sortStatus == 4) {
        console.log('In not started yet trees');
        const queryText = `SELECT * FROM "tree"
                            WHERE user_id = $1
                           AND steps_completed = 0`;
        pool.query(queryText, [id])
            .then((result) => {
                res.send(result.rows);
            })
            .catch((err) => {
                console.log('Error completing SORT Tree query 4', err);
                res.sendStatus(500);
            });
    };


});





module.exports = router;