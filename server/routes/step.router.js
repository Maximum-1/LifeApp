const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = '';
    pool.query(queryText)
        .then((result) => {
            console.log('GET Step on server', result.rows);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error completing GET Step query', err);
            res.sendStatus(500);
        });
});




















/**
 * PUT route template
 */
router.put('/:id', (req, res) => {
    
});

module.exports = router;