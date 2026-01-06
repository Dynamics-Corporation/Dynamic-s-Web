// src/pages/resources.js
export default function initResources(container) {
  container.innerHTML = `
    <div id="userBanner" style="margin-bottom:12px"></div>
    <h1>Resources</h1>
  `;

  function updateUserBanner() {
    const banner = document.getElementById('userBanner');
    if (!banner) return;
    const user = window.SessionManager?.getUser() || null;
    banner.innerHTML = user ? `Signed in as <strong>${user.username || user.email}</strong>` : 'Not signed in';
  }

  updateUserBanner();
  window.addEventListener('session:login', updateUserBanner);
  window.addEventListener('session:logout', updateUserBanner);
  window.addEventListener('session:update', updateUserBanner);
}
