document.addEventListener('DOMContentLoaded', function () {

  const overlay = document.getElementById('termos-overlay');
  const popup = document.getElementById('termos-popup');
  const openLinks = document.querySelectorAll('.open-termos');
  const closeBtn = popup ? popup.querySelector('.close-termos') : null;

  if (!overlay || !popup) return;

  function openTermos() {
    overlay.classList.add('show');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closeTermos() {
    overlay.classList.remove('show');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // Abrir termos
  openLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      openTermos();
    });
  });

  // Fechar no X
  closeBtn && closeBtn.addEventListener('click', closeTermos);

  // Fechar clicando fora
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeTermos();
  });

  // Fechar com ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('show')) {
      closeTermos();
    }
  });

});
