// Section Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active to clicked nav item
    event.target.closest('.nav-item').classList.add('active');
}

// Update Funding Stats
function updateFunding() {
    const totalGoal = document.getElementById('totalGoal').value;
    const raisedAmount = document.getElementById('raisedAmount').value;
    const supporterCount = document.getElementById('supporterCount').value;
    const daysRemaining = document.getElementById('daysRemaining').value;
    
    // In production, this would send data to backend API
    const fundingData = {
        totalGoal: parseInt(totalGoal),
        raisedAmount: parseInt(raisedAmount),
        supporterCount: parseInt(supporterCount),
        daysRemaining: parseInt(daysRemaining)
    };
    
    console.log('Updating funding stats:', fundingData);
    
    // Save to localStorage for demo purposes
    localStorage.setItem('fundingData', JSON.stringify(fundingData));
    
    showNotification('Funding stats updated successfully!');
    
    // In production, would be:
    /*
    fetch('/api/admin/funding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fundingData)
    })
    .then(response => response.json())
    .then(data => {
        showNotification('Funding stats updated successfully!');
    })
    .catch(error => {
        showNotification('Error updating funding stats', 'error');
        console.error('Error:', error);
    });
    */
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2c5f2d' : '#e74c3c'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize default credentials if not set
    if (!localStorage.getItem('adminCredentials')) {
        const defaultCredentials = {
            username: 'admin',
            password: 'admin123'
        };
        localStorage.setItem('adminCredentials', JSON.stringify(defaultCredentials));
    }
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        showLoginModal();
    } else {
        hideLoginModal();
        updateCurrentUserInfo();
    }
    
    // Load saved funding data if exists
    const savedFunding = localStorage.getItem('fundingData');
    if (savedFunding) {
        const data = JSON.parse(savedFunding);
        document.getElementById('totalGoal').value = data.totalGoal;
        document.getElementById('raisedAmount').value = data.raisedAmount;
        document.getElementById('supporterCount').value = data.supporterCount;
        document.getElementById('daysRemaining').value = data.daysRemaining;
    }
    
    // Show dashboard by default
    document.getElementById('dashboard').classList.add('active');
    
    // Add click handlers to all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        const href = item.getAttribute('href');
        if (href && href.startsWith('#')) {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = href.substring(1);
                showSection(sectionId);
            });
        }
    });
    
    // Logout handler
    document.querySelector('.logout-btn')?.addEventListener('click', handleLogout);
});

// Login Modal Functions
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function handleAdminLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Get stored credentials
    const storedCredentials = JSON.parse(localStorage.getItem('adminCredentials') || '{"username":"admin","password":"admin123"}');
    
    // Validate credentials
    if (username === storedCredentials.username && password === storedCredentials.password) {
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminCurrentUser', username);
        localStorage.setItem('adminLastLogin', new Date().toISOString());
        
        if (rememberMe) {
            localStorage.setItem('adminRememberMe', 'true');
        }
        hideLoginModal();
        updateCurrentUserInfo();
        showNotification('Login successful! Welcome to the admin panel.', 'success');
    } else {
        showNotification('Invalid username or password.', 'error');
    }
    
    // In production, implement proper authentication:
    /*
    fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminLoggedIn', 'true');
            hideLoginModal();
            showNotification('Login successful!', 'success');
        } else {
            showNotification('Invalid credentials', 'error');
        }
    })
    .catch(error => {
        showNotification('Login failed. Please try again.', 'error');
    });
    */
}

function handleLogout() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRememberMe');
    showLoginModal();
    showNotification('Logged out successfully.', 'success');
}

// Gallery Upload Handler (Demo)
function uploadGalleryImage() {
    const stage = document.getElementById('galleryStage').value;
    showNotification('Image upload functionality requires backend integration');
    
    // In production:
    /*
    const formData = new FormData();
    formData.append('stage', stage);
    formData.append('image', document.querySelector('input[type="file"]').files[0]);
    
    fetch('/api/admin/gallery', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        showNotification('Image uploaded successfully!');
        loadGalleryImages();
    });
    */
}

// Build Progress Handler (Demo)
function addTimelineEvent() {
    showNotification('Timeline event functionality requires backend integration');
    
    // In production, would collect form data and send to API
}

// Volunteer Schedule Handler (Demo)
function addBuildDay() {
    showNotification('Build day functionality requires backend integration');
    
    // In production, would collect form data and send to API
}

// Materials Cost Handler (Demo)
function addCostItem() {
    showNotification('Cost item functionality requires backend integration');
    
    // In production, would collect form data and send to API
}

// Live Stream Handler (Demo)
function updateStreamSettings() {
    const platform = document.getElementById('streamPlatform').value;
    const status = document.getElementById('streamStatus').value;
    
    showNotification(`Stream settings updated: ${platform} - ${status}`);
    
    // In production:
    /*
    fetch('/api/admin/livestream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            platform: platform,
            status: status,
            // ... other fields
        })
    })
    .then(response => response.json())
    .then(data => {
        showNotification('Stream settings updated successfully!');
    });
    */
}

// Table row update handlers
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to all update buttons in tables
    document.querySelectorAll('.btn-small').forEach(btn => {
        if (btn.textContent === 'Update') {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                showNotification('Update functionality requires backend integration');
            });
        }
    });
});

// Credential Management Functions
function handleChangeCredentials(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newUsername = document.getElementById('newUsername').value.trim();
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Get current credentials
    const storedCredentials = JSON.parse(localStorage.getItem('adminCredentials') || '{"username":"admin","password":"admin123"}');
    
    // Verify current password
    if (currentPassword !== storedCredentials.password) {
        showNotification('Current password is incorrect.', 'error');
        return;
    }
    
    // Validate new password confirmation
    if (newPassword && newPassword !== confirmPassword) {
        showNotification('New passwords do not match.', 'error');
        return;
    }
    
    // Update credentials
    const updatedCredentials = {
        username: newUsername || storedCredentials.username,
        password: newPassword || storedCredentials.password
    };
    
    localStorage.setItem('adminCredentials', JSON.stringify(updatedCredentials));
    
    // Update current user if username changed
    if (newUsername) {
        localStorage.setItem('adminCurrentUser', newUsername);
    }
    
    // Clear form
    document.getElementById('currentPassword').value = '';
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    
    updateCurrentUserInfo();
    showNotification('Admin credentials updated successfully!', 'success');
}

function updateCurrentUserInfo() {
    const currentUser = localStorage.getItem('adminCurrentUser') || 'admin';
    const lastLogin = localStorage.getItem('adminLastLogin');
    
    const usernameEl = document.getElementById('currentUsername');
    const lastLoginEl = document.getElementById('lastLogin');
    
    if (usernameEl) {
        usernameEl.textContent = currentUser;
    }
    
    if (lastLoginEl && lastLogin) {
        const loginDate = new Date(lastLogin);
        lastLoginEl.textContent = loginDate.toLocaleString();
    }
}

function toggleRequireLogin() {
    const requireLogin = document.getElementById('requireLoginOnReload').checked;
    
    if (requireLogin) {
        localStorage.removeItem('adminRememberMe');
        showNotification('Login will be required on every page reload.', 'success');
    } else {
        showNotification('Remember me feature is now available.', 'success');
    }
}

function clearAllSessions() {
    if (confirm('Are you sure you want to clear all sessions? You will be logged out.')) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminRememberMe');
        localStorage.removeItem('adminCurrentUser');
        localStorage.removeItem('adminLastLogin');
        
        showLoginModal();
        showNotification('All sessions cleared. Please log in again.', 'success');
    }
}
