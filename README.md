# Web de Black Furia

Web oficial de **Black Furia**, la escudería del IES Las Viñas (Manilva, Málaga) en STEM Racing España.

Es una web estática: HTML, CSS y un poco de JavaScript, sin programas que instalar ni nada que compilar. Se edita con cualquier editor de texto (VS Code, por ejemplo). Está guardada en GitHub y la publica Netlify: cada cambio que se sube a GitHub aparece en la web en uno o dos minutos.

## Qué hay en la carpeta

```
index.html            la página entera (todas las secciones)
404.html              página «Fuera de pista» para direcciones que no existen
assets/css/main.css   colores, letras y diseño
assets/js/main.js     menú del móvil, botones de copiar y formulario
assets/img/           logo, fondos del inicio, portada del dossier e imagen para redes
assets/fonts/         tipografías (Saira y Barlow), ya incluidas
favicon.*, icon-*, apple-touch-icon.png, site.webmanifest   iconos de la pestaña y del móvil
robots.txt            permite que Google indexe la web
netlify.toml          configuración de Netlify (no hay que tocarla)
```

## Verla en tu ordenador

Haz doble clic en `index.html`. Para verla igual que en internet, abre una terminal en esta carpeta y escribe:

```
python3 -m http.server 8000
```

y entra en http://localhost:8000

## Cambios habituales

Cada sección de `index.html` empieza con un comentario grande, por ejemplo `<!-- ============ EQUIPO ============ -->`. Busca ese comentario para ir directo.

**Puesto de cada integrante.** Está debajo del nombre, en la sección `EQUIPO`:

```html
<div class="driver__body"><h3 class="driver__name">Pablo</h3><p class="driver__role">Ingeniero de diseño</p></div>
```

**Suplentes.** Están en el bloque «Suplentes», justo debajo de las tarjetas del equipo. Para añadir uno, copia una línea y cambia la inicial y el nombre:

```html
<li class="reserve"><span class="reserve__initial" aria-hidden="true">R</span><span class="reserve__name">Rayan</span><span class="reserve__role">Suplente</span></li>
```

**Fotos del equipo.** Guarda la foto en `assets/img/equipo/` (vertical 4:5, unos 800 × 1000 px y menos de 200 KB; mejor `.webp` o `.jpg`) y métela dentro del recuadro de esa persona:

```html
<div class="driver__photo" aria-hidden="true"><img src="assets/img/equipo/antonio.webp" alt="" width="800" height="1000" loading="lazy"><span class="driver__initial">A</span></div>
```

La foto sale en blanco y negro para que todas queden iguales, y tapa sola la letra grande. Sois menores: subid fotos solo con permiso de vuestras familias, y solo con el nombre de pila.

**Parrilla de patrocinadores.** Cada casilla es un tipo de patrocinador (P1 Principal, P2 Platino, P3 Oro, P4 Plata, P5 Colaborador y P6 En especie). Cuando un nivel se llene, añade `slot--full` a su casilla y cambia las plazas por «Completo»:

```html
<li class="slot slot--full"><span class="slot__pos">P2</span><span class="slot__places">Completo</span><span class="slot__tier">Platino</span>…</li>
```

**Niveles y precios.** Aparecen en cuatro sitios: las tarjetas de la sección `PATROCINIO`, la «Parrilla de patrocinadores», el desplegable «Me interesa» del formulario de contacto y el propio dossier. Si cambias un precio o un número de plazas, cámbialo en todos.

**Dossier de patrocinio.** La portada que se puede pinchar y el botón «Abrir el dossier» llevan al PDF de Google Drive. Si subís un dossier nuevo con otro enlace, cambia el enlace en los dos sitios (busca `drive.google.com` en `index.html`). Si cambia la portada, sustituye `assets/img/dossier-portada.webp` por una imagen de la primera página del mismo tamaño (720 × 1019 px).

**Correo e Instagram.** Aparecen en el menú, en la sección de contacto, en el pie y en `assets/js/main.js` (primera línea, `TEAM_MAIL`).

## Publicación: GitHub + Netlify

La web vive en el repositorio `black-furia` de GitHub. Netlify está conectado a ese repositorio: cada vez que se sube un cambio a la rama `main`, vuelve a publicar la web sola.

**Conectar Netlify (solo la primera vez):**

1. Entra en https://app.netlify.com con tu cuenta de GitHub.
2. *Add new site → Import an existing project → GitHub* y elige el repositorio `black-furia`.
3. Deja *Build command* vacío y *Publish directory* en `.` (el archivo `netlify.toml` ya lo indica).
4. Pulsa *Deploy*. En un minuto tendrás una dirección del tipo `https://nombre.netlify.app`. En *Site configuration → Change site name* puedes cambiarla, por ejemplo a `black-furia.netlify.app`.

**Dominio propio** (por ejemplo `blackfuria.es`): cuesta unos 10 € al año y lo tiene que comprar un adulto. Después se conecta en Netlify, en *Domain management → Add a domain*.

## Cuando ya tengáis la dirección definitiva

En `index.html`, dentro de `<head>`:

1. Cambia `og:image` por la dirección completa, por ejemplo `https://blackfuria.es/assets/img/og-black-furia.jpg`. Así sale la imagen al compartir el enlace en WhatsApp, Instagram o LinkedIn.
2. Añade debajo `<meta property="og:url" content="https://blackfuria.es/">` y `<link rel="canonical" href="https://blackfuria.es/">`.

## Normas del equipo para la web

- No publicar nunca la cifra total que necesitamos. Se enseña solo el reparto en porcentajes.
- Sin patrocinadores de alcohol, apuestas ni casinos: somos menores.
- Nada de «SIM RACING TEAM» en el logo ni en los textos.
- Colores: negro principal, rojo secundario y blanco solo para detalles.

## Créditos

- Tipografías: Saira (Copyright 2020 The Saira Project Authors) y Barlow (Copyright 2017 The Barlow Project Authors), con licencia SIL Open Font License 1.1 (https://openfontlicense.org). Se pueden usar gratis en webs.
- Fotos de Manilva y del puerto de la Duquesa: las del banner de Instagram del equipo. Si alguna no es vuestra, cambiadla o poned el nombre del autor en el pie de foto.
- Datos técnicos del monoplaza: reglamento técnico de la final mundial de STEM Racing 2026.
- STEM Racing y F1 in Schools son marcas de sus titulares. Black Furia es un equipo escolar participante.
