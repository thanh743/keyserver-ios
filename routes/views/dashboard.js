const express = require('express');
const router = express.Router();
const auth = require("../../middleware/auth");
const { User } = require('../../models/user');
const {Device} = require('../../models/device');

// Dashboard /dashboard
router.get("/",auth, function (req, res) {
    return res.render("index");
})
router.get("/devices",auth, async function (req, res) {
    const user = await User.findById(req.user._id);
    const devices = await Device.find({user: user});
    return res.render("devices", {user: user.email, devices: devices});
})


module.exports =  router;