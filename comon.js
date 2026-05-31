// ===== SHARED NAVBAR JS FOR ALL PAGES =====
document.addEventListener('DOMContentLoaded', () => {

  // Set user initial in navbar circle
  const userName  = localStorage.getItem('user_name');
  const userEmail = localStorage.getItem('user_email');

  const profileIcon = document.getElementById('profileIcon');
  const dropdown    = document.getElementById('dropdownMenu');
  const notifIcon   = document.getElementById('notifIcon');
  const notifDropdown = document.getElementById('notifDropdown');

  // Set initial letter
  if (profileIcon && userName) {
    profileIcon.textContent = userName.charAt(0).toUpperCase();
  }

  // Profile dropdown
  if (profileIcon && dropdown) {
    profileIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
      if (notifDropdown) notifDropdown.classList.remove('show');
    });
  }

  // Notification dropdown
  if (notifIcon && notifDropdown) {
    notifIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('show');
      if (dropdown) dropdown.classList.remove('show');
    });
  }

  // Close both dropdowns on outside click
  document.addEventListener('click', () => {
    if (dropdown) dropdown.classList.remove('show');
    if (notifDropdown) notifDropdown.classList.remove('show');
  });

  // Profile button
  const profileBtn = document.getElementById('profileBtn');
  if (profileBtn) {
    profileBtn.onclick = () => window.location.href = 'profile.html';
  }

  // Sign out button
  const signOutBtn = document.getElementById('signOutBtn');
  if (signOutBtn) {
    signOutBtn.onclick = () => {
      localStorage.clear();
      window.location.href = 'index.html';
    };
  }

  // View all notifications
  const viewAllBtn = document.getElementById('viewAllBtn');
  if (viewAllBtn) {
    viewAllBtn.onclick = () => window.location.href = 'notification.html';
  }

  // Hamburger menu
  const menuBtn     = document.querySelector('.menu-btn') || document.getElementById('hamburgerBtn');
  const sidebar     = document.querySelector('.sidebar') || document.getElementById('sidebar');
  const overlay     = document.getElementById('overlay');

  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('show');
      sidebar.classList.toggle('active');
      if (overlay) overlay.classList.toggle('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('show');
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

});
