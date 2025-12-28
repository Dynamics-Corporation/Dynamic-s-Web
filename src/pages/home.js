// Home page

function initHome(container) {
    container.innerHTML = `
        <h1 class="page-title">Dashboard</h1>

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
    `;

    // Load data after DOM is ready
    setTimeout(() => {
        loadFriends();
        loadRecommended();
        loadResources();
        setupEventListeners();
    }, 0);
}

function setupEventListeners() {
    const addFriendBtn = document.querySelector('.add-friend');
    if (addFriendBtn) {
        addFriendBtn.addEventListener('click', () => {
            const username = prompt('Enter username to add:');
            if (username) {
                alert(`Friend request sent to ${username}!`);
                // Add your API call here
            }
        });
    }
}

function loadFriends() {
    const container = document.getElementById('friendsContainer');
    if (!container) return;

    // Sample friends data
    const friends = [
        { name: 'Alex', online: true },
        { name: 'Jordan', online: true },
        { name: 'Sam', online: false },
        { name: 'Taylor', online: true },
        { name: 'Morgan', online: false }
    ];

    friends.forEach(friend => {
        const friendEl = document.createElement('div');
        friendEl.className = `friend-item ${friend.online ? 'online' : ''}`;
        friendEl.innerHTML = `
            <div class="friend-avatar">${friend.name[0]}</div>
            <span class="friend-name">${friend.name}</span>
        `;
        friendEl.addEventListener('click', () => {
            alert(`Opening chat with ${friend.name}`);
        });
        container.appendChild(friendEl);
    });
}

function loadRecommended() {
    const container = document.getElementById('recommendedGrid');
    if (!container) return;

    const items = [
        { title: 'Calculus Notes', rating: 95, icon: '📐', badge: 'Popular' },
        { title: 'Physics Guide', rating: 92, icon: '⚛️', badge: 'Verified' },
        { title: 'Chemistry 101', rating: 88, icon: '🧪' },
        { title: 'Biology Basics', rating: 90, icon: '🧬' },
        { title: 'History Timeline', rating: 87, icon: '📜' }
    ];

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'library-card';
        card.innerHTML = `
            <div class="card-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <span style="font-size: 48px;">${item.icon}</span>
                ${item.badge ? `<div class="card-badge">${item.badge}</div>` : ''}
            </div>
            <div class="card-content">
                <div class="card-title">${item.title}</div>
                <div class="card-rating">
                    <span class="rating-icon">👍</span>
                    <span>${item.rating}% Rating</span>
                </div>
            </div>
        `;
        card.addEventListener('click', () => {
            alert(`Opening: ${item.title}`);
        });
        container.appendChild(card);
    });
}

function loadResources() {
    const container = document.getElementById('resourcesGrid');
    if (!container) return;

    const items = [
        { title: 'Study Schedule', icon: '📅' },
        { title: 'Practice Tests', icon: '📝' },
        { title: 'Flashcards', icon: '🗂️' },
        { title: 'Video Lectures', icon: '🎥' }
    ];

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'continue-card';
        card.innerHTML = `
            <div class="card-image" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                <span style="font-size: 48px;">${item.icon}</span>
            </div>
            <div class="card-content">
                <div class="card-title">${item.title}</div>
            </div>
        `;
        card.addEventListener('click', () => {
            alert(`Opening: ${item.title}`);
        });
        container.appendChild(card);
    });
}

// Make function globally available
window.initHome = initHome;