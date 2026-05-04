/* ============================================
   poems.js — Poems page logic
   ============================================ */

let allPoems = [];
let activeFilter = 'all';

async function initPoemsPage() {
  allPoems = await loadPoems();
  renderPoems(allPoems);
  setupFilters();
}

function renderPoems(poems) {
  const container = document.getElementById('allPoems');
  if (!container) return;

  container.innerHTML = '';

  if (poems.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-muted);">
        <p style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 0.5rem;">No poems found</p>
        <p>Try a different filter</p>
      </div>
    `;
    return;
  }

  poems.forEach((poem, i) => {
    const card = createPoemCard(poem);
    card.classList.add('fade-in');
    card.style.transitionDelay = `${(i % 6) * 0.07}s`;
    container.appendChild(card);
  });

  // Re-observe new elements
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    obs.observe(el);
  });
}

function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;

      const filtered = activeFilter === 'all'
        ? allPoems
        : allPoems.filter(p => p.tag === activeFilter);

      renderPoems(filtered);
    });
  });
}

// Init on page load
document.addEventListener('DOMContentLoaded', initPoemsPage);
