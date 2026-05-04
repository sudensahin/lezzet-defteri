const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/recipes.json');

// JSON dosyasından tüm tarifleri oku
function readRecipes() {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Tarifleri JSON dosyasına yaz
function writeRecipes(recipes) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(recipes, null, 2), 'utf-8');
}

// Tüm tarifleri getir
function getAllRecipes() {
  return readRecipes();
}

// ID'ye göre tarif bul
function findById(id) {
  const recipes = readRecipes();
  return recipes.find(r => r.id === id) || null;
}

// Yeni tarif ekle
function createRecipe({ title, description, ingredients, instructions, author }) {
  const recipes = readRecipes();

  const newRecipe = {
    id: Date.now().toString(),
    title,
    description,
    ingredients,
    instructions,
    author,
    createdAt: new Date().toISOString()
  };

  recipes.push(newRecipe);
  writeRecipes(recipes);

  return { success: true, recipe: newRecipe };
}

// Tarifi güncelle
function updateRecipe(id, updates) {
  const recipes = readRecipes();
  const index = recipes.findIndex(r => r.id === id);

  if (index === -1) return { success: false, message: 'Tarif bulunamadı.' };

  recipes[index] = {
    ...recipes[index],
    ...updates,
    id: recipes[index].id,         // ID değişmemeli
    author: recipes[index].author, // Yazar değişmemeli
    createdAt: recipes[index].createdAt,
    updatedAt: new Date().toISOString()
  };

  writeRecipes(recipes);
  return { success: true, recipe: recipes[index] };
}

// Tarifi sil
function deleteRecipe(id) {
  const recipes = readRecipes();
  const index = recipes.findIndex(r => r.id === id);

  if (index === -1) return { success: false, message: 'Tarif bulunamadı.' };

  const deleted = recipes.splice(index, 1);
  writeRecipes(recipes);

  return { success: true, recipe: deleted[0] };
}

module.exports = { getAllRecipes, findById, createRecipe, updateRecipe, deleteRecipe };