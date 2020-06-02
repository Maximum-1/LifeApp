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
    if (sortStatus === '1'){
        const queryText = `SELECT * FROM "tree"`;
    } ;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error completing SORT Tree query', err);
            res.sendStatus(500);
        });

});


module.exports = router;