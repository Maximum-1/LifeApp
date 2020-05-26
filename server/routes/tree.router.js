const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = 'SELECT "tree"."id", "tree"."name", "tree"."date_created", "tree"."date_finished", "tree"."status", "user"."id", "user"."username" FROM "tree" JOIN "user" ON "tree"."user_id" = "user"."id" order by "tree"."name"';
    pool.query(queryText)
        .then((result) => {
            console.log('GET Tree on server', result.rows);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error completing GET Tree query', err);
            res.sendStatus(500);
        });
});



















/**
 * POST route template
 */
router.post('/', (req, res) => {

});



























/**
 * PUT route template
 */
router.delete('/:id', (req, res) => {

});

module.exports = router;