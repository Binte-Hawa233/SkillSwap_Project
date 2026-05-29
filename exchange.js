// ===== SIDEBAR =====
const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

hamburgerBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
});
overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});

// ===== FILTER BOX =====
const toggleFilter = document.getElementById('toggleFilter');
const filterBox = document.getElementById('filterBox');
const closeFilter = document.getElementById('closeFilter');

toggleFilter.innerHTML = '<span class="material-icons">filter_alt</span> Show Filters';

toggleFilter.addEventListener('click', () => {
  const isHidden = filterBox.style.display === 'none' || filterBox.style.display === '';
  filterBox.style.display = isHidden ? 'block' : 'none';
  if (isHidden) {
    toggleFilter.innerHTML = '<span class="material-icons">filter_alt</span> Hide Filters';
    toggleFilter.classList.add('active');
  } else {
    toggleFilter.innerHTML = '<span class="material-icons">filter_alt</span> Show Filters';
    toggleFilter.classList.remove('active');
  }
});

closeFilter.addEventListener('click', () => {
  filterBox.style.display = 'none';
  toggleFilter.innerHTML = '<span class="material-icons">filter_alt</span> Show Filters';
  toggleFilter.classList.remove('active');
});

document.getElementById('resetFilter').addEventListener('click', () => {
  document.getElementById('teachFilter').value = '';
  document.getElementById('learnFilter').value = '';
  document.getElementById('locationFilter').value = '';
});

document.getElementById('applyFilter').addEventListener('click', () => {
  const teach = document.getElementById('teachFilter').value.toLowerCase();
  const learn = document.getElementById('learnFilter').value.toLowerCase();
  document.querySelectorAll('.user-card').forEach(card => {
    const teachTags = card.querySelectorAll('.skill-tag.teach');
    const learnTags = card.querySelectorAll('.skill-tag.learn');
    const teachMatch = teach === '' || [...teachTags].some(t => t.textContent.toLowerCase().includes(teach));
    const learnMatch = learn === '' || [...learnTags].some(t => t.textContent.toLowerCase().includes(learn));
    card.style.display = teachMatch && learnMatch ? 'block' : 'none';
  });
});

// ===== SHOW MATCHES =====
const showMatchesBtn = document.getElementById('showMatchesBtn');
const noMatchesBox = document.getElementById('noMatchesBox');
const cardsGrid = document.getElementById('cardsGrid');

showMatchesBtn.addEventListener('click', () => {
  cardsGrid.style.display = 'none';
  noMatchesBox.classList.add('show');
  showMatchesBtn.classList.add('active');
});

document.getElementById('browseUsersBtn').addEventListener('click', () => {
  noMatchesBox.classList.remove('show');
  cardsGrid.style.display = 'grid';
  showMatchesBtn.classList.remove('active');
});

// ===== NOTIFICATION BADGE — handled by notif-badge.js =====

// ===== NOTIFICATION DROPDOWN =====
const notifIcon = document.getElementById('notifIcon');
const notifDropdown = document.getElementById('notifDropdown');
const viewAllBtn = document.getElementById('viewAllBtn');

if (notifIcon && notifDropdown) {
  notifIcon.addEventListener('click', () => {
    notifDropdown.classList.toggle('show');
    renderNotifDropdown();
  });

  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      window.location.href = 'notification.html';
    });
  }

  document.addEventListener('click', (e) => {
    if (!notifIcon.contains(e.target) && !notifDropdown.contains(e.target)) {
      notifDropdown.classList.remove('show');
    }
  });
}

function renderNotifDropdown() {
  if (!notifDropdown) return;
  const notifs = JSON.parse(localStorage.getItem('skillswap_notifications') || '[]');

  // Clear existing items except view all btn
  const existing = notifDropdown.querySelectorAll('.dropdown-notif-item');
  existing.forEach(el => el.remove());

  if (notifs.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'dropdown-notif-item';
    empty.textContent = 'No new notifications';
    notifDropdown.insertBefore(empty, viewAllBtn);
  } else {
    // Show latest 3
    const latest = [...notifs].reverse().slice(0, 3);
    latest.forEach(n => {
      const item = document.createElement('div');
      item.className = 'dropdown-notif-item';
      item.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:3px;width:100%">
          <span style="font-weight:600;font-size:13px;color:#e0e6f0">${n.title}</span>
          <span style="font-size:12px;color:#94a3b8">${n.body}</span>
          ${n.meetLink ? `<a href="${n.meetLink}" style="color:#38bdf8;font-size:12px;margin-top:2px;text-decoration:none">🔗 Join Meeting</a>` : ''}
          <span style="font-size:11px;color:#64748b;margin-top:2px">${n.time}</span>
        </div>
      `;
      notifDropdown.insertBefore(item, viewAllBtn);
    });
  }
}

// ===== MODAL =====
const modalBackdrop = document.getElementById('modalBackdrop');
const modalName = document.getElementById('modalName');
const modalRole = document.getElementById('modalRole');
const modalMessage = document.getElementById('modalMessage');

// Card click → open modal
document.querySelectorAll('.user-card').forEach(card => {
  card.addEventListener('click', () => {
    const name = card.getAttribute('data-name');
    const role = card.getAttribute('data-role');
    modalName.textContent = name;
    modalRole.textContent = role || 'Skill Exchange Partner';
    modalMessage.placeholder = `Hi ${name}, I'd like to exchange...`;
    // reset fields
    document.getElementById('modalDate').value = '';
    document.getElementById('modalTime').value = '';
    document.getElementById('modalDuration').selectedIndex = 0;
    modalMessage.value = '';
    // show modal
    modalBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modalBackdrop.classList.remove('show');
  document.body.style.overflow = '';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalCancel').addEventListener('click', closeModal);

modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) closeModal();
});

// ===== SCHEDULE BUTTON =====
document.getElementById('modalSchedule').addEventListener('click', () => {
  const name = modalName.textContent;
  const role = modalRole.textContent;
  const date = document.getElementById('modalDate').value;
  const time = document.getElementById('modalTime').value;
  const duration = document.getElementById('modalDuration').value;
  const message = modalMessage.value;

  if (!date || !time) {
    alert('Please select date and time!');
    return;
  }

  // Generate a fake meet link
  const meetCode = Math.random().toString(36).substring(2, 10);
  const meetLink = `https://meet.skillswap.io/${meetCode}`;

  // Format display time
  const dateObj = new Date(`${date}T${time}`);
  const formatted = dateObj.toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  // Build notification object
  const notification = {
    id: Date.now(),
    title: 'Exchange Request Sent',
    body: `You requested to exchange skills with ${name}`,
    detail: `Scheduled on ${formatted} for ${duration}`,
    meetLink: meetLink,
    time: new Date().toLocaleString('en-US', {
      month: 'numeric', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }),
    name,
    role,
    read: false
  };

  // Save to localStorage
  const existing = JSON.parse(localStorage.getItem('skillswap_notifications') || '[]');
  existing.push(notification);
  localStorage.setItem('skillswap_notifications', JSON.stringify(existing));

  // Update badge
  updateNotifBadge();

  closeModal();

  // Redirect to notification page
  setTimeout(() => {
    window.location.href = 'notification.html';
  }, 300);
});

// Init badge on page load
updateNotifBadge();