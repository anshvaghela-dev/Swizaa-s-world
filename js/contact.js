/* ============================================
   contact.js — Contact form logic
   Uses Formspree (free, no backend needed)
   ============================================ */

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        status.textContent = '✦ Message sent. She will read every word.';
        status.style.color = 'var(--accent)';
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      status.textContent = 'Something went wrong. Try emailing directly.';
      status.style.color = '#e05c7a';
    } finally {
      submitBtn.textContent = 'Send Message ✦';
      submitBtn.disabled = false;
    }
  });
}
