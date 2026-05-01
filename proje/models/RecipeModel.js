const fs = require('fs');
const path = require('path');

// Verilerin saklanacağı JSON dosyasının yolu
const dbPath = path.join(__dirname, '../data/recipes.json');

// Yardımcı fonksiyon: JSON dosyasını oku
const readDB = () => {
    if (!fs.existsSync(dbPath)) return []; // Dosya yoksa boş liste dön
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data || '[]');
};

// Yardımcı fonksiyon: JSON dosyasına yaz
const writeDB = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

const RecipeModel = {
    getAllRecipes: () => {
        return readDB();
    },
    findById: (id) => {
        const recipes = readDB();
        return recipes.find(r => r.id == id);
    },
    createRecipe: (newRecipe) => {
        const recipes = readDB();
        const recipeWithId = { id: Date.now(), ...newRecipe }; // Her tarife eşsiz ID ver
        recipes.push(recipeWithId);
        writeDB(recipes);
        return { success: true, message: 'Tarif kaydedildi!', recipe: recipeWithId };
    },
    updateRecipe: (id, updatedData) => {
        let recipes = readDB();
        recipes = recipes.map(r => r.id == id ? { ...r, ...updatedData } : r);
        writeDB(recipes);
        return { success: true, message: 'Tarif güncellendi!' };
    },
    deleteRecipe: (id) => {
        let recipes = readDB();
        recipes = recipes.filter(r => r.id != id);
        writeDB(recipes);
        return { success: true, message: 'Tarif silindi!' };
    }
};

module.exports = RecipeModel;

//Sonuç Olarak Ne Olacak?
//Sen tarayıcıdan bir tarif eklediğinde recipeController çalışacak.

//recipeController gidip RecipeModel'e "bunu kaydet" diyecek.