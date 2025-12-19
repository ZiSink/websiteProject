var headerPage = `
<header class="site-header">
        <div class="header-content">
            <a href="index.html"><img src="Images/Logo.png" alt="Logotipo do 'Alimentar com coração'" class="logotipo"></a>
            <button class="nav-toggle" aria-expanded="false" aria-label="Abrir menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav>
                <ul class="menu">
                    <li class="dropdown">
                        <button class="dropdown-toggle" aria-expanded="false">Sobre Nós</button>
                        <ul class="submenu" aria-label="Sobre Nós submenu">
                            <li><a href="NossaMissao.html">A Nossa Missão</a></li>
                            <li><a href="Contactos.html">Contactos</a></li>
                            <li><a href="FAQ.html">FAQs</a></li>
                        </ul>
                    </li>

                    <li class="dropdown">
                        <button class="dropdown-toggle" aria-expanded="false">Como Ajudar</button>
                        <ul class="submenu" aria-label="Como Ajudar submenu">
                            <li><a href="Doacoes.html">Donativos e Doações</a></li>
                            <li><a href="Voluntariado.html">Torne-se Voluntário</a></li>
                            <li><a href="Campanhas.html">Campanhas Ativas</a></li>
                        </ul>
                    </li>

                    <a href="PrecisoAjuda.html">Preciso de Ajuda</a>
                    <a href="PontosdeRecolha.html">Pontos de Recolha</a>
                    <a href="Noticias.html">Notícias</a>
                </ul>
            </nav>
        </div>
    </header>`;

var footerPage = `<footer class="site-footer">
            <div class="footer-container">
                <div class="footer-branding">
                    <img src="Images/Logo.png" alt="Logotipo Alimentar com Coração" class="footer-logo">
                    <p>Unimos corações para combater a fome através de recolhas solidárias, apoio alimentar e iniciativas comunitárias.</p>
                </div>
                <div class="footer-contact">
                    <h3>Contactos</h3>
                    <div class="footer-social-bar"></div>
                    <ul>
                        <li><a href="mailto:alimentarccoracao@sapo.pt">alimentarccoracao@sapo.pt</a></li>
                        <li><a href="tel:+351210000000">+351 210 000 000</a></li>
                        <li><a href="Contactos.html">Fale connosco</a></li>
                    </ul>
                </div>
                <div class="footer-social">
                    <h3>Junte-se a nós</h3>
                    <div class="footer-social-bar"></div>
                    <p>Siga as nossas campanhas e partilhe esperança.</p>
                    <ul class="social-list">
                        <li><a href="redeSocial.html">Nossa Rede Social</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2025 - Alimentar com Coração. Todos os direitos reservados.</p>
            </div>
        </footer>`;

(function () {
    function updateHeaderState() {
        var header = document.querySelector('.site-header');
        if (!header) {
            return;
        }

        var shouldCompact = (window.scrollY || window.pageYOffset) > 60;
        header.classList.toggle('compact', shouldCompact);
    }

    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('load', updateHeaderState);
    document.addEventListener('DOMContentLoaded', updateHeaderState);
})();

(function () {
    function closeMobileNav() {
        var nav = document.querySelector('.site-header nav');
        var toggle = document.querySelector('.nav-toggle');
        if (nav) {
            nav.classList.remove('open');
        }
        if (toggle) {
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
        document.querySelectorAll('.menu .dropdown.open').forEach(function (item) {
            item.classList.remove('open');
            var dropdownToggle = item.querySelector('.dropdown-toggle');
            if (dropdownToggle) {
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    document.addEventListener('click', function (e) {
        var navToggle = e.target.closest('.nav-toggle');
        if (navToggle) {
            var header = navToggle.closest('.site-header');
            var nav = header ? header.querySelector('nav') : null;
            if (!nav) return;
            var isOpen = nav.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            return;
        }

        if (e.target.closest('.menu a')) {
            closeMobileNav();
            return;
        }

        if (!e.target.closest('.site-header')) {
            closeMobileNav();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 900) {
            closeMobileNav();
        }
    });
})();
