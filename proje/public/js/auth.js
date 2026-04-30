// =============================================
//  AUTH — Ortak Kullanıcı Yönetimi Fonksiyonları
// =============================================

const SESSION_KEY = 'recipe_user';

/** Giriş yapmış kullanıcıyı döndürür, yoksa null */
function getUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

/** Kullanıcıyı kaydet (login sonrası) */
function setUser(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

/** Çıkış yap */
function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = '/';
}

/** Sayfanın üst navigasyonunu kullanıcı durumuna göre güncelle */
function renderNav() {
  const user = getUser();
  const navEl = document.getElementById('nav-dynamic');
  if (!navEl) return;

  if (user) {
    navEl.innerHTML = `
      <span class="user-badge">👤 ${user.username}</span>
      <a href="/recipes/view/add" class="nav-cta btn btn-primary btn-sm">+ Tarif Ekle</a>
      <a href="#" onclick="logout(); return false;" style="color:rgba(250,246,240,0.65); font-size:0.8rem; padding:0.4rem 0.75rem;">Çıkış</a>
    `;
  } else {
    navEl.innerHTML = `
      <a href="/auth/login">Giriş Yap</a>
      <a href="/auth/register" class="nav-cta">Kayıt Ol</a>
    `;
  }
}

// Her sayfada nav güncelle
document.addEventListener('DOMContentLoaded', renderNav);