/* 
    Path: /api/messages
*/

const express = require('express');
const { validateJWT } = require('../middlewares/validate_jwt');
const { getChat } = require('../controllers/messages');

const router = express.Router();

router.get('/:from', validateJWT, getChat);

module.exports = router;
