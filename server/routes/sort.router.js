const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



// GET the tree info by search Keyword
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const sortStatus = req.params.id;
    const id = req.user.id;
    console.log('USER id is:', req.user);
    console.log('The Sort Status is', sortStatus);
    if (sortStatus == 1){
        console.log('Detected sortStatus1!');
        const queryText = `SELECT * FROM "tree"
                           WHERE user_id = $1`;
        pool.query(queryText, [id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
                console.log('Error completing SORT Tree query 1', err);
                res.sendStatus(500);
            });
    } else if (sortStatus == 2) {
        console.log('Detected sortStatus!');
        const queryText = `SELECT * FROM "tree"`;
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows);
            })
            .catch((err) => {
                console.log('Error completing SORT Tree query 1', err);
                res.sendStatus(500);
            });
    } else if (sortStatus == 3) {
        console.log('Detected sortStatus!');
        const queryText = `SELECT * FROM "tree"`;
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows);
            })
            .catch((err) => {
                console.log('Error completing SORT Tree query 1', err);
                res.sendStatus(500);
            });
    } else if (sortStatus == 4) {
        console.log('Detected sortStatus!');
        const queryText = `SELECT * FROM "tree"`;
        pool.query(queryText)
            .then((result) => {
                res.send(result.rows);
            })
            .catch((err) => {
                console.log('Error completing SORT Tree query 1', err);
                res.sendStatus(500);
            });
    }; 
    

});





module.exports = router;