document.addEventListener('DOMContentLoaded', function () {

  const overlay = document.getElementById('popup-overlay');
  const popup = document.getElementById('popup');
  const popupTitle = document.getElementById('popup-title');
  const popupImage = document.getElementById('popup-image');
  const popupText = document.getElementById('popup-text');
  const closeBtn = document.querySelector('.close-popup');

  function openPopup({ title='', image='', text='' }) {
    popupTitle.innerText = title;
    popupImage.src = image || 'Images/default.jpg';
    popupImage.alt = title;
    popupText.innerText = text || '';
    overlay.classList.add('show');
    // lock scroll on body
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.classList.remove('show');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // delegação: captura clicks em links "ler mais" (tanto .read-more-link como .read-more-btn)
  document.body.addEventListener('click', function (e) {
    const btn = e.target.closest('.read-more-link, .read-more-btn');
    if (!btn) return;

    e.preventDefault();

    const article = btn.closest('article');
    if (!article) return;

    // Título pode estar em h2 (featured) ou h3 (cards)
    const titleNode = article.querySelector('h2, h3');
    const title = titleNode ? titleNode.innerText.trim() : '';

    // imagem: procura imagem dentro de .news-card-image ou featured-image
    const imgNode = article.querySelector('.news-card-image img, .featured-news-image img, img');
    const image = imgNode ? imgNode.src : '';

    // texto completo: .full-text (escondido), caso não exista usar preview-text
    const fullNode = article.querySelector('.full-text');
    const previewNode = article.querySelector('.preview-text') || article.querySelector('.featured-news-content p');

    const text = fullNode ? fullNode.innerText.trim() : (previewNode ? previewNode.innerText.trim() : '');

    openPopup({ title, image, text });
  });

  // fechar com botão X
  closeBtn && closeBtn.addEventListener('click', closePopup);

  // fechar clicando fora do popup (no overlay)
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closePopup();
  });

  // fechar com Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('show')) closePopup();
  });

});
