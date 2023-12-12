const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();


router.get("/register", async (req, res) => {
    return res.render("register");
})
router.get("/login", async(req,res) => {
    return res.render("login")
})
// put or patch
module.exports = router;