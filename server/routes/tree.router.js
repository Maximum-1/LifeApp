const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */

// GET the tree info and the user info 
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id;
    console.log('GET tree id is:', req.params.id);
    
    const queryText = `SELECT * FROM "tree"
                        WHERE user_id = $1
                        `;
    pool.query(queryText, [id])
        .then((result) => {
            // console.log('GET Tree on server', result.rows);
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
router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log('in post to add new tree', req.body);
    //Need to use the same database connection for the entire transaction
    const connection = await pool.connect();

    try{
        await connection.query('BEGIN;');
        const sqlText1 = `INSERT INTO "tree" ("user_id", "name") VALUES ($1, $2) RETURNING id`;
        // remember to await if its not return the id and console log to see what its returning
        const result =  await connection.query(sqlText1, [req.body.user_id, req.body.treeName]);
        console.log('result.rows is', result.rows);
        const newTree = result.rows[0].id;
        const sqlText2 = `SELECT "id" FROM "step"`;
        const result2 = await connection.query(sqlText2);
        const sqlText3 = `INSERT INTO "tree_step" ("tree_id", "step_id") VALUES ($1,$2)`;
        for(let i = 0; i < result2.rows.length; i++) {
            await connection.query(sqlText3, [newTree, result2.rows[i].id]);
        }
        await connection.query( 'COMMIT;' );
        res.sendStatus(200);
    } catch(error) {
        console.log('error in adding tree to database ', error)
        res.sendStatus(500);
    } finally {
        //Super important that we free that connection all the time
        connection.release();
    }
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