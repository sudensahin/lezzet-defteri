const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/users.json');

// JSON dosyasından tüm kullanıcıları oku
function readUsers() {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Kullanıcıları JSON dosyasına yaz
function writeUsers(users) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(users, null, 2), 'utf-8');
}

// Kullanıcı adına göre kullanıcı bul
function findByUsername(username) {
  const users = readUsers();
  return users.find(u => u.username === username) || null;
}

// Yeni kullanıcı oluştur
function createUser(username, password) {
  const users = readUsers();

  if (findByUsername(username)) {
    return { success: false, message: 'Bu kullanıcı adı zaten alınmış.' };
  }

  const newUser = {
    id: Date.now().toString(),
    username,
    password, // Gerçek projede bcrypt ile hash'lenmeli!
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  writeUsers(users);

  return { success: true, user: { id: newUser.id, username: newUser.username } };
}

// Kullanıcı doğrula (login)
function validateUser(username, password) {
  const user = findByUsegrname(username);
  if (!user) return { success: false, message: 'Kullanıcı bulunamadı.' };
  if (user.password !== password) return { success: false, message: 'Şifre yanlış.' };
  return { success: true, user: { id: user.id, username: user.username } };
}

module.exports = { findByUsername, createUser, validateUser };