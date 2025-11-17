// inicializa o mapa centrado em Lisboa
const map = L.map('map').setView([38.7169, -9.1399], 12);

// adiciona o mapa base do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
}).addTo(map);

// lista dos pontos que queremos mostrar no mapa
const pontos = [
  {
    nome: "Instituto Politécnico de Setúbal",
    lat: 38.52214915116685,
    lng: -8.838829538396435,
    morada: "Rua da Esperança 12, 1200-345 Lisboa",
    horario: "Seg–Sáb: 9h–18h",
    telefone: "212 345 678",
    alimentos: "Frutas, Massas",
    site: "https://www.bancoalimentar.pt",
    imagem: "images/EST.jpg"
  },
  {
    nome: "Igreja Santo António",
    lat: 38.713,
    lng: -9.135,
    morada: "Largo de Santo António 5, 1100-395 Lisboa",
    horario: "Todos os dias: 10h–17h",
    telefone: "213 456 789",
    alimentos: "Frutas, Massas",
    site: "https://www.paroquiasantoantonio.pt",
    imagem: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"
  },
  {
    nome: "Centro Comunitário da Ajuda",
    lat: 38.703,
    lng: -9.17,
    morada: "Av. da Boa Vontade 25, 1300-110 Lisboa",
    horario: "Seg–Sex: 10h–17h",
    telefone: "217 123 456",
    alimentos: "Frutas, Massas",
    site: "https://www.centrosolidario.pt",
    imagem: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  }
];

// painel onde vamos mostrar info quando clicamos num ponto
const infoPanel = document.getElementById("info-panel");

// percorre todos os pontos e cria um marcador para cada
pontos.forEach(p => {

  const marker = L.marker([p.lat, p.lng]).addTo(map);

  // quando clicamos no marcador, atualiza o painel
  marker.on('click', () => {
    infoPanel.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}" alt="${p.alimentos}">
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
