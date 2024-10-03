const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {

    const errors = validationResult(req);

    const firstErrorMsg = errors.array().map(error => error.msg)[0];

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errorMsg: firstErrorMsg,
        });
    }

    next();
}

module.exports = {
    validateFields
}