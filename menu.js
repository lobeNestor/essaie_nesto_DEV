document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('mobile-open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Ferme le menu quand on clique sur un lien
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('mobile-open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Ferme le menu si on clique en dehors
  document.addEventListener('click', function (e) {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('mobile-open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ─── ENVOI DU FORMULAIRE DE CONTACT (Formspree) ───
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('formSubmitBtn');
  const statusBox = document.getElementById('formStatus');

  if (contactForm && submitBtn && statusBox) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Envoi en cours...';
      statusBox.className = 'form-status';
      statusBox.textContent = '';

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });

        if (response.ok) {
          statusBox.className = 'form-status success';
          statusBox.textContent = '✅ Votre demande a bien été envoyée ! Je vous réponds sous 24-48h.';
          contactForm.reset();
        } else {
          statusBox.className = 'form-status error';
          statusBox.textContent = '❌ Une erreur est survenue. Réessayez ou contactez-moi directement par email/WhatsApp.';
        }
      } catch (error) {
        statusBox.className = 'form-status error';
        statusBox.textContent = '❌ Connexion impossible. Vérifiez votre connexion internet et réessayez.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }
});