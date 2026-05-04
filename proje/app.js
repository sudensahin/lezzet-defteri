const express = require('express');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine: plain HTML files served via routes
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/auth', authRoutes);
app.use('/recipes', recipeRoutes);

// Ana sayfa
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`🍴 Tarif Uygulaması çalışıyor: http://localhost:${PORT}`);
});

module.exports = app;