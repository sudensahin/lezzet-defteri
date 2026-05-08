const RecipeModel = require('../models/RecipeModel');
const path = require('path');

// GET all
function getAllRecipes(req, res) {
  const recipes = RecipeModel.getAllRecipes();
  return res.json({ success: true, recipes });
}

// GET one
function getRecipe(req, res) {
  const recipe = RecipeModel.findById(req.params.id);

  if (!recipe) {
    return res.status(404).json({
      success: false,
      message: 'Tarif bulunamadı.'
    });
  }

  return res.json({
    success: true,
    recipe
  });
}

// VIEW: add
function showAddRecipe(req, res) {
  res.sendFile(path.join(__dirname, '../views/add-recipe.html'));
}

// VIEW: edit
function showEditRecipe(req, res) {
  res.sendFile(path.join(__dirname, '../views/edit-recipe.html'));
}

// VIEW: detail
function showRecipeDetail(req, res) {
  res.sendFile(path.join(__dirname, '../views/recipe-detail.html'));
}

// CREATE
function createRecipe(req, res) {
  const { title, description, ingredients, instructions, author } = req.body;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({
      success: false,
      message: 'Başlık, malzemeler ve hazırlanış zorunludur.'
    });
  }

  if (!author) {
    return res.status(401).json({
      success: false,
      message: 'Giriş yapmalısınız.'
    });
  }

  const result = RecipeModel.createRecipe({
    title,
    description,
    ingredients,
    instructions,
    author
  });

  return res.status(201).json(result);
}

// UPDATE
function updateRecipe(req, res) {
  const { title, description, ingredients, instructions, requestingUser } = req.body;

  const recipe = RecipeModel.findById(req.params.id);

  if (!recipe) {
    return res.status(404).json({
      success: false,
      message: 'Tarif bulunamadı.'
    });
  }

  if (!requestingUser) {
    return res.status(401).json({
      success: false,
      message: 'Giriş yapmalısınız.'
    });
  }

  if (recipe.author !== requestingUser) {
    return res.status(403).json({
      success: false,
      message: 'Bu tarifi sadece sahibi düzenleyebilir.'
    });
  }

  const result = RecipeModel.updateRecipe(req.params.id, {
    title,
    description,
    ingredients,
    instructions
  });

  return res.json(result);
}

// DELETE (EKLENDİ)
function deleteRecipe(req, res) {
  const result = RecipeModel.deleteRecipe(req.params.id);

  if (!result.success) {
    return res.status(404).json(result);
  }

  return res.json(result);
}

module.exports = {
  getAllRecipes,
  getRecipe,
  showAddRecipe,
  showEditRecipe,
  showRecipeDetail,
  createRecipe,
  updateRecipe,
  deleteRecipe
};