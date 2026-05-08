// DELETE /recipes/:id → Tarifi sil
function deleteRecipe(req, res) {
  const { requestingUser } = req.body;
  const recipe = RecipeModel.findById(req.params.id);

  if (!recipe) return res.status(404).json({ success: false, message: 'Tarif bulunamadı.' });
  if (!requestingUser) return res.status(401).json({ success: false, message: 'Giriş yapmalısınız.' });
  if (recipe.author !== requestingUser) {
    return res.status(403).json({ success: false, message: 'Bu tarifi sadece yazan kişi silebilir.' });
  }

  const result = RecipeModel.deleteRecipe(req.params.id);
  return res.json(result);
}

module.exports = { getAllRecipes, getRecipe, showAddRecipe, showEditRecipe, showRecipeDetail, createRecipe, updateRecipe, deleteRecipe };