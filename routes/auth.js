/* 
    Path: '/api/login'
*/

const { Router, response } = require('express');
const { check, validationResult } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate_jwt');
const { validateFields } = require('../middlewares/validate_fields');

const router = Router();

// Register
router.post('/new', [

    check('name', 'The name is required').not().isEmpty(),
    validateFields,
    check('email', 'The email is required').not().isEmpty(),
    validateFields,
    check('email', 'The email is not valid').isEmail(),
    validateFields,
    check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
    validateFields
], createUser);


// Login
router.post('/', [
    check('email', 'The email is required').not().isEmpty(),
    validateFields,
    check('email', 'The email is not valid').isEmail(),
    validateFields,
    check('password', 'The password is required').not().isEmpty(),
    validateFields
], loginUser);

// Validate token
router.get('/renew', validateJWT, renewToken);




module.exports = router;