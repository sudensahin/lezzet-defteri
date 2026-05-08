const RecipeModel = require('../models/RecipeModel');
const path = require('path');

// GET /recipes → Tüm tarifleri JSON olarak döndür (API)
function getAllRecipes(req, res) {
  const recipes = RecipeModel.getAllRecipes();
  return res.json({ success: true, recipes });
}

// GET /recipes/:id → Tek tarif JSON
function getRecipe(req, res) {
  const recipe = RecipeModel.findById(req.params.id);
  if (!recipe) return res.status(404).json({ success: false, message: 'Tarif bulunamadı.' });
  return res.json({ success: true, recipe });
}

// GET /recipes/view/add → Tarif ekleme sayfası
function showAddRecipe(req, res) {
  res.sendFile(path.join(__dirname, '../views/add-recipe.html'));
}

// GET /recipes/view/edit/:id → Tarif düzenleme sayfası
function showEditRecipe(req, res) {
  res.sendFile(path.join(__dirname, '../views/edit-recipe.html'));
}

// GET /recipes/view/:id → Tarif detay sayfası
function showRecipeDetail(req, res) {
  res.sendFile(path.join(__dirname, '../views/recipe-detail.html'));
}




module.exports = { getAllRecipes, getRecipe, showAddRecipe, showEditRecipe, showRecipeDetail, };