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
 * PUT route template
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
    if(req.isAuthenticated()) {
        let answer = req.body.answer;
        let step_id = req.params.id;

        //Updates the step with the answer the user provided
        const queryText = `
                            UPDATE step 
                            SET content = $1
                            WHERE id = $2;`;
        pool.query(queryText,[answer, step_id]).then((result) => {
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