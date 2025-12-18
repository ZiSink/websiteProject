document.addEventListener('DOMContentLoaded', function () {

  // Seleciona elementos do popup
  const overlay = document.getElementById('popup-overlay');
  const popup = document.getElementById('popup');
  const popupTitle = document.getElementById('popup-title');
  const popupImage = document.getElementById('popup-image');
  const popupText = document.getElementById('popup-text');
  const closeBtn = popup ? popup.querySelector('.close-popup') : null;

  if (!overlay || !popup || !popupTitle || !popupText) return;

  // Função para abrir popup
  function openPopup(title, image, text) {
    popupTitle.innerText = title || '';

    if (image) {
      popupImage.src = image;
      popupImage.alt = title;
      popupImage.style.display = 'block';
    } else {
      popupImage.style.display = 'none';
    }

    popupText.innerText = text || '';

    overlay.classList.add('show');

    // trava scroll da página
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  // Função para fechar popup
  function closePopup() {
    overlay.classList.remove('show');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // Clique no botão "Ler mais"
  document.body.addEventListener('click', function (e) {
    const btn = e.target.closest('.read-more-link, .read-more-btn');
    if (!btn) return;

    e.preventDefault();

    const article = btn.closest('article');
    if (!article) return;

    // Título: h2 (featured-news) ou h3 (cards)
    const titleNode = article.querySelector('h2, h3');
    const title = titleNode ? titleNode.innerText.trim() : '';

    // Imagem: pega primeira img do artigo
    const imgNode = article.querySelector('img');
    const image = imgNode ? imgNode.src : '';

    // Texto completo
    const fullNode = article.querySelector('.full-text');
    const text = fullNode ? fullNode.innerText.trim() : '';

    openPopup(title, image, text);
  });

  // Fechar popup ao clicar no X
  closeBtn && closeBtn.addEventListener('click', closePopup);

  // Fechar popup ao clicar fora do conteúdo
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closePopup();
  });

  // Fechar popup com tecla Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('show')) closePopup();
  });

});
