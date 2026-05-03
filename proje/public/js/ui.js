// =============================================
//  UI — Toast, Modal, Spinner Yardımcıları
// =============================================

/** Toast bildirimi göster */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : '✗'}</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/** Onay modalı göster, kullanıcı "Evet" derlerse callback çağrılır */
function showConfirm(title, message, onConfirm) {
  let overlay = document.getElementById('confirm-modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'confirm-modal-overlay';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal">
        <h3 id="confirm-title"></h3>
        <p id="confirm-message"></p>
        <div class="modal-actions">
          <button class="btn btn-outline btn-sm" id="confirm-cancel">İptal</button>
          <button class="btn btn-danger btn-sm" id="confirm-ok">Evet, Sil</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeConfirm();
    });
    document.getElementById('confirm-cancel').addEventListener('click', closeConfirm);
  }

  document.getElementById('confirm-title').textContent = title;
  document.getElementById('confirm-message').textContent = message;
  overlay.classList.add('open');

  const okBtn = document.getElementById('confirm-ok');
  const newOk = okBtn.cloneNode(true);
  okBtn.parentNode.replaceChild(newOk, okBtn);
  newOk.addEventListener('click', () => {
    closeConfirm();
    onConfirm();
  });
}

function closeConfirm() {
  const overlay = document.getElementById('confirm-modal-overlay');
  if (overlay) overlay.classList.remove('open');
}

/** Yükleniyor durumu göster/gizle */
function showLoading(containerId, message = 'Yükleniyor...') {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `<div class="loading-wrap"><div class="spinner"></div><p>${message}</p></div>`;
}