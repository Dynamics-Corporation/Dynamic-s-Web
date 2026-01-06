// src/pages/home.js

function loadHomeCSS() {
  if (document.getElementById("home-friend-css")) return;

  const link = document.createElement("link");
  link.id = "home-friend-css";
  link.rel = "stylesheet";
  link.href = "src/utils/css/friends.css/friend.css";
  document.head.appendChild(link);
}

function initHome(container) {
  loadHomeCSS();
  container.innerHTML = `
    <div id="userBanner" class="user-banner" style="margin-bottom:12px"></div>
    <h1 class="page-title">Home</h1>

    <!-- Friends Section -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Friends</h2>
      </div>

      <div class="friends-container" id="friendsContainer">
        <div class="friend-item add-friend">
          <div class="friend-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <span class="friend-name">Add Friend</span>
        </div>
      </div>
    </section>

    <!-- Recommended Section -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Recommended For You</h2>
      </div>
      <div class="library-grid" id="recommendedGrid"></div>
    </section>

    <!-- Resources Section -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Resources</h2>
      </div>
      <div class="continue-grid" id="resourcesGrid"></div>
    </section>

    <!-- Favourites Section -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">Favourites</h2>
      </div>
      <div class="continue-grid" id="favouritesGrid"></div>
    </section>
  `;

  setTimeout(() => {
    loadFriends();
    loadRecommended();
    loadResources();
    loadFavourites();
    setupEventListeners();
  }, 0);

  function updateUserBanner() {
    const banner = document.getElementById('userBanner');
    if (!banner) return;
    const user = window.SessionManager?.getUser() || null;
    if (user) {
      banner.innerHTML = `<div style="font-size:14px">Signed in as <strong>${user.username || user.email}</strong></div>`;
    } else {
      banner.innerHTML = `<div style="font-size:14px">Not signed in</div>`;
    }
  }

  // update on session changes
  updateUserBanner();
  window.addEventListener('session:login', updateUserBanner);
  window.addEventListener('session:logout', updateUserBanner);
  window.addEventListener('session:update', updateUserBanner);
}

window.initHome = initHome;
export default initHome;