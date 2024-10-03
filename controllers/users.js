const { Router, response } = require("express");
const User = require("../models/user");

const getUsers = async (req, res = response) => {

    const from = req.query.from || 0;
    const limit = parseInt(req.query.limit) || 20;

    const users = await User
        .find({
            _id: { $ne: req.uid }
        }).sort('-online').skip(from)
        .limit(limit);


    res.json({ ok: true, users });
}


module.exports = {
    getUsers,
};