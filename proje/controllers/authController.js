const UserModel = require('../models/UserModel');
const path = require('path');

// GET /auth/register → Register sayfasını göster
function showRegister(req, res) {
  res.sendFile(path.join(__dirname, '../views/register.html'));
}

// GET /auth/login → Login sayfasını göster
function showLogin(req, res) {
  res.sendFile(path.join(__dirname, '../views/login.html'));
}

// POST /auth/register → Kullanıcı kayıt işlemi
function register(req, res) {
  const { username, password } = req.body;

  // Sunucu taraflı basit validasyon
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Kullanıcı adı ve şifre zorunludur.' });
  }
  if (username.length < 3) {
    return res.status(400).json({ success: false, message: 'Kullanıcı adı en az 3 karakter olmalıdır.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Şifre en az 6 karakter olmalıdır.' });
  }

  const result = UserModel.createUser(username, password);

  if (!result.success) {
    return res.status(409).json(result);
  }

  return res.status(201).json(result);
}

// POST /auth/login → Kullanıcı giriş işlemi
function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Kullanıcı adı ve şifre zorunludur.' });
  }

  const result = UserModel.validateUser(username, password);

  if (!result.success) {
    return res.status(401).json(result);
  }

  // Oturum bilgisini client-side'da localStorage ile yönetiyoruz (basit yaklaşım)
  return res.status(200).json(result);
}

module.exports = { showRegister, showLogin, register, login };