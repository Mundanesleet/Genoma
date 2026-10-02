# GENOMA Colombia — Demo web estática

Implementación en HTML, CSS y JavaScript del diseño **"Genoma Digital Redesign"** hecho en Google Stitch para [genomacol.com](https://genomacol.com).

Es una **demo**: no tiene backend, base de datos, login ni pagos reales. El carrito y los favoritos se guardan solo en el navegador (`localStorage`).

## Páginas

| Archivo | Contenido |
|---|---|
| `index.html` | Home: hero, manifiesto, líneas Mujer/Hombre, colecciones con filtros, catálogo con filtro por línea, asesor "Encuentra tu Match", propósito, reseñas, street archive, CTA y footer |
| `producto.html?id=<id>` | Ficha de producto: galería, color, talla con stock real, cantidad, comprar ahora / agregar a la bolsa, guía de tallas, "Completa el Look / Match" y reseñas |

Ejemplo: `producto.html?id=parka-impermeable`. Los `id` disponibles están en `js/products.js`.

## Ver el sitio en local

Hace falta un servidor estático, porque algunos navegadores bloquean partes de la página si la abres con doble clic (`file://`). Cualquiera de estas opciones sirve:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Luego abre `http://localhost:8000`.

## Publicar en GitHub Pages

```bash
git add .
git commit -m "GENOMA: demo estática"
git branch -M main
git remote add origin https://github.com/Mundanesleet/Genoma.git
git push -u origin main
```

En GitHub: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)`**.
Queda publicado en `https://mundanesleet.github.io/Genoma/`.

Todas las rutas son relativas y el archivo `.nojekyll` evita que GitHub procese el sitio con Jekyll, así que no se necesita ninguna configuración adicional.

## Estructura

```
index.html, producto.html
css/
  styles.css        tokens del diseño Stitch, componentes y secciones
  product.css       ficha de producto
  animations.css    reveal, parallax, transiciones (respeta prefers-reduced-motion)
  responsive.css    adaptaciones para tablet (≤1023px) y móvil (≤767px)
js/
  products.js       catálogo + ProductService (interfaz asíncrona)
  cart.js           carrito y favoritos (demo con localStorage)
  app.js            header, menú, búsqueda, mini-cart, toasts, helpers de render
  animations.js     IntersectionObserver para reveal/stagger y parallax
  home.js           colecciones, catálogo y reseñas de la home
  match.js          asesor "Encuentra tu Match" y carrusel "Completa el Look"
  product-detail.js ficha de producto
assets/
  images/products/<id>/   fotos de cada prenda
  images/hero|collections|editorial|instagram/
  logo/, icons/
```

## Datos

Todo el contenido comercial es real y se tomó de genomacol.com:

- **Productos, precios, colores, tallas y disponibilidad por variante**: del catálogo público de la tienda Shopify.
- **Descripciones, características y tablas de medidas**: de cada ficha de producto (las tablas se transcribieron de los cuadros de tallas publicados por GENOMA).
- **Calificaciones y reseñas**: de Judge.me (el widget de reseñas de genomacol.com). Promedio de la tienda: 4,56 de 2.134 reseñas.
- **Políticas**: contra entrega en Bogotá, despacho 2 días hábiles, 4 a 6 días fuera de Bogotá, cambios hasta 30 días.

Los nombres se muestran sin la referencia interna (por ejemplo, "Parka Impermeable" y no "10008 Parka impermeable"). La referencia se guarda en el campo `ref` de cada producto.

## Imágenes

Todas las fotos son originales de GENOMA, sin capturas de pantalla ni textos encima. Se excluyeron las imágenes de los cuadros de tallas y los banners con texto.

Cada foto se publica en AVIF y WebP en 480, 800 y 1200 px, sin superar nunca el tamaño original (no hay ampliación artificial), con un JPEG de respaldo. El HTML usa `<picture>`, `srcset` y `sizes`, `loading="lazy"` en lo que no es crítico y `fetchpriority="high"` más un `preload` para la foto principal del hero.

## Migrar a un e-commerce real

La interfaz no lee los datos directamente, sino que pasa por servicios que devuelven Promesas:

- `GENOMA.ProductService`: `getAll()`, `getById(id)`, `getByIds(ids)`, `getByLine(line)` y `search(q)`.
- `GENOMA.Cart`: `add()`, `update()`, `remove()` y `getItems()`.
- `GENOMA.Favorites`

Para conectar un backend o una API, basta con reemplazar el interior de esos métodos por `fetch()` manteniendo la misma forma de los objetos (ver un producto en `js/products.js`). Las vistas no cambian.

## Pendiente de confirmar con el cliente

- **WhatsApp**: se usa el número publicado en la política de cambios (`STORE.whatsapp` en `js/products.js`). Hay que confirmar si es el canal de ventas.
- **Instagram**: la cuenta real es `@genoma.col`. En Stitch aparecía como `@GENOMACOLOMBIA`.
- **Calificación de la Parka**: Judge.me muestra 4,81 de 68 reseñas (60 de 5 estrellas). El "4.9 / 48" del diseño de Stitch no coincide con la fuente, así que se usan los datos reales.
