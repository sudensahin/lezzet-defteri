const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Sayfalar
router.get('/register', authController.showRegister);
router.get('/login', authController.showLogin);

// API İşlemleri
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
