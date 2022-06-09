const express = require("express");

const router = express.Router();

const middleware = require("./user.middleware");
const controller = require("./user.controller");

router.post("/login", middleware.loadUserByEmail, controller.login);

module.exports = router;
