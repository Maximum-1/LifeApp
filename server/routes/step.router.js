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
 * PUT route for when a step is answered in a tree/phase
 * Updates the content field and the status to true
 */
router.put('/update-step/:id', rejectUnauthenticated, (req, res) => {
    if(req.isAuthenticated()) {
        const answer = req.body.answer;
        const tree_step_id = req.params.id;
        const status = true;

        //Updates the step with the answer the user provided
        const queryText = `
                            UPDATE tree_step 
                            SET content = $1, status = $2
                            WHERE id = $3
                            RETURNING tree_id;
                          `;
        pool.query(queryText,[answer, status, tree_step_id]).then((result) => {
                res.sendStatus(204);
            }).catch( (error) => {
                console.log(`Error on query ${error}`);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

/**
 * PUT route for updating a tree status from false to true
 * Make sure to do this if step 20 is completed
 */
router.put('/update-tree/:id', rejectUnauthenticated, (req, res) => {
    if(req.isAuthenticated()) {
        const tree_id = req.params.id;
        const status = true;

        //Updates the step with the answer the user provided
        const queryText = `
                            UPDATE tree 
                            SET status = $1
                            WHERE id = $2;
                          `;
        pool.query(queryText,[status, tree_id]).then((result) => {
                res.sendStatus(204);
            }).catch( (error) => {
                console.log(`Error on query ${error}`);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;