const express = require("express");
const router = express.Router();

const {login , dashBoard} = require("../controllers/main");

router.route("/dashBoard").get(dashBoard);

//to get user credentials
router.route("/login").post(login);

module.exports = router;