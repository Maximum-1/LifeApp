const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */

//GET the specific step info by sending in the step id:
router.get('/:id', (req, res) => {
    const id = req.params.id
    const queryText = 'SELECT "step"."id", "step"."phase_id", "step"."name", "step"."description", "step"."optional_hint", "step"."step_number" FROM "step" WHERE id=$1';
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
router.get('/', (req, res) => {    
    const queryText = 'SELECT "tree"."name" as "tree_name", "tree"."date_created", "step"."name" as "step_name", "phase"."name" as "phase_name", "tree_step"."status" FROM "tree" LEFT JOIN "tree_step" ON "tree"."id" = "tree_step"."tree_id" LEFT JOIN "step" ON "tree_step"."step_id" = "step"."id" LEFT JOIN "phase" ON "step"."phase_id" = "phase"."id" order by "phase"."id";';
    pool.query(queryText)
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
 * PUT route template
 */
router.put('/:id', (req, res) => {
    
});

module.exports = router;