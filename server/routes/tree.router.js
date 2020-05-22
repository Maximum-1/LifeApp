const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {

});



















/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('in fav router', req.body);
    let sqlText = `INSERT INTO "tree" ("user_id", "name") VALUES ($1, $2)`;
    pool.query(sqlText, [req.body.user_id, req.body.tree_name]).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error in adding tree to database ', error)
        res.sendStatus(500);
    });
});



























/**
 * PUT route template
 */
router.delete('/:id', (req, res) => {

});

module.exports = router;