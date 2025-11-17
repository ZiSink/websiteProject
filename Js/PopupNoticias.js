// espera o HTML carregar
document.addEventListener('DOMContentLoaded', function () {

  // elementos do popup
  const overlay = document.getElementById('popup-overlay');
  const popup = document.getElementById('popup');
  const popupTitle = document.getElementById('popup-title');
  const popupImage = document.getElementById('popup-image');
  const popupText = document.getElementById('popup-text');
  const closeBtn = document.querySelector('.close-popup');

  // função para abrir popup
  function openPopup({ title='', image='', text='' }) {
    popupTitle.innerText = title; // título da notícia
    popupImage.src = image || 'Images/default.jpg'; // imagem ou default
    popupImage.alt = title;
    popupText.innerText = text || ''; // texto completo
    overlay.classList.add('show'); // mostra o popup
    // trava scroll da página enquanto popup aberto
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  // função para fechar popup
  function closePopup() {
    overlay.classList.remove('show');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // delegação: clicar em "ler mais" abre popup
  document.body.addEventListener('click', function (e) {
    const btn = e.target.closest('.read-more-link, .read-more-btn');
    if (!btn) return;

    e.preventDefault();

    const article = btn.closest('article');
    if (!article) return;

    // título pode ser h2 (featured) ou h3 (cards)
    const titleNode = article.querySelector('h2, h3');
    const title = titleNode ? titleNode.innerText.trim() : '';

    // pega imagem do artigo
    const imgNode = article.querySelector('.news-card-image img, .featured-news-image img, img');
    const image = imgNode ? imgNode.src : '';

    // texto completo: se não houver .full-text usa preview
    const fullNode = article.querySelector('.full-text');
    const previewNode = article.querySelector('.preview-text') || article.querySelector('.featured-news-content p');
    const text = fullNode ? fullNode.innerText.trim() : (previewNode ? previewNode.innerText.trim() : '');

    // abre popup com os dados
    openPopup({ title, image, text });
  });

  // fechar com botão X
  closeBtn && closeBtn.addEventListener('click', closePopup);

  // fechar clicando fora do popup (overlay)
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closePopup();
  });

  // fechar com tecla Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('show')) closePopup();
  });

});
