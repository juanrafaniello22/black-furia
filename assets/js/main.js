/* Black Furia · comportamiento de la web (sin dependencias) */
(function () {
  'use strict';
  var TEAM_MAIL = 'rcblackfuria@gmail.com';
  var header = document.querySelector('[data-header]');
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-menu]');

  /* cabecera: fondo al hacer scroll */
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* menú móvil */
  function setMenu(open) {
    if (!menu || !toggle) return;
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    header.classList.toggle('is-open', open);
    document.documentElement.style.overflow = open ? 'hidden' : '';
    var label = toggle.querySelector('.menu-toggle__label');
    if (label) label.textContent = open ? 'Cerrar' : 'Menú';
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () { setMenu(menu.hidden); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); } });
    window.addEventListener('resize', function () { if (window.innerWidth > 1180 && !menu.hidden) setMenu(false); });
  }

  /* enlace activo según la sección visible */
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-nav] a'));
  if ('IntersectionObserver' in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        var a = byId[en.target.id];
        if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    /* en la portada no se marca ninguna sección */
    var hero = document.getElementById('inicio');
    if (hero) io.observe(hero);
  }

  /* copiar texto con alternativa si el portapapeles no está disponible */
  function copyText(text, onDone, fallbackEl) {
    function fallback() {
      if (fallbackEl) {
        var r = document.createRange(); r.selectNodeContents(fallbackEl);
        var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
      }
      onDone(false);
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { onDone(true); }, fallback);
      } else { fallback(); }
    } catch (err) { fallback(); }
  }

  var copyBtn = document.getElementById('copy-mail');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      copyText(TEAM_MAIL, function (ok) {
        copyBtn.textContent = ok ? 'Copiado' : 'Seleccionado';
        copyBtn.classList.add('is-done');
        setTimeout(function () { copyBtn.textContent = 'Copiar'; copyBtn.classList.remove('is-done'); }, 2200);
      }, document.getElementById('team-mail'));
    });
  }

  /* formulario: prepara el correo (la web no envía nada por sí sola) */
  var form = document.getElementById('compose');
  if (form) {
    var err = document.getElementById('compose-err');
    var help = document.getElementById('compose-help');
    var copyMsg = document.getElementById('compose-copy');
    var helpText = help ? help.textContent : '';

    function build() {
      var nombre = form.nombre.value.trim();
      var empresa = form.empresa.value.trim();
      var nivel = form.nivel.value;
      var mensaje = form.mensaje.value.trim();
      var subject = 'Patrocinio Black Furia' + (empresa ? ' · ' + empresa : '');
      var body = 'Hola, equipo Black Furia:\n\n' +
        (mensaje ? mensaje + '\n\n' : '') +
        'Me interesa: ' + nivel + '\n' +
        'Nombre: ' + nombre + '\n' +
        (empresa ? 'Empresa: ' + empresa + '\n' : '') +
        '\nUn saludo.';
      return { nombre: nombre, subject: subject, body: body };
    }
    function valid(m) {
      var ok = m.nombre.length > 0;
      err.hidden = ok;
      form.nombre.classList.toggle('is-invalid', !ok);
      if (ok) form.nombre.removeAttribute('aria-invalid'); else form.nombre.setAttribute('aria-invalid', 'true');
      if (!ok) {
        var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        form.nombre.focus({ preventScroll: true });
        form.nombre.scrollIntoView({ block: 'center', behavior: calm ? 'auto' : 'smooth' });
      }
      return ok;
    }
    form.nombre.addEventListener('input', function () {
      if (!err.hidden && form.nombre.value.trim()) { err.hidden = true; form.nombre.classList.remove('is-invalid'); form.nombre.removeAttribute('aria-invalid'); }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var m = build();
      if (!valid(m)) return;
      var href = 'mailto:' + TEAM_MAIL + '?subject=' + encodeURIComponent(m.subject) + '&body=' + encodeURIComponent(m.body);
      window.location.href = href;
      if (help) { help.textContent = 'Si no se ha abierto tu correo, pulsa «Copiar mensaje» y pégalo en un correo nuevo a ' + TEAM_MAIL + '.'; help.classList.add('is-done'); }
    });
    if (copyMsg) {
      copyMsg.addEventListener('click', function () {
        var m = build();
        if (!valid(m)) return;
        copyText('Para: ' + TEAM_MAIL + '\nAsunto: ' + m.subject + '\n\n' + m.body, function (ok) {
          if (!help) return;
          help.textContent = ok ? 'Mensaje copiado. Pégalo en un correo nuevo a ' + TEAM_MAIL + '.' : 'No se ha podido copiar automáticamente. Escríbenos a ' + TEAM_MAIL + '.';
          help.classList.add('is-done');
          setTimeout(function () { help.textContent = helpText; help.classList.remove('is-done'); }, 6000);
        });
      });
    }
  }
})();
