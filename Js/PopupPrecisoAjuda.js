document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('popup-overlay');
  const popupTitle = document.getElementById('popup-title');
  const popupImage = document.getElementById('popup-image');
  const popupText = document.getElementById('popup-text');
  const closeBtn = document.querySelector('.close-popup');
  const termsContent = document.getElementById('terms-content');
  const triggers = document.querySelectorAll('.terms-trigger');

  if (!overlay || !termsContent) return;

  const openPopup = () => {
    popupTitle.textContent = 'Termos & Condições';
    popupImage.src = 'Images/minilogo.png';
    popupImage.alt = 'Termos e Condições';
    popupText.innerHTML = termsContent.innerHTML;
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };

  triggers.forEach(btn => btn.addEventListener('click', openPopup));
  closeBtn && closeBtn.addEventListener('click', closePopup);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closePopup();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('show')) {
      closePopup();
    }
  });
});
