const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */

//GET the specific step info by sending in the step id:
router.get('/steps/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id
    const queryText = `
                        SELECT "step"."id", "step"."phase_id", "step"."name", "step"."description", "step"."optional_hint", "step"."step_number" 
                        FROM "step" WHERE id=$1`;
    pool.query(queryText, [id])
        .then((result) => {console.log('GET Step on server', result.rows);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error completing GET Step query', err);
            res.sendStatus(500);
        });
});

// GET the PHASE and STEP information after clicking the Tree
router.get('/phases/:id', rejectUnauthenticated, (req, res) => {    
    const id=req.params.id;
    const queryText = `
                        SELECT "step"."id" as "step_id", "tree"."name" as "tree_name", "tree"."date_created", "step"."name" as "step_name", "phase"."name" as "phase_name", "tree_step"."status" 
                        FROM "tree" 
                        LEFT JOIN "tree_step" ON "tree"."id" = "tree_step"."tree_id" 
                        LEFT JOIN "step" ON "tree_step"."step_id" = "step"."id" 
                        LEFT JOIN "phase" ON "step"."phase_id" = "phase"."id" 
                        WHERE "tree"."id" = $1
                        order by "phase"."id";
                        `;
    pool.query(queryText,[id])
        .then((result) => {
            console.log('GET Phase on server', result.rows);
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error completing GET PHASE query', err);
            res.sendStatus(500);
        });
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