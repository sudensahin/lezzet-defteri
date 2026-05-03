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

// POST /recipes → Yeni tarif oluştur
function createRecipe(req, res) {
  const { title, description, ingredients, instructions } = req.body;
  const author = req.body.author;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ success: false, message: 'Başlık, malzemeler ve hazırlanış zorunludur.' });
  }
  if (!author) {
    return res.status(401).json({ success: false, message: 'Tarif eklemek için giriş yapmalısınız.' });
  }

  const result = RecipeModel.createRecipe({ title, description, ingredients, instructions, author });
  return res.status(201).json(result);
}

// PUT /recipes/:id → Tarifi güncelle
function updateRecipe(req, res) {
  const { title, description, ingredients, instructions, requestingUser } = req.body;
  const recipe = RecipeModel.findById(req.params.id);

  if (!recipe) return res.status(404).json({ success: false, message: 'Tarif bulunamadı.' });
  if (!requestingUser) return res.status(401).json({ success: false, message: 'Giriş yapmalısınız.' });
  if (recipe.author !== requestingUser) {
    return res.status(403).json({ success: false, message: 'Bu tarifi sadece yazan kişi düzenleyebilir.' });
  }

  const result = RecipeModel.updateRecipe(req.params.id, { title, description, ingredients, instructions });
  return res.json(result);
}



module.exports = { getAllRecipes, getRecipe, showAddRecipe, showEditRecipe, showRecipeDetail, createRecipe, updateRecipe };