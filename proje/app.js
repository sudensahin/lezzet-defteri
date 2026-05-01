const authController = require('./controllers/authController');
const recipeController = require('./controllers/recipeController');

// dosyanın en üst kısmına (require satırlarının altına) şu satırları
//  ekledım kı uygulama o dosyaların varlığından haberdar olsun:


const express = require('express');
const path = require('path');
const app = express();

// JSON verilerini okuyabilmek için gerekli ayarlar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CSS, Resim ve JS dosyalarının olduğu 'public' klasörünü dışarı açıyoruz
app.use(express.static(path.join(__dirname, 'public')));

// HTML dosyalarının olduğu 'views' klasörünü kolayca kullanabilmek için
app.use(express.static(path.join(__dirname, 'views')));

// --- ROTALAR (ROUTES) ---



// Kayıt Olma İşlemi (Lütfiye'nin görevi)
app.post('/auth/register', authController.register);

// Giriş Yapma İşlemi (İpek'in görevi)
app.post('/auth/login', authController.login);

// Yeni Tarif Ekleme (Senin görevin - Sudenur)
app.post('/api/recipes', recipeController.addRecipe);








// Ana sayfa açıldığında login.html gelsin
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Kayıt sayfası rotası
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Tarif ekleme sayfası rotası
app.get('/add-recipe', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'add-recipe.html'));
});

// --- SUNUCUYU BAŞLAT ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Sunucu çalıştı! Tasarımı görmek için tarayıcıya git: http://localhost:${PORT}`);
});       // Bu kodlar sadece tasarımı (HTML/CSS) görmeni sağlar.

// yazdıgım kodlar henuz lutfıyenın baglantısı yolk