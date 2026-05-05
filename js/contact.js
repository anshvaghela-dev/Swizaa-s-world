/* ============================================
   contact.js — Contact form
   Messages go to Swizasworls@gmail.com
   via Formspree (free, no backend needed)
   ============================================ */

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    status.textContent = '';

    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        // Success
        status.textContent = '✦ Message sent. Swizza will read every word.';
        status.style.color = 'var(--accent)';
        form.reset();
      } else {
        const json = await res.json();
        // Formspree returns errors array
        if (json.errors) {
          throw new Error(json.errors.map(e => e.message).join(', '));
        }
        throw new Error('Submission failed');
      }
    } catch (err) {
      status.textContent = '✦ Something went wrong. Email her directly at Swizasworls@gmail.com';
      status.style.color = '#e05c7a';
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
