// ===============================
// MAPA
// ===============================
// Criação do mapa com Leaflet e definição da vista inicial (Lisboa)
// O id "map" tem de existir no HTML para o mapa ser renderizado
const map = L.map('map').setView([38.7169, -9.1399], 12);

// Camada base do mapa usando OpenStreetMap
// maxZoom define o nível máximo de zoom permitido
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// ===============================
// DADOS DOS PONTOS
// ===============================
// Lista com todos os pontos de recolha e respetivas informações
// Cada objeto é usado para criar marcador e para preencher o painel lateral
const pontos = [
    {
        nome: "Escola Superior de Tecnologia de Setúbal (IPS)",
        lat: 38.524065,
        lng: -8.842806,
        morada: "Campus do IPS, Estefanilha, 2914-508 Setúbal, Portugal",
        horario: "2ª-6ª: 09h00–17h00",
        telefone: "+351 265 790 000",
        alimentos: "Universidade com atividades académicas e comunitárias",
        site: "https://estsetubal.ips.pt",
        imagem: "images/EST.jpg"
    },
    {
        nome: "Câmara Municipal de Coimbra",
        lat: 40.2056,
        lng: -8.4195,
        morada: "Praça 8 de Maio, 3000-300 Coimbra, Portugal",
        horario: "2ª-6ª: 09h00–17h00",
        telefone: "+351 239 857 500",
        alimentos: "Instituição pública municipal para serviços à comunidade",
        site: "https://www.cm-coimbra.pt",
        imagem: "images/cm_coimbra.jpg"
    },
    {
        nome: "Centro Comunitário de Telheiras",
        lat: 38.7635,
        lng: -9.1603,
        morada: "Rua Prof. Mário Chicó, 1600-644 Lisboa, Portugal",
        horario: "Ver contactos / serviços comunitários",
        telefone: "+351 217 572 736",
        alimentos: "Espaço comunitário de apoio social e atividades locais",
        site: "https://www.rotanacional.pt/anuncio/6939-centro-comunitario-de-telheiras",
        imagem: "images/centro_telheiras.jpg"
    }
];

// Elementos do HTML usados no mapa e nos resultados
// São guardados em variáveis para evitar múltiplas queries ao DOM
const infoPanel = document.getElementById("info-panel");
const mapMessage = document.getElementById("mapMessage");
const resultList = document.getElementById("resultList");
const searchInput = document.getElementById("mapSearch");

// Lista de marcadores e círculo de proximidade
// markers guarda os marcadores ativos no mapa para limpeza/atualização
let markers = [];
let circleProximidade = null;

// ===============================
// MINI POPUP
// ===============================
// Mostra uma pequena mensagem no ecrã durante alguns segundos
// Usado para avisos rápidos sem interromper a navegação
function showMiniPopup(message, duration = 3000) {
    let popup = document.getElementById("miniPopup");

    // Se o popup ainda não existir, é criado
    // Assim evitamos colocar markup fixo no HTML
    if (!popup) {
        popup = document.createElement("div");
        popup.id = "miniPopup";
        popup.className = "mini-popup";
        document.body.appendChild(popup);
    }

    popup.textContent = message;
    popup.classList.add("show");

    // Remove o popup após o tempo definido
    setTimeout(() => popup.classList.remove("show"), duration);
}

// ===============================
// MARCADORES
// ===============================
// Cria os marcadores no mapa a partir dos pontos definidos
// Sempre que se recriam marcadores, a lista anterior é substituída
function criarMarcadores() {
    markers = [];

    pontos.forEach(p => {
        const marker = L.marker([p.lat, p.lng]).addTo(map);

        // Clique no marcador atualiza o painel de informações
        // Também esconde a mensagem inicial do mapa
        marker.on("click", () => {
            atualizarPainel(p);
            mapMessage.style.display = "none";
        });

        markers.push(marker);
    });
}

// Criação inicial dos marcadores
criarMarcadores();

