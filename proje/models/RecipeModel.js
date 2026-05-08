const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/recipes.json');

// READ
function readRecipes() {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error("JSON okuma hatası:", err);
    return [];
  }
}

// WRITE
function writeRecipes(recipes) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(recipes, null, 2), 'utf-8');
}

// GET ALL
function getAllRecipes() {
  return readRecipes();
}

// FIND
function findById(id) {
  const recipes = readRecipes();
  return recipes.find(r => r.id === id) || null;
}

// CREATE
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

// UPDATE
function updateRecipe(id, updates) {
  const recipes = readRecipes();
  const index = recipes.findIndex(r => r.id === id);

  if (index === -1) {
    return { success: false, message: 'Tarif bulunamadı.' };
  }

  recipes[index] = {
    ...recipes[index],
    ...updates,
    id: recipes[index].id,
    author: recipes[index].author,
    createdAt: recipes[index].createdAt,
    updatedAt: new Date().toISOString()
  };

  writeRecipes(recipes);

  return { success: true, recipe: recipes[index] };
}

// DELETE
function deleteRecipe(id) {
  const recipes = readRecipes();
  const index = recipes.findIndex(r => r.id === id);

  if (index === -1) {
    return { success: false, message: 'Tarif bulunamadı.' };
  }

  const deleted = recipes.splice(index, 1);
  writeRecipes(recipes);

  return { success: true, recipe: deleted[0] };
}

module.exports = {
  getAllRecipes,
  findById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};