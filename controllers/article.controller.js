const Article = require("../models/Article");

exports.getAllArticles = async (req, res) => {
  let articles = await Article.find();
  res.json(articles);
};