// ===============================
// ATUALIZAR PAINEL
// ===============================
// Atualiza o painel lateral com as informações do ponto selecionado
// Usa template literal para inserir dados do ponto de forma simples
function atualizarPainel(ponto) {
    infoPanel.innerHTML = `
        <img src="${ponto.imagem}" alt="${ponto.nome}">
        <div id="info-content">
            <h2>${ponto.nome}</h2>
            <p><span class="info-icon">📍</span> ${ponto.morada}</p>
            <p><span class="info-icon">⏰</span> <span class="info-highlight">${ponto.horario}</span></p>
            <p><span class="info-icon">📞</span> ${ponto.telefone}</p>
            <p><span class="info-icon">🍎</span> ${ponto.alimentos}</p>
            <p><span class="info-icon">🌐</span> <a href="${ponto.site}" target="_blank">${ponto.site}</a></p>
        </div>
    `;
}

// ===============================
// PESQUISA
// ===============================
// Deteta quando a tecla Enter é pressionada no campo de pesquisa
// Não faz pesquisa automática a cada tecla para evitar chamadas à API
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = searchInput.value.trim();

        // Se o campo estiver vazio, mostra novamente todos os pontos
        // Também remove o circulo de proximidade anterior
        if (query.length === 0) {
            if (circleProximidade) {
                circleProximidade.remove();
                circleProximidade = null;
            }
            criarMarcadores();
            resultList.innerHTML = "";
            mapMessage.style.display = "block";
            return;
        }

        // Ignora pesquisas muito curtas
        // Ajuda a reduzir chamadas desnecessárias à API
        if (query.length < 2) return;

        pesquisarLocal(query);
    }
});

// ===============================
// PESQUISAR LOCAL
// ===============================
// Pesquisa o local usando a API do OpenStreetMap (Nominatim)
// Devolve a primeira correspondência (limit=1)
async function pesquisarLocal(texto) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(texto)}&limit=1`;
    const res = await fetch(url, { headers: { "User-Agent": "AlimentarComCoracao" } });
    const data = await res.json();

    // Caso não encontre nenhum local
    if (!data || data.length === 0) {
        showMiniPopup("⚠️ Nenhum local encontrado.");
        return;
    }

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);

    // Centraliza o mapa no local pesquisado
    // Zoom 13 dá um enquadramento equilibrado
    map.setView([lat, lon], 13);

    // Remove o círculo anterior, se existir
    if (circleProximidade) circleProximidade.remove();

    // Cria um círculo de proximidade
    // Este raio e cor são apenas para referência visual
    circleProximidade = L.circle([lat, lon], {
        radius: 15000,
        color: "#2E7D32",
        fillColor: "#2E7D32",
        fillOpacity: 0.15
    }).addTo(map);

    // Filtra e mostra apenas os pontos dentro do raio
    filtrarMarcadores([lat, lon], 15000);
}

// ===============================
// FILTRAR MARCADORES
// ===============================
// Mostra apenas os pontos dentro da distância definida
// Recria marcadores e lista de resultados com base no raio
function filtrarMarcadores([lat, lon], distMax) {
    resultList.innerHTML = "";
    let encontrou = false;

    // Remove todos os marcadores atuais
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    pontos.forEach((p) => {
        const marker = L.marker([p.lat, p.lng]);
        markers.push(marker);

        // Calcula a distancia em metros entre o ponto pesquisado e o marcador
        const distance = map.distance([lat, lon], marker.getLatLng());

        // Verifica se o ponto está dentro do raio
        if (distance <= distMax) {
            marker.addTo(map);
            encontrou = true;

            // Cria item na lista de resultados
            // Permite escolher o ponto sem precisar clicar no mapa
            const item = document.createElement("div");
            item.className = "result-item";
            item.textContent = p.nome;

            item.addEventListener("click", () => {
                atualizarPainel(p);
                map.setView([p.lat, p.lng], 15);
                mapMessage.style.display = "none";
            });

            resultList.appendChild(item);
        }

        // Clique no marcador atualiza o painel
        marker.on("click", () => {
            atualizarPainel(p);
            mapMessage.style.display = "none";
        });
    });

    // Caso não existam pontos próximos
    if (!encontrou) {
        showMiniPopup("⚠️ Não existem pontos de recolha próximos dessa zona.");
    }
}
