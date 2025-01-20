const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const { getAllArticles } = require("../controllers/article.controller");

router.get("/all", getAllArticles);

router.post("/new", async (req, res) => {
  const article = new Article(req.body);
  await article.save();
  res.json(article);
});

module.exports = router;
