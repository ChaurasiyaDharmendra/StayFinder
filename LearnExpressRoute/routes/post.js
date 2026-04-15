const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("I m post's root");
});

router.get("/:id", (req, res) => {
    res.send("I m post's id's root");
});

module.exports = router;
