document.addEventListener('DOMContentLoaded', () => {

  // ===== PROFILE DROPDOWN =====
const profileIcon = document.getElementById('profileIcon');
const dropdown    = document.getElementById('dropdownMenu');

if (profileIcon && dropdown) {
  profileIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!profileIcon.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });

  document.getElementById('profileBtn').onclick = () => {
    window.location.href = 'profile.html';
  };

  document.getElementById('signOutBtn').onclick = () => {
    localStorage.clear();
    window.location.href = 'index.html';
  };
}

  // ===== SET USER INITIAL =====
  const userName = localStorage.getItem('user_name');
  if (userName) {
    const icon = document.getElementById('profileIcon');
    if (icon) icon.textContent = userName.charAt(0).toUpperCase();
  }

  // ===== HAMBURGER =====
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sidebar      = document.getElementById('sidebar');
  const overlay      = document.getElementById('overlay');

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  // ===== SHOW/HIDE FILTERS =====
  const toggleFilter = document.getElementById('toggleFilter');
  const filterBox    = document.getElementById('filterBox');
  const closeFilter  = document.getElementById('closeFilter');

  if (toggleFilter && filterBox) {
    // Hide filter box by default
    filterBox.style.display = 'none';

    toggleFilter.addEventListener('click', () => {
      const isHidden = filterBox.style.display === 'none';
      filterBox.style.display = isHidden ? 'block' : 'none';
      toggleFilter.innerHTML = isHidden
        ? '<span class="material-icons">filter_alt</span> Hide Filters'
        : '<span class="material-icons">filter_alt</span> Show Filters';
    });
  }

  if (closeFilter && filterBox) {
    closeFilter.addEventListener('click', () => {
      filterBox.style.display = 'none';
      if (toggleFilter) {
        toggleFilter.innerHTML = '<span class="material-icons">filter_alt</span> Show Filters';
      }
    });
  }

  // ===== SHOW MATCHES =====
  const showMatchesBtn = document.getElementById('showMatchesBtn');
  if (showMatchesBtn) {
    showMatchesBtn.addEventListener('click', () => {
      const teach = document.getElementById('teachFilter')?.value.toLowerCase() || '';
      const learn = document.getElementById('learnFilter')?.value.toLowerCase() || '';
      const cards = document.querySelectorAll('.user-card');

      let matchCount = 0;
      cards.forEach(card => {
        const teachTags = [...card.querySelectorAll('.skill-tag.teach')].map(t => t.textContent.toLowerCase());
        const learnTags = [...card.querySelectorAll('.skill-tag.learn')].map(t => t.textContent.toLowerCase());
        const teachMatch = teach === '' || teachTags.some(t => t.includes(teach));
        const learnMatch = learn === '' || learnTags.some(t => t.includes(learn));
        if (teachMatch && learnMatch) {
          card.style.display = 'block';
          matchCount++;
        } else {
          card.style.display = 'none';
        }
      });
      alert(`Found ${matchCount} matches!`);
    });
  }

  // ===== APPLY FILTERS =====
  const applyFilter = document.getElementById('applyFilter');
  if (applyFilter) {
    applyFilter.addEventListener('click', () => {
      const teach = document.getElementById('teachFilter')?.value.toLowerCase() || '';
      const learn = document.getElementById('learnFilter')?.value.toLowerCase() || '';
      document.querySelectorAll('.user-card').forEach(card => {
        const teachTags = [...card.querySelectorAll('.skill-tag.teach')].map(t => t.textContent.toLowerCase());
        const learnTags = [...card.querySelectorAll('.skill-tag.learn')].map(t => t.textContent.toLowerCase());
        const teachMatch = teach === '' || teachTags.some(t => t.includes(teach));
        const learnMatch = learn === '' || learnTags.some(t => t.includes(learn));
        card.style.display = teachMatch && learnMatch ? 'block' : 'none';
      });
    });
  }

  // ===== RESET FILTERS =====
  const resetFilter = document.getElementById('resetFilter');
  if (resetFilter) {
    resetFilter.addEventListener('click', () => {
      const teachFilter = document.getElementById('teachFilter');
      const learnFilter = document.getElementById('learnFilter');
      const locationFilter = document.getElementById('locationFilter');
      if (teachFilter) teachFilter.value = '';
      if (learnFilter) learnFilter.value = '';
      if (locationFilter) locationFilter.value = '';
      document.querySelectorAll('.user-card').forEach(card => {
        card.style.display = 'block';
      });
    });
  }

});
