const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */

//GET the specific step info by sending in the step id:
router.get('/:id', rejectUnauthenticated, async(req, res) => {
    const id = req.params.id
    const queryText = `
                        SELECT "tree_step"."id" as "tree_step_id", "step"."name" as "step_name", "phase"."name" as "phase_name", "step"."description", "step"."optional_hint", "tree_step"."content" 
                        FROM "tree" 
                        LEFT JOIN "tree_step" ON "tree"."id" = "tree_step"."tree_id" 
                        LEFT JOIN "step" ON "tree_step"."step_id" = "step"."id" 
                        LEFT JOIN "phase" ON "step"."phase_id" = "phase"."id" 
                        WHERE "tree"."id" = $1
                        order by "phase"."id";
                        `;
    pool.query(queryText, [id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error completing GET Step query', err);
            res.sendStatus(500);
        });
});

// GET the PHASE and STEP information after clicking the Tree
router.get('/phases/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id;
    const queryText = `
                        SELECT "step"."id" as "step_id",
                        "tree_step"."id" as "tree_step_id",
                        "tree"."name" as "tree_name", 
                        "tree"."date_created", 
                        "step"."name" as "step_name",
                        "step"."description",
                        "step"."optional_hint", 
                        "phase"."name" as "phase_name", 
                        "tree_step"."status", 
                        "tree_step"."locked",
                        "tree_step"."step_number",
                        "tree_step"."content"
                        FROM "tree" 
                        LEFT JOIN "tree_step" ON "tree"."id" = "tree_step"."tree_id" 
                        LEFT JOIN "step" ON "tree_step"."step_id" = "step"."id" 
                        LEFT JOIN "phase" ON "step"."phase_id" = "phase"."id" 
                        WHERE "tree"."id" = $1
                        order by "tree_step"."step_number";
                        `;
    pool.query(queryText, [id])
        .then((result) => {
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
router.put('/update-step/:id', rejectUnauthenticated, async(req, res) => {
    const answer = req.body.answer;
    const tree_step_id = Number(req.params.id);
    const status = true;
    const locked = false;

    console.log('update-step variables are', answer, tree_step_id);
    //Need to use the same database connection for the entire transaction
    const connection = await pool.connect();

    try {
        await connection.query('BEGIN;');
        const queryText1 = `UPDATE tree_step SET content = $1, status = $2 WHERE id = $3;`;
        await connection.query(queryText1, [answer, status, tree_step_id]);
        const queryText2 = `UPDATE tree_step SET locked = $1 WHERE id = $2;`;
        await connection.query(queryText2, [locked, tree_step_id + 1]);
        await connection.query( 'COMMIT;' );
        res.sendStatus(200);
    } catch(error) {
        console.log('error in adding tree to database ', error)
        res.sendStatus(500);
    } finally {
        //Super important that we free that connection all the time
        connection.release();
    }
    //Updates the step with the answer the user provided
    // const queryText = `
    //                     UPDATE tree_step 
    //                     SET content = $1, status = $2, locked = $3
    //                     WHERE id = $4;
    //                     `;
    // pool.query(queryText, [answer, status, tree_step_id]).then((result) => {
    //     res.sendStatus(204);
    // }).catch((error) => {
    //     console.log(`Error on query ${error}`);
    //     res.sendStatus(500);
    // });
});

/**
 * PUT route for updating a tree status from false to true
 * Make sure to do this if step 20 is completed
 */
router.put('/update-tree/:id', rejectUnauthenticated, (req, res) => {
    const tree_id = req.params.id;
    const status = true;

    //Updates the step with the answer the user provided
    const queryText = `
                        UPDATE tree 
                        SET status = $1
                        WHERE id = $2;
                        `;
    pool.query(queryText, [status, tree_id]).then((result) => {
        res.sendStatus(204);
    }).catch((error) => {
        console.log(`Error on query ${error}`);
        res.sendStatus(500);
    });
});

/**
 * PUT route for updating a tree status from false to true
 * Make sure to do this if step 20 is completed
 */
router.put('/unlock-step-1/:tree_id', rejectUnauthenticated, (req, res) => {
    const tree_id = req.params.tree_id;
    const step_number = req.body.step;
    const locked = false;

    //Unlock step number one when the user clicks view tree
    const queryText = `
                        UPDATE tree_step 
                        SET locked = $1
                        WHERE tree_id = $2 AND step_id = $3;
                        `;
    pool.query(queryText, [locked, tree_id, step_number]).then((result) => {
        res.sendStatus(204);
    }).catch((error) => {
        console.log(`Error on query ${error}`);
        res.sendStatus(500);
    });
});

module.exports = router;