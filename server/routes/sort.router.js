const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route 
 * Retreives all the users trees
 */

// GET the tree info and the user info 
// router.get('/', rejectUnauthenticated, (req, res) => {
//     const id = req.user.id;
//     console.log('GET tree id is:', req.user);

//     const queryText = `SELECT * FROM "tree"
//                        WHERE user_id = $1
//                         `;
//     pool.query(queryText, [id])
//         .then((result) => {
//             // console.log('GET Tree on server', result.rows);
//             res.send(result.rows);
//         })
//         .catch((err) => {
//             console.log('Error completing GET Tree query', err);
//             res.sendStatus(500);
//         });

// });


// GET the tree info by search Keyword
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const sortStatus = req.params.id;
    console.log('The Sort Status is', sortStatus);
    if (sortStatus == 1){
        console.log('Detected sortStatus!');
        const queryText = `SELECT * FROM "tree"`;
        pool.query(queryText)
        .then((result) => {
            console.log('Send back', result.rows);
            res.send(result.rows);
        })
        .catch((err) => {
                console.log('Error completing SORT Tree query 1', err);
                res.sendStatus(500);
            });
    } else if (sortStatus == 2) {
        console.log('Detected sortStatus!');
        const queryText = `SELECT * FROM "tree"`;
        pool.query(queryText)
            .then((result) => {
                console.log('Send back', result.rows);
                res.send(result.rows);
            })
            .catch((err) => {
                console.log('Error completing SORT Tree query 1', err);
                res.sendStatus(500);
            });
    } else if (sortStatus == 3) {
        console.log('Detected sortStatus!');
        const queryText = `SELECT * FROM "tree"`;
        pool.query(queryText)
            .then((result) => {
                console.log('Send back', result.rows);
                res.send(result.rows);
            })
            .catch((err) => {
                console.log('Error completing SORT Tree query 1', err);
                res.sendStatus(500);
            });
    } else if (sortStatus == 4) {
        console.log('Detected sortStatus!');
        const queryText = `SELECT * FROM "tree"`;
        pool.query(queryText)
            .then((result) => {
                console.log('Send back', result.rows);
                res.send(result.rows);
            })
            .catch((err) => {
                console.log('Error completing SORT Tree query 1', err);
                res.sendStatus(500);
            });
    }; 
    

});




// GET the tree info with transaction
// router.get('/:id', rejectUnauthenticated, async (req, res) => {
//     const connection = await pool.connect();
//     try {
//         await connection.query('BEGIN;');
//         const sortStatus = req.params.id;
//         if (sortStatus == 1) {
//             console.log('In sortStatus');
            
//            const queryText = `SELECT * FROM "tree"`;
//             const result1 = await connection.query(queryText);
//         }
        

//         // const sqlText1 = `INSERT INTO "tree" ("user_id", "name") VALUES ($1, $2) RETURNING id`;
//         // // remember to await if its not return the id and console log to see what its returning
//         // const result = await connection.query(sqlText1, [req.body.user_id, req.body.treeName]);
//         // console.log('result.rows is', result.rows);
//         // const newTree = result.rows[0].id;
//         // const sqlText2 = `SELECT "id" FROM "step"`;
//         // const result2 = await connection.query(sqlText2);
//         // const sqlText3 = `INSERT INTO "tree_step" ("tree_id", "step_id", "step_number") VALUES ($1,$2, $3)`;
//         // for (let i = 0, step_counter = 1; i < result2.rows.length; i++, step_counter++) {
//         //     await connection.query(sqlText3, [newTree, result2.rows[i].id, step_counter]);
//         // }
//         await connection.query('COMMIT;');
//         res.sendStatus(201);

//     } catch (error) {
//         console.log('error in GET SORT TREE', error)
//         res.sendStatus(500);
//     } finally {
//         //Super important that we free that connection all the time
//         connection.release();
//     }

// });



module.exports = router;