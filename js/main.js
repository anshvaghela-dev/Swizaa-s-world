/* ============================================
   main.js — Shared across all pages
   ============================================ */

// ---- Scroll Fade-In Animation ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ---- Navbar scroll shadow ----
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) {
    nav.style.boxShadow = window.scrollY > 20
      ? '0 4px 30px rgba(0,0,0,0.5)'
      : 'none';
  }
});

// ---- Load featured poems on homepage ----
const featuredContainer = document.getElementById('featuredPoems');
if (featuredContainer) {
  loadPoems().then(poems => {
    const featured = poems.slice(0, 3);
    featured.forEach((poem, i) => {
      const card = createPoemCard(poem);
      card.classList.add('fade-in');
      card.style.transitionDelay = `${i * 0.1}s`;
      featuredContainer.appendChild(card);
    });
    // Trigger observer for newly added elements
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  });
}

// ---- Poem Data (JSON-based, easy to extend) ----
async function loadPoems() {
  try {
    const res = await fetch('data/poems.json');
    return await res.json();
  } catch {
    // Fallback sample data if JSON not found
    return getSamplePoems();
  }
}

function getSamplePoems() {
  return [
    {
      id: 1,
      title: "Midnight Rain",
      tag: "nature",
      date: "April 2025",
      excerpt: "The rain speaks in a language\nonly the lonely understand,\neach drop a word unsaid,\neach puddle a memory pooled.",
      body: "The rain speaks in a language\nonly the lonely understand,\neach drop a word unsaid,\neach puddle a memory pooled.\n\nI stood at the window\nwatching the world dissolve,\nwondering if the sky too\nhad someone it couldn't forget.\n\nMidnight rain — you are\nthe only honest thing\nin a world that learned\nto smile through its storms.",
      featured: true
    },
    {
      id: 2,
      title: "Letters Never Sent",
      tag: "love",
      date: "March 2025",
      excerpt: "I wrote you a hundred letters\nin the margins of my sleep,\nwords that tasted like goodbye\nbut felt like please stay.",
      body: "I wrote you a hundred letters\nin the margins of my sleep,\nwords that tasted like goodbye\nbut felt like please stay.\n\nEach one folded into silence,\ntucked beneath the weight\nof everything I almost said\nwhen you were still within reach.\n\nMaybe one day the wind\nwill carry them to you —\nand you'll know, without opening them,\nthat they were always yours.",
      featured: true
    },
    {
      id: 3,
      title: "The Space Between Stars",
      tag: "hope",
      date: "February 2025",
      excerpt: "We are not the stars, my love,\nwe are the space between them —\nthe dark that makes the light\nworth looking for.",
      body: "We are not the stars, my love,\nwe are the space between them —\nthe dark that makes the light\nworth looking for.\n\nIn the vast quiet of the universe\nI found you, not shining,\nbut present — the way silence\nis present after a song ends.\n\nAnd I thought: this is enough.\nThis is more than enough.\nTo be the space where someone\nchooses to rest their eyes.",
      featured: true
    },
    {
      id: 4,
      title: "Autumn Knows",
      tag: "nature",
      date: "January 2025",
      excerpt: "Autumn knows how to let go\nwithout making it look like loss —\nit turns everything golden first,\nthen releases.",
      body: "Autumn knows how to let go\nwithout making it look like loss —\nit turns everything golden first,\nthen releases.\n\nI am learning from the trees.\nHow to shed what no longer serves,\nhow to stand bare and unashamed\nand trust that spring remembers.\n\nEvery leaf that falls\nis a lesson in surrender —\nnot defeat, but grace.\nNot ending, but becoming.",
      featured: false
    },
    {
      id: 5,
      title: "Soft Grief",
      tag: "pain",
      date: "December 2024",
      excerpt: "There is a grief that doesn't scream.\nIt sits with you at breakfast,\nstirs your coffee slowly,\nand says nothing.",
      body: "There is a grief that doesn't scream.\nIt sits with you at breakfast,\nstirs your coffee slowly,\nand says nothing.\n\nIt follows you to work,\nwaits outside the meeting room,\nwalks home beside you\nwhen the streetlights come on.\n\nSoft grief is the hardest kind —\nbecause no one sees it,\nand you learn to carry it\nlike a second heartbeat.",
      featured: false
    },
    {
      id: 6,
      title: "Still Here",
      tag: "life",
      date: "November 2024",
      excerpt: "After everything —\nthe storms, the silences,\nthe nights that had no morning —\nI am still here.",
      body: "After everything —\nthe storms, the silences,\nthe nights that had no morning —\nI am still here.\n\nNot unbroken. Not the same.\nBut here, with coffee in my hands\nand sunlight on the floor\nand something that feels like hope.\n\nStill here is enough.\nStill here is everything.\nStill here is the bravest thing\nI have ever done.",
      featured: false
    }
  ];
}

