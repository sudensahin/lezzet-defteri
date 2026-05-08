const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Sayfa Rotaları (View)  — spesifik rotalar önce gelmeli
router.get('/view/add', recipeController.showAddRecipe);
router.get('/view/edit/:id', recipeController.showEditRecipe);
router.get('/view/:id', recipeController.showRecipeDetail);

// API Rotaları (JSON)
router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipe);
router.post('/', recipeController.createRecipe);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;