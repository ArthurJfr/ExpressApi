const Presentation = require("../models/Presentation");
const Article = require("../models/Article");

exports.getAllPresentations = async (req, res) => {
  let presentations = await Presentation.find();
  res.json(presentations);
};

exports.createPresentation = async (req, res) => {
  try {
    const { articleId, title } = req.body;
    
    // Vérifier si l'article existe
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    const presentation = new Presentation({
      title,
      article: articleId,
      
    });

    await presentation.save();
    res.status(201).json(presentation);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la présentation", error: error.message });
  }
};

exports.editPresentation = async (req, res) => {
  try {
    const { title, articleId } = req.body;

    // Vérifier si la présentation existe
    const presentation = await Presentation.findById(req.params.id);
    if (!presentation) {
      return res.status(404).json({ message: "Présentation non trouvée" });
    }

    // Vérifier si l'article existe si articleId est fourni
    if (articleId) {
      const article = await Article.findById(articleId);
      if (!article) {
        return res.status(404).json({ message: "Article non trouvé" });
      }
    }

    // Mettre à jour la présentation
    const updatedPresentation = await Presentation.findByIdAndUpdate(
        req.params.id,
      {
        title: title || presentation.title,
        article: articleId || presentation.article
      },
      { new: true }
    );

    res.status(200).json(updatedPresentation);
  } catch (error) {
    res.status(500).json({ 
      message: "Erreur lors de la modification de la présentation", 
      error: error.message 
    });
  }
};
