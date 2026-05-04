/* ============================================
   about.js — About page logic
   ============================================ */

// Count poems and animate the number
async function initAboutPage() {
  const poems = await loadPoems();
  const countEl = document.getElementById('poemCount');
  if (!countEl) return;

  // Animate count up
  let current = 0;
  const target = poems.length;
  const duration = 1200;
  const step = Math.ceil(duration / target);

  const timer = setInterval(() => {
    current++;
    countEl.textContent = current;
    if (current >= target) clearInterval(timer);
  }, step);
}

document.addEventListener('DOMContentLoaded', initAboutPage);
