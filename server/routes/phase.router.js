// Phase route
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// GET the ALL PHASES data from the serverside
router.get('/', (req, res) => {
    const queryText = `SELECT "name" FROM "phase"`
    pool.query(queryText)
        .then((result) => {
            console.log('GET ALL Phase', result.rows);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error getting all PHASES', err);
            res.sendStatus(500);
        });
});











module.exports = router;