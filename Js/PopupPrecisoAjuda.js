// ===============================
// POPUP DE TERMOS E CONDIÇÕES
// ===============================
document.addEventListener('DOMContentLoaded', () => {

  // Elementos principais do popup
  const overlay = document.getElementById('popup-overlay');
  const popupTitle = document.getElementById('popup-title');
  const popupImage = document.getElementById('popup-image');
  const popupText = document.getElementById('popup-text');
  const closeBtn = document.querySelector('.close-popup');
  const termsContent = document.getElementById('terms-content');
  const triggers = document.querySelectorAll('.terms-trigger');

  // Se os elementos principais não existirem, o código não continua
  if (!overlay || !termsContent) return;

  // ===============================
  // ABRIR POPUP
  // ===============================
  // Mostra o popup com o conteúdo dos termos e condições
  const openPopup = () => {
    popupTitle.textContent = 'Termos & Condições';
    popupImage.src = 'Images/minilogo.png';
    popupImage.alt = 'Termos e Condições';

    // Copia o conteúdo dos termos para dentro do popup
    popupText.innerHTML = termsContent.innerHTML;

    // Mostra o popup
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');

    // Bloqueia o scroll da página
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };

  // ===============================
  // FECHAR POPUP
  // ===============================
  // Esconde o popup e volta a permitir scroll
  const closePopup = () => {
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };

  // ===============================
  // EVENTOS
  // ===============================
  // Abre o popup ao clicar nos botões dos termos
  triggers.forEach(btn => btn.addEventListener('click', openPopup));

  // Fecha o popup ao clicar no botão de fechar
  closeBtn && closeBtn.addEventListener('click', closePopup);

  // Fecha o popup ao clicar fora da área do conteúdo
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closePopup();
  });

  // Fecha o popup ao pressionar a tecla ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('show')) {
      closePopup();
    }
  });
});
