// ======================= HEADER =======================
// Guarda o HTML do header numa variável para ser reutilizado em várias páginas
// Nota: usa template literal para manter o HTML legível e sem concatenações
var headerPage = `
<header class="site-header">
        <div class="header-content">

            <!-- Logotipo com link para a página inicial -->
            <a href="index.html">
                <img src="Images/Logo.png" alt="Logotipo do 'Alimentar com coração'" class="logotipo">
            </a>

            <!-- Botão do menu para versão mobile -->
            <button class="nav-toggle" aria-expanded="false" aria-label="Abrir menu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <!-- Menu de navegação -->
            <nav>
                <ul class="menu">

                    <!-- Dropdown Sobre Nós -->
                    <li class="dropdown">
                        <button class="dropdown-toggle" aria-expanded="false">Sobre Nós</button>
                        <ul class="submenu" aria-label="Sobre Nós submenu">
                            <li><a href="NossaMissao.html">A Nossa Missão</a></li>
                            <li><a href="Contactos.html">Contactos</a></li>
                            <li><a href="FAQ.html">FAQs</a></li>
                        </ul>
                    </li>

                    <!-- Dropdown Como Ajudar -->
                    <li class="dropdown">
                        <button class="dropdown-toggle" aria-expanded="false">Como Ajudar</button>
                        <ul class="submenu" aria-label="Como Ajudar submenu">
                            <li><a href="Doacoes.html">Donativos e Doações</a></li>
                            <li><a href="Voluntariado.html">Torne-se Voluntário</a></li>
                            <li><a href="Campanhas.html">Campanhas Ativas</a></li>
                        </ul>
                    </li>

                    <!-- Links diretos -->
                    <a href="PrecisoAjuda.html">Preciso de Ajuda</a>
                    <a href="PontosdeRecolha.html">Pontos de Recolha</a>
                    <a href="Noticias.html">Notícias</a>
                </ul>
            </nav>
        </div>
    </header>`;

// ======================= FOOTER =======================
// Guarda o HTML do footer para manter o mesmo rodapé em todas as páginas
// Desta forma garante-se consistência visual e facilita futuras alterações
var footerPage = `
<footer class="site-footer">
    <div class="footer-container">

        <!-- Área do logotipo e descrição -->
        <div class="footer-branding">
            <img src="Images/Logo.png" alt="Logotipo Alimentar com Coração" class="footer-logo">
            <p>
                Unimos corações para combater a fome através de recolhas solidárias,
                apoio alimentar e iniciativas comunitárias.
            </p>
        </div>

        <!-- Área de contactos -->
        <div class="footer-contact">
            <h3>Contactos</h3>
            <div class="footer-social-bar"></div>
            <ul>
                <li><a href="mailto:alimentarccoracao@sapo.pt">alimentarccoracao@sapo.pt</a></li>
                <li><a href="tel:+351210000000">+351 210 000 000</a></li>
                <li><a href="Contactos.html">Fale connosco</a></li>
            </ul>
        </div>

        <!-- Área das redes sociais -->
        <div class="footer-social">
            <h3>Junte-se a nós</h3>
            <div class="footer-social-bar"></div>
            <p>Siga as nossas campanhas e partilhe esperança.</p>
            <ul class="social-list">
                <li><a href="redeSocial.html">Nossa Rede Social</a></li>
            </ul>
        </div>
    </div>

    <!-- Parte inferior do footer -->
    <div class="footer-bottom">
        <p>© 2025 - Alimentar com Coração. Todos os direitos reservados.</p>
    </div>
</footer>`;

// ======================= HEADER AO FAZER SCROLL =======================
// Controla o tamanho do header quando a página é deslizada
// IIFE para isolar variáveis e não poluir o scope global
(function () {

    // Verifica a posição do scroll
    function updateHeaderState() {
        var header = document.querySelector('.site-header');

        // Se o header não existir, não faz nada
        if (!header) {
            return;
        }

        // Quando o scroll passa os 60px, o header fica compacto
        // Usa classe CSS para a transição ser feita no lado do estilo
        var shouldCompact = (window.scrollY || window.pageYOffset) > 60;
        header.classList.toggle('compact', shouldCompact);
    }

    // Aplica a verificação durante o scroll e no carregamento da página
    // "passive: true" evita bloquear o scroll
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('load', updateHeaderState);
    document.addEventListener('DOMContentLoaded', updateHeaderState);
})();

// ======================= MENU MOBILE =======================
// Controla a abertura e fecho do menu na versão mobile
// Lógica centralizada num IIFE para evitar funções globais
(function () {

    // Fecha o menu mobile e os dropdowns
    function closeMobileNav() {
        var nav = document.querySelector('.site-header nav');
        var toggle = document.querySelector('.nav-toggle');

        // Remove classes de estado do menu e do botão
        if (nav) {
            nav.classList.remove('open');
        }

        if (toggle) {
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }

        // Fecha todos os dropdowns abertos
        // Atualiza também o aria-expanded dos botões de dropdown
        document.querySelectorAll('.menu .dropdown.open').forEach(function (item) {
            item.classList.remove('open');
            var dropdownToggle = item.querySelector('.dropdown-toggle');
            if (dropdownToggle) {
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Deteta cliques na página
    // Usa delegação para apanhar cliques em elementos dinâmicos
    document.addEventListener('click', function (e) {

        // Clique no botão do menu
        var navToggle = e.target.closest('.nav-toggle');
        if (navToggle) {
            var header = navToggle.closest('.site-header');
            var nav = header ? header.querySelector('nav') : null;
            if (!nav) return;

            // Abre ou fecha o menu
            // Mantem o aria-expanded sincronizado com o estado visual
            var isOpen = nav.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            return;
        }

        // Clique num link do menu fecha o menu mobile
        if (e.target.closest('.menu a')) {
            closeMobileNav();
            return;
        }

        // Clique fora do header fecha o menu
        // Evita o menu ficar aberto quando o utilizador interage fora
        if (!e.target.closest('.site-header')) {
            closeMobileNav();
        }
    });

    // Em ecrãs grandes o menu mobile fecha automaticamente
    // Previne estados estranhos ao redimensionar a janela
    window.addEventListener('resize', function () {
        if (window.innerWidth > 900) {
            closeMobileNav();
        }
    });
})();
