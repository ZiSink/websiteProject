// ===============================
// INICIALIZAÇÃO DO MAPA
// ===============================
const map = L.map('map').setView([38.7169, -9.1399], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// ===============================
// DADOS DOS PONTOS
// ===============================
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

const infoPanel = document.getElementById("info-panel");
const mapMessage = document.getElementById("mapMessage");
const resultList = document.getElementById("resultList");
const searchInput = document.getElementById("mapSearch");

let markers = [];
let circleProximidade = null;

// ===============================
// CRIA OS MARCADORES INICIAIS
// ===============================
function criarMarcadores() {
    markers = [];
    pontos.forEach(p => {
        const marker = L.marker([p.lat, p.lng]).addTo(map);
        marker.on("click", () => {
            atualizarPainel(p);
            mapMessage.style.display = "none";
        });
        markers.push(marker);
    });
}
criarMarcadores();

// ===============================
// ATUALIZAR PAINEL
// ===============================
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
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = searchInput.value.trim();

        // ✅ Se input estiver vazio → cancelar pesquisa e mostrar todos os pontos
        if (query.length === 0) {
            // Remove círculo de proximidade se existir
            if (circleProximidade) {
                circleProximidade.remove();
                circleProximidade = null;
            }

            // Recria todos os marcadores
            criarMarcadores();

            // Limpa lista de resultados
            resultList.innerHTML = "";

            // Mostra a mensagem inicial
            mapMessage.style.display = "block";

            // Sai da função para não chamar pesquisarLocal()
            return;
        }

        // Se o input tiver menos de 2 caracteres, não faz nada
        if (query.length < 2) return;

        // Pesquisa normal
        pesquisarLocal(query);
    }
});


async function pesquisarLocal(texto) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(texto)}&limit=1`;
    const res = await fetch(url, { headers: { "User-Agent": "AlimentarComCoracao" } });
    const data = await res.json();

    if (!data || data.length === 0) {
        alert("⚠️ Nenhum local encontrado.");
        return;
    }

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);

    map.setView([lat, lon], 13);

    // círculo grande de proximidade (15 km)
    if (circleProximidade) circleProximidade.remove();
    circleProximidade = L.circle([lat, lon], {
        radius: 15000,
        color: "#2E7D32",
        fillColor: "#2E7D32",
        fillOpacity: 0.15
    }).addTo(map);

    filtrarMarcadores([lat, lon], 15000);
}

// ===============================
// FILTRAR MARCADORES
// ===============================
function filtrarMarcadores([lat, lon], distMax) {
    resultList.innerHTML = "";
    let encontrou = false;

    // remover todos
    markers.forEach(m => map.removeLayer(m));

    // recriar marcadores e filtrar
    markers = [];

    pontos.forEach((p, i) => {
        const marker = L.marker([p.lat, p.lng]);
        markers.push(marker);

        const distance = map.distance([lat, lon], marker.getLatLng());

        if (distance <= distMax) {
            marker.addTo(map);
            encontrou = true;

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

        marker.on("click", () => {
            atualizarPainel(p);
            mapMessage.style.display = "none";
        });
    });

    if (!encontrou) {
        alert("⚠️ Não existem pontos de recolha próximos dessa zona.");
    }
}
