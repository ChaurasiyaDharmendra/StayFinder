const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("I m root");
});

router.get("/:id", (req, res) => {
    res.send("I m id's root");
});

module.exports = router;
