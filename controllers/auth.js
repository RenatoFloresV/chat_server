const { Router, response } = require("express");
const { validationResult, body } = require("express-validator");

const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");
const user = require("../models/user");

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                errorMsg: "The email already exists",
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
            user: user,
            msg: "Welcome, " + user.name,
            token: token,
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
                errorMsg: "The email does not exist",
            });
        }

        const validPassword = bcrypt.compareSync(password, existEmail.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                errorMsg: "The password is incorrect",
            });
        }

        // Generate JWT
        const token = await generateJWT(existEmail.id);

        // Get user
        const user = await User.findOne({ email });

        res.json({
            ok: true,
            msg: "Welcome back, " + existEmail.name,
            user,
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
    const user = await User.findById(uid);

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
