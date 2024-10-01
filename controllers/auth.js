const { Router, response } = require("express");
const { validationResult, body } = require("express-validator");

const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: "The email already exists",
            });
        }

        const user = new User(req.body);

        // Encrypt the password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            body: user,
        });
    } catch (error) {
        console.log(error);
    }
};

// Login
const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const existEmail = await User.findOne({ email });
        if (!existEmail) {
            return res.status(404).json({
                ok: false,
                msg: "The email does not exist",
            });
        }

        const validPassword = bcrypt.compareSync(password, existEmail.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "The password is incorrect",
            });
        }

        // Generate JWT
        const token = await generateJWT(existEmail.id);

        res.json({
            ok: true,
            msg: "Welcome back, " + existEmail.name,
            token
        });
    } catch (error) {
        console.log(error);
    }
};

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    // Generate JWT
    const token = await generateJWT(uid);

    // Get user
    const user = await User.findOne({ uid });

    res.json({
        ok: true,
        user,
        token
    });

}

module.exports = {
    createUser,
    loginUser,
    renewToken,
};
