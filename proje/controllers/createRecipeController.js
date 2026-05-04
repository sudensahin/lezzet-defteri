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