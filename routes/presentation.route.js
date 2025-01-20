const express = require("express");
const router = express.Router();
const Presentation = require("../models/Presentation");
const { getAllPresentations, createPresentation, editPresentation } = require("../controllers/presentation.controller");

router.get("/all", getAllPresentations);

router.post("/new", createPresentation);
router.put("/edit/:id", editPresentation);


module.exports = router;
