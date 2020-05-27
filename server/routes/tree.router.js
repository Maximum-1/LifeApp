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
    console.log('in post to add new tree', req.body);
    const sqlText1 = `INSERT INTO "tree" ("user_id", "name") VALUES ($1, $2) RETURNING id`;
    const sqlText2 = `SELECT "id" FROM "step"`;
    const sqlText3 = `INSERT INTO "tree_step" ("tree_id", "step_id") VALUES ($1,$2)`;
    let tree_id = '';

    pool.query(sqlText1, [req.body.user_id, req.body.treeName]).then((response) => {
        tree_id = response.rows[0].id;
        pool.query(sqlText2).then((response) => {
            const steps = response.rows.length;
            for(let i = 0; i < steps; i++) {
                 pool.query(sqlText3, [tree_id,response.rows[i].id])
            }
        })
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