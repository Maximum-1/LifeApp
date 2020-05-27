const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */

// GET the tree info and the user info 
router.get('/', (req, res) => {

    const queryText = 'SELECT "tree"."id", "tree"."name", "tree"."date_created", "tree"."date_finished", "tree"."steps_completed", "tree"."status", "user"."id" FROM "tree" JOIN "user" ON "tree"."user_id" = "user"."id" order by "tree"."name"';
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
 * DELETE route template
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    // Set tree ID to variable
    const id = req.params.id;
    console.log('Tree id is', id);
    // First, we delete step data attached to the tree ID
    const deleteQuery = `DELETE FROM "tree_step" WHERE "tree_id" = $1;`;
    pool.query(deleteQuery, [id])
        .then(() => {
            // Now that we have deleted the step data associated with the tree,
            // we can now delete the whole tree
            const deleteTreeQuery = `DELETE FROM "tree" WHERE "id" = $1;`;
            pool.query(deleteTreeQuery, [id])
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Cannot complete DELETE tree request', error);
            res.sendStatus(500);
        })
});

module.exports = router;