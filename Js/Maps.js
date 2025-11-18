// inicializa o mapa centrado em Lisboa
const map = L.map('map').setView([38.7169, -9.1399], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

// armazenar marcadores para filtrar
let markers = [];

// cria os marcadores
pontos.forEach(p => {
  const marker = L.marker([p.lat, p.lng]).addTo(map);

  // guarda referência ao ponto e ao marcador
  marker.pointData = p;
  markers.push(marker);

  // evento de clique no marcador
  marker.on('click', () => {
    infoPanel.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}">
      <div id="info-content">
        <h2>${p.nome}</h2>
        <p><span class="info-icon">📍</span> ${p.morada}</p>
        <p><span class="info-icon">⏰</span> <span class="info-highlight">${p.horario}</span></p>
        <p><span class="info-icon">📞</span> ${p.telefone}</p>
        <p><span class="info-icon">🍎</span> ${p.alimentos}</p>
        <p><span class="info-icon">🌐</span> <a href="${p.site}" target="_blank">${p.site}</a></p>
      </div>
    `;
  });
});


// ==============================
// PESQUISA 
// ==============================