// ---- Create Poem Card Element ----
function createPoemCard(poem) {
  const likes = getLikes(poem.id);
  const isLiked = getIsLiked(poem.id);

  const card = document.createElement('div');
  card.className = 'poem-card';
  card.setAttribute('role', 'article');
  card.setAttribute('aria-label', poem.title);
  card.innerHTML = `
    <div class="poem-tag">${poem.tag}</div>
    <h3>${poem.title}</h3>
    <p class="poem-excerpt">${poem.excerpt}</p>
    <div class="poem-meta">
      <span>${poem.date}</span>
      <div class="poem-actions">
        <button class="like-btn ${isLiked ? 'liked' : ''}" data-id="${poem.id}" aria-label="Like poem">
          ${isLiked ? '♥' : '♡'} <span class="like-count">${likes}</span>
        </button>
        <button class="share-btn" data-title="${poem.title}" aria-label="Share poem">↗</button>
      </div>
    </div>
  `;

  // Open modal on card click (not on buttons)
  card.addEventListener('click', (e) => {
    if (!e.target.closest('.like-btn') && !e.target.closest('.share-btn')) {
      openPoemModal(poem);
    }
  });

  // Like button
  card.querySelector('.like-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleLike(poem.id, card.querySelector('.like-btn'));
  });

  // Share button
  card.querySelector('.share-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    sharePoem(poem);
  });

  return card;
}

// ---- Like System (localStorage) ----
function getLikes(id) {
  const likes = JSON.parse(localStorage.getItem('poem_likes') || '{}');
  return likes[id] || 0;
}
function getIsLiked(id) {
  const liked = JSON.parse(localStorage.getItem('poem_liked_by_user') || '{}');
  return !!liked[id];
}
function toggleLike(id, btn) {
  const likes = JSON.parse(localStorage.getItem('poem_likes') || '{}');
  const liked = JSON.parse(localStorage.getItem('poem_liked_by_user') || '{}');

  if (liked[id]) {
    likes[id] = Math.max(0, (likes[id] || 1) - 1);
    delete liked[id];
    btn.classList.remove('liked');
    btn.innerHTML = `♡ <span class="like-count">${likes[id]}</span>`;
  } else {
    likes[id] = (likes[id] || 0) + 1;
    liked[id] = true;
    btn.classList.add('liked');
    btn.innerHTML = `♥ <span class="like-count">${likes[id]}</span>`;
  }

  localStorage.setItem('poem_likes', JSON.stringify(likes));
  localStorage.setItem('poem_liked_by_user', JSON.stringify(liked));
}

// ---- Share Poem ----
function sharePoem(poem) {
  const text = `"${poem.excerpt.split('\n')[0]}"\n— ${poem.title}\n\nRead more at: ${window.location.origin}`;
  if (navigator.share) {
    navigator.share({ title: poem.title, text });
  } else {
    navigator.clipboard.writeText(text).then(() => {
      alert('Poem copied to clipboard! Share it anywhere ✦');
    });
  }
}

// ---- Poem Modal ----
let modalOverlay = null;

function openPoemModal(poem) {
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.className = 'poem-modal-overlay';
    modalOverlay.innerHTML = `
      <div class="poem-modal" role="dialog" aria-modal="true">
        <button class="modal-close" aria-label="Close">✕</button>
        <div class="modal-tag" id="modalTag"></div>
        <h2 class="modal-title" id="modalTitle"></h2>
        <p class="modal-date" id="modalDate"></p>
        <div class="modal-body" id="modalBody"></div>
        <div class="modal-actions">
          <button class="like-btn" id="modalLike" aria-label="Like poem"></button>
          <button class="btn-outline" id="modalShare">Share ↗</button>
        </div>
      </div>
    `;
    document.body.appendChild(modalOverlay);

    modalOverlay.querySelector('.modal-close').addEventListener('click', closePoemModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closePoemModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePoemModal();
    });
  }

  const likes = getLikes(poem.id);
  const isLiked = getIsLiked(poem.id);

  modalOverlay.querySelector('#modalTag').textContent = poem.tag;
  modalOverlay.querySelector('#modalTitle').textContent = poem.title;
  modalOverlay.querySelector('#modalDate').textContent = poem.date;
  modalOverlay.querySelector('#modalBody').textContent = poem.body;

  const likeBtn = modalOverlay.querySelector('#modalLike');
  likeBtn.className = `like-btn ${isLiked ? 'liked' : ''}`;
  likeBtn.innerHTML = `${isLiked ? '♥' : '♡'} <span class="like-count">${likes}</span>`;
  likeBtn.onclick = () => toggleLike(poem.id, likeBtn);

  modalOverlay.querySelector('#modalShare').onclick = () => sharePoem(poem);

  requestAnimationFrame(() => modalOverlay.classList.add('open'));
  document.body.style.overflow = 'hidden';
}

function closePoemModal() {
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}
