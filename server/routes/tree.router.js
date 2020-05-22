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

});



























/**
 * PUT route template
 */
router.delete('/:id', (req, res) => {

});

module.exports = router;