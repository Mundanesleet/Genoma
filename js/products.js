/* =========================================================================
   GENOMA — Catálogo de productos (DEMO estática)
   Datos reales tomados de genomacol.com (Shopify) y de las reseñas públicas
   de Judge.me. Generado; para editar a mano respeta la misma forma.

   Para migrar a backend: reemplaza ProductService por llamadas a la API
   manteniendo la misma interfaz basada en Promesas (getAll, getById, ...).
   ========================================================================= */
(function (G) {
  'use strict';

  var STORE = {
    name: 'GENOMA',
    domain: 'genomacol.com',
    instagram: 'https://www.instagram.com/genoma.col/',
    instagramHandle: '@genoma.col',
    // Número publicado en la política de cambios de genomacol.com — confirmar con el cliente.
    whatsapp: '573163813597',
    rating: { average: 4.56, count: 2134 },
    policies: {
      exchanges: 'https://genomacol.com/policies/refund-policy',
      privacy: 'https://genomacol.com/policies/privacy-policy',
      terms: 'https://genomacol.com/policies/terms-of-service'
    },
    shipping: 'El envío se realiza 2 días hábiles después de tu compra. Para ciudades fuera de Bogotá el tiempo de entrega es de 4 a 6 días; dependemos de la transportadora.',
    exchange: 'Cambios por talla o por otro producto dentro de los 30 días posteriores a la recepción del pedido. La prenda debe tener sus etiquetas y no tener señales de uso. El costo de envío del cambio lo asume el cliente, salvo error de despacho.',
    sizeAdvice: 'Si tienes dudas entre 2 tallas, te aconsejamos pedir la talla más grande o revisar la tabla de medidas.'
  };

  // Reseñas destacadas en la home real de genomacol.com (widget "Real customer stories").
  var STORE_REVIEWS = [
    { author: 'Mariale', rating: 5, title: 'Chaqueta forrada de jeans y hebillas', body: 'Esta hermosa chaqueta ovejera de su última colección es preciosa, sus terminaciones y detalles las hacen única super recomendada además por lo calientita', product: null },
    { author: 'Eliana SG', rating: 5, title: 'Divina', body: 'Excelente calidad!!! En material en color en diseño. Todo el producto en general es excelente.', product: 'chaqueta-impermeable' },
    { author: 'Yuliana Ocoro', rating: 5, title: 'Biker', body: 'Muy linda como siempre', product: 'biker-tipo-cuero' },
    { author: 'Janeth Bonilla', rating: 5, title: 'Excelente producto', body: 'Super hermosos los blazer, la calidad no se compara con nada.', product: null, productLabel: 'Blazer de Mujer' },
    { author: 'Sara Hernandez', rating: 5, title: '', body: 'Super linda la chaqueta, llegó a tiempo y en perfecto estado, la talla adecuada y el material muy chevere ;)', product: null }
  ];

  var PRODUCTS = [
    {
      "id": "parka-impermeable",
      "ref": "10008",
      "name": "Parka Impermeable",
      "line": "mujer",
      "category": "impermeables",
      "collection": "Parkas",
      "price": 270000,
      "currency": "COP",
      "badge": "Repele al agua",
      "summary": "Liviana, repele al agua y con capota removible",
      "description": [
        "Descubre la perfecta combinación de estilo y funcionalidad con nuestra chaqueta semipermeable, disponible en una variedad de colores y estilos que se adapta a tu guardarropa para cualquier ocasión.",
        "Perfecta para actividades al aire libre, con bolsillos estratégicamente ubicados y un ajuste cómodo."
      ],
      "features": [
        "Tallaje normal",
        "Liviana",
        "Forro interno liso",
        "Bolsillo interno",
        "Repele al agua",
        "Capota removible"
      ],
      "colors": [
        {
          "name": "Verde Militar",
          "hex": "#4a4f3a",
          "image": 0
        },
        {
          "name": "Negro",
          "hex": "#1b1b1d",
          "image": 1
        },
        {
          "name": "Rosa",
          "hex": "#e6c3bd",
          "image": 2
        },
        {
          "name": "Azul",
          "hex": "#1f2a44",
          "image": 3
        },
        {
          "name": "Kamel",
          "hex": "#8a7a66",
          "image": 4
        },
        {
          "name": "Verde Menta",
          "hex": "#9fbdb0",
          "image": 5
        },
        {
          "name": "Café Oscuro",
          "hex": "#4a3a30",
          "image": null
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "stock": {
        "Verde Militar": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": true
        },
        "Negro": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": true
        },
        "Rosa": {
          "S": false,
          "M": true,
          "L": false,
          "XL": true,
          "XXL": true
        },
        "Azul": {
          "S": false,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": true
        },
        "Kamel": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": true
        },
        "Verde Menta": {
          "S": true,
          "M": false,
          "L": true,
          "XL": true,
          "XXL": true
        },
        "Café Oscuro": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": true
        }
      },
      "images": [
        {
          "key": "00",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "01",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "02",
          "w": 3024,
          "h": 4032,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        },
        {
          "key": "03",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "04",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "05",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "10",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "11",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "08",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "18",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        }
      ],
      "mainImage": 0,
      "detailImages": [
        6,
        7,
        8,
        9
      ],
      "sizeChart": {
        "sizes": [
          "S",
          "M",
          "L",
          "XL"
        ],
        "rows": [
          [
            "Ancho",
            48,
            50,
            52,
            54
          ],
          [
            "Largo total",
            81,
            81,
            83,
            83
          ],
          [
            "Largo manga",
            59,
            60,
            64,
            66
          ]
        ]
      },
      "rating": {
        "average": 4.81,
        "count": 68,
        "fiveStar": 60
      },
      "reviews": [
        {
          "author": "Eliana SG",
          "rating": 5,
          "date": "2026-02-22",
          "verified": true,
          "title": "Hermosa!!!",
          "body": "Tengo varias de las referencias de esta marca en mi Closet y como SIEMPRE me soprende y me hace enamorarme más de sus diseños productos y calidad (no solo en el producto, esta calidad tambien existe en el personal que lo atiende y le sirve a uno en cada compra).\n\nFELICIDADES!!! una vez más por consentirnos tanto 🤗"
        },
        {
          "author": "Jeimmy Andrea Alvarado Macias",
          "rating": 5,
          "date": "2026-01-30",
          "verified": true,
          "title": "me encanta",
          "body": "Excelente calidad y muy bonita y practica"
        },
        {
          "author": "Mayra Chica",
          "rating": 5,
          "date": "2026-01-24",
          "verified": true,
          "title": "Excelente atención",
          "body": "Antes, durante y después son los mejores"
        }
      ],
      "match": [
        "blazer-en-pano",
        "biker-tipo-cuero",
        "jean-peluche",
        "chaqueta-impermeable"
      ],
      "tags": {
        "occasion": [
          "lluvia"
        ],
        "fit": [
          "normal",
          "termica"
        ]
      },
      "source": "https://genomacol.com/products/parca-impermeable-10008"
    },
    {
      "id": "biker-tipo-cuero",
      "ref": "21011",
      "name": "Biker Tipo Cuero",
      "line": "mujer",
      "category": "biker",
      "collection": "Chaquetas Biker Tipo Cuero",
      "price": 180000,
      "currency": "COP",
      "badge": "Molde slim fit",
      "summary": "Efecto cuero con forro interno con Spandex",
      "description": [
        "Las chaquetas efecto cuero son ideales para armar un outfit casual o elegante. Tiene cortes asimétricos que permitirán que se ajuste perfecto a tu figura; el forro interno es liso con Spandex, permitiendo que la prenda sea bastante cómoda."
      ],
      "features": [
        "Efecto cuero",
        "Forro interno con Spandex",
        "Molde slim fit",
        "Bolsillo interno"
      ],
      "colors": [
        {
          "name": "Cafe Contraste",
          "hex": "#5a3d2e",
          "image": 0
        },
        {
          "name": "Negra",
          "hex": "#141414",
          "image": 1
        },
        {
          "name": "Vino",
          "hex": "#6e1f24",
          "image": 2
        },
        {
          "name": "Cafe Oscuro",
          "hex": "#3a2a22",
          "image": 3
        },
        {
          "name": "Miel",
          "hex": "#9a6a3e",
          "image": 4
        }
      ],
      "sizes": [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "stock": {
        "Cafe Contraste": {
          "XS": false,
          "S": true,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": false
        },
        "Negra": {
          "XS": true,
          "S": true,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": true
        },
        "Vino": {
          "XS": false,
          "S": false,
          "M": false,
          "L": false,
          "XL": false,
          "XXL": false
        },
        "Cafe Oscuro": {
          "XS": false,
          "S": true,
          "M": true,
          "L": false,
          "XL": true,
          "XXL": false
        },
        "Miel": {
          "XS": false,
          "S": true,
          "M": false,
          "L": false,
          "XL": false,
          "XXL": false
        }
      },
      "images": [
        {
          "key": "00",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "01",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "02",
          "w": 3024,
          "h": 3791,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        },
        {
          "key": "03",
          "w": 3024,
          "h": 4032,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        },
        {
          "key": "04",
          "w": 3024,
          "h": 4032,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        },
        {
          "key": "13",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "06",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "09",
          "w": 3024,
          "h": 4032,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        },
        {
          "key": "11",
          "w": 3024,
          "h": 4032,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        }
      ],
      "mainImage": 0,
      "detailImages": [
        5,
        6,
        7,
        8
      ],
      "sizeChart": {
        "sizes": [
          "XS",
          "S",
          "M",
          "L",
          "XL",
          "XXL"
        ],
        "rows": [
          [
            "Ancho",
            43,
            45,
            47,
            49,
            51,
            53
          ],
          [
            "Largo",
            55,
            57,
            59,
            61,
            63,
            65
          ],
          [
            "Manga",
            55,
            57,
            59,
            61,
            63,
            65
          ]
        ]
      },
      "rating": {
        "average": 4.68,
        "count": 28,
        "fiveStar": 21
      },
      "reviews": [
        {
          "author": "Deyanid Molina",
          "rating": 5,
          "date": "2026-08-03",
          "verified": true,
          "title": "Sencillamente espectacular",
          "body": "Me encanto mi chaqueta, el color, la confección, el material, el servicio, mejor dicho todo es muy top, super recomendada. Gracias por hacer productos tan bien hechos, se les nota el amor."
        },
        {
          "author": "Milena Saavedra",
          "rating": 5,
          "date": "2026-05-26",
          "verified": true,
          "title": "Chaqueta tipo cuero colot cafe",
          "body": "Me encanta el material y la confección,"
        },
        {
          "author": "Yuliana Ocoro",
          "rating": 5,
          "date": "2026-04-26",
          "verified": true,
          "title": "Biker",
          "body": "Muy linda como siempre ❤️"
        },
        {
          "author": "Hypatia Hurtado",
          "rating": 4,
          "date": "2026-02-17",
          "verified": true,
          "title": "",
          "body": "A veces es muy caliente pero en general buena."
        }
      ],
      "match": [
        "jean-peluche",
        "blazer-en-pano",
        "parka-impermeable",
        "chaqueta-corta"
      ],
      "tags": {
        "occasion": [
          "noche"
        ],
        "fit": [
          "slim"
        ]
      },
      "source": "https://genomacol.com/products/chaqueta-biker-tipo-cuero-mujer-21011"
    },
    {
      "id": "blazer-en-pano",
      "ref": "25043",
      "name": "Blazer en Paño",
      "line": "mujer",
      "category": "blazers",
      "collection": "Blazer",
      "price": 135000,
      "currency": "COP",
      "badge": "6% Spandex",
      "summary": "Molde slim fit en tela con 6% de Spandex",
      "description": [
        "Nuestro blazer fue creado para facilitar tus outfits; su versatilidad te permitirá lucir hermosa en toda ocasión.",
        "La tela te encantará: es bastante cómoda gracias a su composición con Spandex. Sus cortes asimétricos permiten que se ajuste perfectamente a tu figura."
      ],
      "features": [
        "Molde slim fit",
        "Tela con 6% de Spandex"
      ],
      "colors": [
        {
          "name": "Gris",
          "hex": "#8d8d8f",
          "image": 0
        },
        {
          "name": "Verde Menta",
          "hex": "#c9d6cf",
          "image": 1
        },
        {
          "name": "Lila Claro",
          "hex": "#e3dde3",
          "image": 2
        }
      ],
      "sizes": [
        "XS",
        "S",
        "M",
        "L",
        "XL"
      ],
      "stock": {
        "Gris": {
          "XS": true,
          "S": false,
          "M": false,
          "L": false,
          "XL": false
        },
        "Verde Menta": {
          "XS": false,
          "S": true,
          "M": false,
          "L": false,
          "XL": false
        },
        "Lila Claro": {
          "XS": false,
          "S": true,
          "M": false,
          "L": false,
          "XL": false
        }
      },
      "images": [
        {
          "key": "00",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "01",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "02",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "03",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "04",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "05",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        }
      ],
      "mainImage": 0,
      "detailImages": [
        3,
        4,
        5
      ],
      "sizeChart": {
        "sizes": [
          "S",
          "M",
          "L",
          "XL"
        ],
        "rows": [
          [
            "Ancho",
            40,
            41,
            44,
            45
          ],
          [
            "Largo total",
            58,
            59,
            61,
            62
          ],
          [
            "Largo manga",
            59,
            61,
            61,
            63
          ]
        ]
      },
      "rating": {
        "average": 4.17,
        "count": 12,
        "fiveStar": 9
      },
      "reviews": [
        {
          "author": "Daniela",
          "rating": 3,
          "date": "2025-08-06",
          "verified": true,
          "title": "Talla muy pequeña",
          "body": "Muy lindo y el material también. Pero las tallas no coinciden con el tallaje normal, son supremamente reducidas"
        },
        {
          "author": "Daniela Zapata",
          "rating": 5,
          "date": "2025-07-20",
          "verified": true,
          "title": "Blazer gris",
          "body": "Es hermoso, la tela me encanta, es grueso entonces muy bueno porque realmente cubre del frio"
        },
        {
          "author": "Laura Correa Giraldo",
          "rating": 5,
          "date": "2025-07-12",
          "verified": true,
          "title": "",
          "body": "Muy bonito el Blazer y de muy buena calidad, pero en la espalda me quedo tirante, pregunte si se podía cambiar y no me han respondido."
        },
        {
          "author": "Angie Ochoa",
          "rating": 5,
          "date": "2025-07-11",
          "verified": true,
          "title": "Excelente producto",
          "body": "Preciosa, material excelente"
        },
        {
          "author": "Monica del pilar Zapata largo",
          "rating": 5,
          "date": "2024-04-08",
          "verified": true,
          "title": "",
          "body": "Buenas tardes la chaqueta de muy buena calidad excelente terminado pero las hacen muy pequeñas la s parece XS"
        }
      ],
      "match": [
        "biker-tipo-cuero",
        "parka-impermeable",
        "blazer-ocre",
        "chaqueta-corta"
      ],
      "tags": {
        "occasion": [
          "oficina"
        ],
        "fit": [
          "slim"
        ]
      },
      "source": "https://genomacol.com/products/blazer-de-mujer"
    },
    {
      "id": "chaqueta-impermeable",
      "ref": "26109",
      "name": "Chaqueta Impermeable",
      "line": "mujer",
      "category": "impermeables",
      "collection": "Chaquetas Impermeables",
      "price": 175000,
      "currency": "COP",
      "badge": "Forro tipo peluche",
      "summary": "Repele al agua con forro térmico tipo peluche",
      "description": [
        "Para aquellos días donde la lluvia puede sorprenderte, esta es la indicada para ti. Tiene fibras sintéticas que repelen el agua; muy fácil de cargar, liviana y calientita.",
        "Su forro térmico interno tipo peluche es bastante suave, brindándote una sensación que te encantará."
      ],
      "features": [
        "Molde slim fit",
        "Bolsillo interno",
        "Forro térmico tipo peluche",
        "Fibras sintéticas",
        "Repele al agua"
      ],
      "colors": [
        {
          "name": "Kamel",
          "hex": "#b39a85",
          "image": 0
        },
        {
          "name": "Azul",
          "hex": "#1d2741",
          "image": 1
        },
        {
          "name": "Rojo",
          "hex": "#b3161d",
          "image": 2
        },
        {
          "name": "Negro",
          "hex": "#151515",
          "image": 3
        },
        {
          "name": "Verde Militar",
          "hex": "#4b5032",
          "image": 4
        },
        {
          "name": "Verde Menta",
          "hex": "#a9b9aa",
          "image": 5
        },
        {
          "name": "Beige",
          "hex": "#ddd3c4",
          "image": 6
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "stock": {
        "Kamel": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": true
        },
        "Azul": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": true
        },
        "Rojo": {
          "S": true,
          "M": true,
          "L": false,
          "XL": false,
          "XXL": false
        },
        "Negro": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": true
        },
        "Verde Militar": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": true
        },
        "Verde Menta": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": true
        },
        "Beige": {
          "S": false,
          "M": false,
          "L": false,
          "XL": false,
          "XXL": false
        }
      },
      "images": [
        {
          "key": "00",
          "w": 974,
          "h": 1464,
          "widths": [
            480,
            800,
            974
          ],
          "fallback": 800
        },
        {
          "key": "01",
          "w": 719,
          "h": 1080,
          "widths": [
            480,
            719
          ],
          "fallback": 719
        },
        {
          "key": "02",
          "w": 719,
          "h": 1080,
          "widths": [
            480,
            719
          ],
          "fallback": 719
        },
        {
          "key": "03",
          "w": 719,
          "h": 1080,
          "widths": [
            480,
            719
          ],
          "fallback": 719
        },
        {
          "key": "04",
          "w": 719,
          "h": 1080,
          "widths": [
            480,
            719
          ],
          "fallback": 719
        },
        {
          "key": "05",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "06",
          "w": 719,
          "h": 1080,
          "widths": [
            480,
            719
          ],
          "fallback": 719
        },
        {
          "key": "08",
          "w": 719,
          "h": 1080,
          "widths": [
            480,
            719
          ],
          "fallback": 719
        },
        {
          "key": "09",
          "w": 719,
          "h": 1080,
          "widths": [
            480,
            719
          ],
          "fallback": 719
        }
      ],
      "mainImage": 0,
      "detailImages": [
        7,
        8
      ],
      "sizeChart": {
        "sizes": [
          "S",
          "M",
          "L",
          "XL",
          "XXL"
        ],
        "rows": [
          [
            "Ancho",
            48,
            49,
            50,
            53,
            56
          ],
          [
            "Largo total",
            57,
            59,
            60,
            62,
            61
          ],
          [
            "Largo de manga",
            61,
            62,
            64,
            65,
            67
          ]
        ]
      },
      "rating": {
        "average": 4.41,
        "count": 46,
        "fiveStar": 37
      },
      "reviews": [
        {
          "author": "Eliana SG",
          "rating": 5,
          "date": "2026-06-20",
          "verified": true,
          "title": "DIVINA",
          "body": "Excelente calidad!!! En material en color en diseño.\n\nTodo el producto en general es excelente."
        },
        {
          "author": "Diana Alejandra",
          "rating": 2,
          "date": "2026-06-17",
          "verified": true,
          "title": "",
          "body": "La chaqueta que pedí es linda, pero manejan tallas MUY pequeñas y para hacer la devolución se demoran demasiado. Llevo esperando el cambio de talla de mi chaqueta 12 días y eso que la envié el mismo día que me llegó en cuanto supe que me quedo pequeña, y no me informaron el mismo día que tenía que llenar un formulario para hacer el cambio. Considero falta más organización en cuanto a los tiempos de despacho por devoluciones."
        },
        {
          "author": "Eliana Marquez",
          "rating": 1,
          "date": "2026-03-11",
          "verified": true,
          "title": "tallas",
          "body": "las tallas son demaciado erradas pedi una XL para que me quedara holgada y ni me sirvio"
        },
        {
          "author": "Estefanía Cañaveral Guisao",
          "rating": 5,
          "date": "2026-03-08",
          "verified": true,
          "title": "",
          "body": "Excelente, tal y como se muestra en la publicidad 🤗"
        },
        {
          "author": "Carolina Duque Villa",
          "rating": 5,
          "date": "2026-03-03",
          "verified": true,
          "title": "Excelente producto",
          "body": "Me encantó la tela, el estilo el color y la calidad es excelente."
        }
      ],
      "match": [
        "parka-impermeable",
        "jean-peluche",
        "chaqueta-corta",
        "biker-tipo-cuero"
      ],
      "tags": {
        "occasion": [
          "lluvia"
        ],
        "fit": [
          "slim",
          "termica"
        ]
      },
      "source": "https://genomacol.com/products/chaqueta-impermeable-26109"
    },
    {
      "id": "jean-peluche",
      "ref": "10009",
      "name": "Jean Peluche",
      "line": "mujer",
      "category": "jean",
      "collection": "Chaquetas de Jean",
      "price": 280000,
      "currency": "COP",
      "badge": "Peluche removible",
      "summary": "Chaqueta de jean con peluche interno y cuello removible",
      "description": [
        "Perfecta para combinar con tus outfits favoritos, ya sea con un vestido, jeans o leggings. Esta chaqueta se adapta a cualquier ocasión, desde un día casual hasta una salida nocturna.",
        "Disfruta de la calidez y suavidad del peluche interno, ideal para mantenerte cómoda en los días más fríos. Personaliza tu estilo con el cuello de peluche removible: quítalo para un look más casual o déjalo puesto para un toque de elegancia y calidez adicional."
      ],
      "features": [
        "Molde slim fit",
        "Empaque perfecto para regalo",
        "Peluche removible",
        "Bolsillo interno"
      ],
      "colors": [],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "stock": {
        "_": {
          "S": true,
          "M": true,
          "L": false,
          "XL": true
        }
      },
      "images": [
        {
          "key": "00",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "01",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "02",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "03",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        }
      ],
      "mainImage": 0,
      "detailImages": [
        1,
        2,
        3
      ],
      "sizeChart": null,
      "rating": {
        "average": 5,
        "count": 2,
        "fiveStar": 2
      },
      "reviews": [
        {
          "author": "Sandra milena Rincon Guevara",
          "rating": 5,
          "date": "2025-09-26",
          "verified": true,
          "title": "Jean peluche",
          "body": "Linda muy comoda"
        },
        {
          "author": "Diana Carolina Garzón calderón",
          "rating": 5,
          "date": "2025-05-08",
          "verified": true,
          "title": "chaqueta jean peluche",
          "body": "La chaqueta esta muy linda, tal cual la publicidad, desde el empaque en adelante se demuestra la calidad del producto"
        }
      ],
      "match": [
        "biker-tipo-cuero",
        "parka-impermeable",
        "chaqueta-corta",
        "blazer-en-pano"
      ],
      "tags": {
        "occasion": [
          "finde"
        ],
        "fit": [
          "slim",
          "termica"
        ]
      },
      "source": "https://genomacol.com/products/10009-jean-peluche-mujer"
    },
    {
      "id": "blazer-ocre",
      "ref": "25048",
      "name": "Blazer Ocre",
      "line": "mujer",
      "category": "blazers",
      "collection": "Blazer",
      "price": 120000,
      "currency": "COP",
      "badge": null,
      "summary": "Molde slim fit en tela con Spandex",
      "description": [
        "Nuestro blazer fue creado para facilitar tus outfits; su versatilidad te permitirá lucir hermosa en toda ocasión.",
        "La tela te encantará: es bastante cómoda gracias a su composición con Spandex. Sus cortes asimétricos permiten que se ajuste perfectamente a tu figura."
      ],
      "features": [
        "Molde slim fit",
        "Tela con Spandex"
      ],
      "colors": [
        {
          "name": "Ocre",
          "hex": "#c9a77a",
          "image": 0
        },
        {
          "name": "Marfil",
          "hex": "#efece4",
          "image": 1
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "stock": {
        "Ocre": {
          "S": false,
          "M": true,
          "L": false,
          "XL": false
        },
        "Marfil": {
          "S": false,
          "M": false,
          "L": false,
          "XL": true
        }
      },
      "images": [
        {
          "key": "00",
          "w": 3024,
          "h": 4032,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        },
        {
          "key": "01",
          "w": 1792,
          "h": 2400,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        },
        {
          "key": "02",
          "w": 3024,
          "h": 4032,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        }
      ],
      "mainImage": 0,
      "detailImages": [
        2
      ],
      "sizeChart": null,
      "rating": {
        "average": 3,
        "count": 2,
        "fiveStar": 1
      },
      "reviews": [
        {
          "author": "Carolina Martinez Barbosa",
          "rating": 1,
          "date": "2024-05-24",
          "verified": true,
          "title": "NO LLEGO!",
          "body": "No llegó nunca mi pedido!"
        },
        {
          "author": "ELIZABETH LONDOÑO MORA",
          "rating": 5,
          "date": "2024-02-15",
          "verified": true,
          "title": "Opinion",
          "body": "Excelente calidad del producto, comodidad y diseño de la prenda"
        }
      ],
      "match": [
        "blazer-en-pano",
        "biker-tipo-cuero",
        "chaqueta-corta",
        "jean-peluche"
      ],
      "tags": {
        "occasion": [
          "oficina"
        ],
        "fit": [
          "slim"
        ]
      },
      "source": "https://genomacol.com/products/blazer-25048-marfil"
    },
    {
      "id": "chaqueta-biker",
      "ref": "800",
      "name": "Chaqueta Biker",
      "line": "mujer",
      "category": "biker",
      "collection": "Chaquetas Biker Tipo Cuero",
      "price": 180000,
      "currency": "COP",
      "badge": null,
      "summary": "Efecto cuero, cortes asimétricos y forro con Spandex",
      "description": [
        "Las chaquetas efecto cuero son ideales para armar un outfit casual o elegante. Tiene cortes asimétricos que permitirán que se ajuste perfecto a tu figura; el forro interno es liso con Spandex, permitiendo que la prenda sea bastante cómoda."
      ],
      "features": [
        "Efecto cuero",
        "Forro interno con Spandex",
        "Molde slim fit",
        "Bolsillo interno"
      ],
      "colors": [
        {
          "name": "Negro",
          "hex": "#151515",
          "image": 0
        },
        {
          "name": "Azul",
          "hex": "#27324a",
          "image": 1
        },
        {
          "name": "Brown",
          "hex": "#7b5034",
          "image": 2
        },
        {
          "name": "Rojo",
          "hex": "#c0161e",
          "image": 3
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "stock": {
        "Negro": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true
        },
        "Azul": {
          "S": true,
          "M": false,
          "L": true,
          "XL": false
        },
        "Brown": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true
        },
        "Rojo": {
          "S": true,
          "M": true,
          "L": true,
          "XL": false
        }
      },
      "images": [
        {
          "key": "02",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "07",
          "w": 1058,
          "h": 1328,
          "widths": [
            480,
            800,
            1058
          ],
          "fallback": 800
        },
        {
          "key": "08",
          "w": 1058,
          "h": 1328,
          "widths": [
            480,
            800,
            1058
          ],
          "fallback": 800
        },
        {
          "key": "00",
          "w": 1058,
          "h": 1328,
          "widths": [
            480,
            800,
            1058
          ],
          "fallback": 800
        },
        {
          "key": "01",
          "w": 719,
          "h": 1080,
          "widths": [
            480,
            719
          ],
          "fallback": 719
        },
        {
          "key": "05",
          "w": 719,
          "h": 1080,
          "widths": [
            480,
            719
          ],
          "fallback": 719
        },
        {
          "key": "06",
          "w": 719,
          "h": 1080,
          "widths": [
            480,
            719
          ],
          "fallback": 719
        },
        {
          "key": "10",
          "w": 1058,
          "h": 1328,
          "widths": [
            480,
            800,
            1058
          ],
          "fallback": 800
        }
      ],
      "mainImage": 0,
      "detailImages": [
        4,
        5,
        6,
        7
      ],
      "sizeChart": {
        "sizes": [
          "S",
          "M",
          "L",
          "XL"
        ],
        "rows": [
          [
            "Ancho",
            44,
            45,
            48,
            50
          ],
          [
            "Largo total",
            51,
            53,
            55,
            55
          ],
          [
            "Largo manga",
            57,
            59,
            61,
            63
          ]
        ]
      },
      "rating": {
        "average": 4.41,
        "count": 37,
        "fiveStar": 26
      },
      "reviews": [
        {
          "author": "stephanie parra",
          "rating": 3,
          "date": "2025-07-06",
          "verified": true,
          "title": "Talla pequeña",
          "body": "Compré 3 prendas y todas me quedaron pequeña, no es la primera vez que compro y está vez no me fue bien"
        },
        {
          "author": "Dayana Castellanos",
          "rating": 3,
          "date": "2024-12-18",
          "verified": true,
          "title": "HERMOSA",
          "body": "LA CHAQUETA ES HERMOSA, ESPERABA UN POCO MAS DEL MATERIAL TIPO CUELO Y SEGÚN LAS MEDIDAS PARA LA TALLA YA QUE NO ME QUEDO COMPLETAMENTE LA CHAQUETA. DEBERÍAN AJUSTAR MAS LAS TALLAS PARA PERSONAS DE TALLAS GRANDES"
        },
        {
          "author": "Karoll paola Aldana",
          "rating": 5,
          "date": "2024-12-11",
          "verified": true,
          "title": "",
          "body": "Hermosa muchas gracias"
        },
        {
          "author": "Javier Ernesto Arenas Cala",
          "rating": 5,
          "date": "2024-11-06",
          "verified": true,
          "title": "Excelente",
          "body": "Good"
        },
        {
          "author": "Liby marjorie Lopez peña",
          "rating": 3,
          "date": "2024-10-17",
          "verified": true,
          "title": "Ajustada",
          "body": "El diseño muy bonito , pero algo ajustada para la talla ordenada . El material es ligeramente delgado ."
        }
      ],
      "match": [
        "jean-peluche",
        "blazer-ocre",
        "chaqueta-corta",
        "parka-impermeable"
      ],
      "tags": {
        "occasion": [
          "noche"
        ],
        "fit": [
          "slim"
        ]
      },
      "source": "https://genomacol.com/products/chaqueta-biker-800"
    },
    {
      "id": "chaqueta-corta",
      "ref": "200",
      "name": "Chaqueta Corta",
      "line": "mujer",
      "category": "corta",
      "collection": "Estilo Versátil",
      "price": 195000,
      "currency": "COP",
      "badge": null,
      "summary": "Diseño corto en tela liviana que protege del viento",
      "description": [
        "Esta chaqueta es el equilibrio ideal entre comodidad y estilo urbano. Su diseño corto realza la silueta, mientras su tela liviana te protege del viento sin perder frescura. Los detalles ajustables y bolsillos funcionales la convierten en una prenda práctica, versátil y súper trendy.",
        "Ideal para combinar con jeans, vestidos o looks casuales. Perfecta para días frescos, paseos al aire libre o un outfit relajado con toque chic."
      ],
      "features": [
        "Tallaje normal",
        "Tela 88% poliéster y 12% nylon",
        "Detalles ajustables",
        "Bolsillos funcionales"
      ],
      "colors": [
        {
          "name": "Verde menta",
          "hex": "#bcd8c4",
          "image": 0
        },
        {
          "name": "Verde Militar",
          "hex": "#4d5233",
          "image": 1
        },
        {
          "name": "Marfil",
          "hex": "#f1eee6",
          "image": 2
        },
        {
          "name": "Ocre",
          "hex": "#a8754a",
          "image": 3
        },
        {
          "name": "Arena",
          "hex": "#e1d6bf",
          "image": 4
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "stock": {
        "Verde menta": {
          "S": false,
          "M": true,
          "L": true,
          "XL": true
        },
        "Verde Militar": {
          "S": false,
          "M": true,
          "L": true,
          "XL": true
        },
        "Marfil": {
          "S": false,
          "M": false,
          "L": true,
          "XL": true
        },
        "Ocre": {
          "S": false,
          "M": false,
          "L": true,
          "XL": true
        },
        "Arena": {
          "S": false,
          "M": false,
          "L": true,
          "XL": true
        }
      },
      "images": [
        {
          "key": "00",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "01",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "02",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "03",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "04",
          "w": 3024,
          "h": 4032,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        },
        {
          "key": "08",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "09",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "06",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "07",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        }
      ],
      "mainImage": 0,
      "detailImages": [
        5,
        6,
        7,
        8
      ],
      "sizeChart": {
        "sizes": [
          "S",
          "M",
          "L",
          "XL"
        ],
        "rows": [
          [
            "Ancho",
            56,
            58,
            59,
            60
          ],
          [
            "Largo",
            41,
            43,
            45,
            47
          ],
          [
            "Manga",
            58,
            59,
            60,
            61
          ]
        ]
      },
      "rating": {
        "average": 3.89,
        "count": 9,
        "fiveStar": 5
      },
      "reviews": [
        {
          "author": "Carolina Gonzalez",
          "rating": 5,
          "date": "2025-10-13",
          "verified": true,
          "title": "CALIDAD 100 / 100",
          "body": "Las chaquetas además de estar fabricadas con telas hermosas tienen costuras fuertes y definidas. Casi todas las chaquetas tienen forro interno con bolsillo interior que te hace la vida más fácil al guardar allí tus cosas de valor. Muy recomendado."
        },
        {
          "author": "Nataly Ocampo Zuluaga",
          "rating": 2,
          "date": "2025-08-22",
          "verified": true,
          "title": "Chaqueta",
          "body": "Aún no me ha llegado!"
        },
        {
          "author": "Luz Viviana Lòpez Lòpez",
          "rating": 5,
          "date": "2025-08-20",
          "verified": true,
          "title": "Me encantó",
          "body": "Ahora la prenda infaltable en mi ropero..."
        },
        {
          "author": "Andrea C.",
          "rating": 5,
          "date": "2025-06-02",
          "verified": false,
          "title": "Me encanto",
          "body": "la chaqueta esta muy linda, talla perfecta 😍 la entrega fue más rápido de lo que esperaba, me encantó 💕 sigan así, los felicito 🙂 Dios los bendiga..."
        },
        {
          "author": "Paola N.",
          "rating": 4,
          "date": "2025-04-08",
          "verified": false,
          "title": "Linda Chaqueta",
          "body": "Compré esta referencia junto a otra, muy lindas las dos, el material de esta es suave y liviano. La horma es amplia y cómoda. Muy feliz con la compra! Solamente un aspecto a mejorar, tiempos de entrega."
        }
      ],
      "match": [
        "jean-peluche",
        "biker-tipo-cuero",
        "blazer-ocre",
        "chaqueta-impermeable"
      ],
      "tags": {
        "occasion": [
          "finde"
        ],
        "fit": [
          "corta",
          "normal"
        ]
      },
      "source": "https://genomacol.com/products/chaqueta-corta-200"
    },
    {
      "id": "bomber-classic-mujer",
      "ref": "26065",
      "name": "Match Bomber Classic Mujer",
      "line": "mujer",
      "category": "bomber",
      "collection": "Match",
      "price": 189900,
      "currency": "COP",
      "badge": "Match",
      "summary": "Forro térmico tipo peluche y tela con Spandex",
      "description": [
        "Si buscas una chaqueta cómoda y calientita, esta es la indicada para ti gracias a su forro térmico interno tipo peluche.",
        "La tela principal tiene Spandex, lo que te dará una sensación de confort en todo momento. Molde slim fit que se ajusta perfecto a todo tipo de persona, dándole un look moderno. Puedes usarla para cualquier ocasión."
      ],
      "features": [
        "Bolsillo interno",
        "Tela con Spandex",
        "No motea",
        "Peso 420 g"
      ],
      "colors": [
        {
          "name": "Negro Raya Roja",
          "hex": "#141414",
          "accent": "#b3161d",
          "image": 0
        },
        {
          "name": "Negro Raya Blanca",
          "hex": "#141414",
          "accent": "#ffffff",
          "image": 1
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "stock": {
        "Negro Raya Roja": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true
        },
        "Negro Raya Blanca": {
          "S": false,
          "M": true,
          "L": true,
          "XL": true
        }
      },
      "images": [
        {
          "key": "00",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "03",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "01",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "04",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "05",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        }
      ],
      "mainImage": 0,
      "detailImages": [
        2,
        3,
        4
      ],
      "sizeChart": {
        "sizes": [
          "S",
          "M",
          "L",
          "XL"
        ],
        "rows": [
          [
            "Ancho",
            46,
            48,
            50,
            51
          ],
          [
            "Largo total",
            55,
            56,
            58,
            59
          ],
          [
            "Largo manga",
            58,
            60,
            62,
            63
          ]
        ]
      },
      "rating": {
        "average": 4.67,
        "count": 9,
        "fiveStar": 7
      },
      "reviews": [
        {
          "author": "Elizabeth Pachón Pinilla",
          "rating": 3,
          "date": "2026-06-09",
          "verified": true,
          "title": "",
          "body": "Es bonita pero para la talla es un poco pequeña"
        },
        {
          "author": "Mónica Sandoval",
          "rating": 5,
          "date": "2025-04-09",
          "verified": true,
          "title": "",
          "body": "Hola buen dia, Me encanta cuando algo que uno elige con ilusión supera las expectativas!  la chaqueta es maravillosa"
        },
        {
          "author": "Norma",
          "rating": 5,
          "date": "2025-01-23",
          "verified": true,
          "title": "",
          "body": "Excelente producto, buena calidad de los materiales, la chaqueta es igual a como se ve en las fotos, el empaque y tiempos de entrega muy buenos"
        },
        {
          "author": "Ingrid Marcela Gómez",
          "rating": 5,
          "date": "2024-10-24",
          "verified": true,
          "title": "Fabulosa",
          "body": "Me encanta esta chaqueta, de excelente calidad! Los mejores"
        },
        {
          "author": "Paola Caballero",
          "rating": 5,
          "date": "2024-07-30",
          "verified": true,
          "title": "Super",
          "body": "Me gustó mucho. Gracias!"
        }
      ],
      "match": [
        "biker-tipo-cuero-hombre",
        "bomber-classic-hombre",
        "jean-peluche",
        "chaqueta-corta"
      ],
      "tags": {
        "occasion": [
          "finde"
        ],
        "fit": [
          "slim",
          "termica"
        ]
      },
      "source": "https://genomacol.com/products/chaqueta-beisbolera-de-mujer-20"
    },
    {
      "id": "bomber-classic-rib",
      "ref": "26021",
      "name": "Bomber Classic Mujer",
      "line": "mujer",
      "category": "bomber",
      "collection": "Chaquetas Bomber Classic",
      "price": 180000,
      "currency": "COP",
      "badge": null,
      "summary": "Forro térmico tipo peluche, suave al tacto",
      "description": [
        "Si buscas una chaqueta cómoda y calientita, esta es la indicada para ti gracias a su forro térmico interno tipo peluche; al tacto es bastante suave.",
        "La tela principal tiene Spandex, lo que te dará una sensación de comodidad en todo momento. Molde slim fit que se ajusta perfecto a todo tipo de persona, dándole un look moderno."
      ],
      "features": [
        "Bolsillo interno",
        "Tela con Spandex",
        "No motea",
        "Forro térmico tipo peluche"
      ],
      "colors": [
        {
          "name": "Rib Linea Blanca",
          "hex": "#4a4a4c",
          "accent": "#ffffff",
          "image": 0
        },
        {
          "name": "Rib Unicolor",
          "hex": "#4a4a4c",
          "image": 1
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "stock": {
        "Rib Unicolor": {
          "S": false,
          "M": true,
          "L": false,
          "XL": false,
          "XXL": false
        },
        "Rib Linea Blanca": {
          "S": false,
          "M": false,
          "L": false,
          "XL": false,
          "XXL": true
        }
      },
      "images": [
        {
          "key": "00",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "03",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "07",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "06",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "05",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        }
      ],
      "mainImage": 0,
      "detailImages": [
        2,
        3,
        4
      ],
      "sizeChart": null,
      "rating": {
        "average": 5,
        "count": 1,
        "fiveStar": 1
      },
      "reviews": [
        {
          "author": "Claudia Patricia Marín Morales",
          "rating": 5,
          "date": "2025-07-09",
          "verified": true,
          "title": "Excelente calidad",
          "body": "Me encantó la chaqueta, la calidad excepcional y hermosa. Me encantó."
        }
      ],
      "match": [
        "jean-peluche",
        "chaqueta-corta",
        "biker-tipo-cuero",
        "parka-impermeable"
      ],
      "tags": {
        "occasion": [
          "finde"
        ],
        "fit": [
          "slim",
          "termica"
        ]
      },
      "source": "https://genomacol.com/products/chaqueta-mujer-26021"
    },
    {
      "id": "bomber-classic-hombre",
      "ref": "14157",
      "name": "Bomber Classic Hombre",
      "line": "hombre",
      "category": "bomber",
      "collection": "Chaquetas Bomber Classic",
      "price": 210000,
      "currency": "COP",
      "badge": "No motea",
      "summary": "Tela con Spandex, forro liso y bolsillo interno",
      "description": [
        "Si buscas una chaqueta cómoda, esta es para ti: el forro interno es liso con Spandex, permitiendo que la prenda sea bastante cómoda. La tela principal tiene Spandex, lo que te dará una sensación de comodidad en todo momento.",
        "Molde slim fit que se ajusta perfecto a todo tipo de persona, dándole un look moderno. Puedes usarla para cualquier ocasión."
      ],
      "features": [
        "Bolsillo interno",
        "Tela con Spandex",
        "No motea",
        "Peso 420 g"
      ],
      "colors": [
        {
          "name": "Miel",
          "hex": "#8f5a32",
          "image": 0
        },
        {
          "name": "Negro",
          "hex": "#161616",
          "image": 1
        },
        {
          "name": "Azul",
          "hex": "#25304d",
          "image": 2
        },
        {
          "name": "Gris Claro",
          "hex": "#b9b9b7",
          "image": 3
        },
        {
          "name": "Gris Oscuro",
          "hex": "#3d3e40",
          "image": 4
        },
        {
          "name": "Taupe",
          "hex": "#a58b70",
          "image": 5
        },
        {
          "name": "Beige",
          "hex": "#dcd5c8",
          "image": 6
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "stock": {
        "Miel": {
          "S": true,
          "M": false,
          "L": false,
          "XL": false
        },
        "Negro": {
          "S": true,
          "M": false,
          "L": true,
          "XL": false
        },
        "Azul": {
          "S": true,
          "M": false,
          "L": false,
          "XL": false
        },
        "Gris Claro": {
          "S": true,
          "M": false,
          "L": false,
          "XL": true
        },
        "Gris Oscuro": {
          "S": true,
          "M": false,
          "L": true,
          "XL": false
        },
        "Taupe": {
          "S": true,
          "M": false,
          "L": true,
          "XL": true
        },
        "Beige": {
          "S": false,
          "M": false,
          "L": false,
          "XL": false
        }
      },
      "images": [
        {
          "key": "00",
          "w": 1080,
          "h": 1620,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "01",
          "w": 1767,
          "h": 2650,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        },
        {
          "key": "02",
          "w": 1767,
          "h": 2650,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        },
        {
          "key": "03",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "04",
          "w": 1767,
          "h": 2650,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        },
        {
          "key": "05",
          "w": 1767,
          "h": 2650,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        },
        {
          "key": "06",
          "w": 1767,
          "h": 2650,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        },
        {
          "key": "21",
          "w": 1767,
          "h": 2650,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        },
        {
          "key": "12",
          "w": 1767,
          "h": 2650,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        },
        {
          "key": "08",
          "w": 1058,
          "h": 1328,
          "widths": [
            480,
            800,
            1058
          ],
          "fallback": 800
        },
        {
          "key": "10",
          "w": 1058,
          "h": 1328,
          "widths": [
            480,
            800,
            1058
          ],
          "fallback": 800
        }
      ],
      "mainImage": 0,
      "detailImages": [
        7,
        8,
        9,
        10
      ],
      "sizeChart": {
        "sizes": [
          "S",
          "M",
          "L",
          "XL"
        ],
        "rows": [
          [
            "Ancho",
            47,
            49,
            51,
            54
          ],
          [
            "Largo total",
            64,
            65,
            67,
            67
          ],
          [
            "Largo manga",
            61,
            64,
            66,
            67
          ]
        ]
      },
      "rating": {
        "average": 0,
        "count": 0,
        "fiveStar": 0
      },
      "reviews": [],
      "match": [
        "biker-tipo-cuero-hombre",
        "impermeable-doble-faz",
        "chaqueta-en-pano-hombre",
        "bomber-classic-mujer"
      ],
      "tags": {
        "occasion": [
          "finde",
          "oficina"
        ],
        "fit": [
          "slim"
        ]
      },
      "source": "https://genomacol.com/products/chaquetas-bomber-classic-14157"
    },
    {
      "id": "impermeable-doble-faz",
      "ref": "14169",
      "name": "Chaqueta Impermeable Doble Faz",
      "line": "hombre",
      "category": "impermeables",
      "collection": "Chaquetas para Lluvia",
      "price": 210000,
      "currency": "COP",
      "badge": "Reversible",
      "summary": "Diseño reversible: dos looks en una sola chaqueta",
      "description": [
        "Nuestra chaqueta doble faz para hombre es el complemento perfecto para tu guardarropa de temporada. Con un diseño innovador y versátil, podrás disfrutar de dos looks en uno.",
        "Ofrece un ajuste cómodo y favorecedor, asegurando libertad de movimiento sin sacrificar el estilo. El acolchado de la prenda garantiza una excelente protección contra el frío, mientras que su diseño reversible te permitirá adaptarla a tus diferentes outfits."
      ],
      "features": [
        "Doble faz (reversible)",
        "Acolchada",
        "Ajuste cómodo"
      ],
      "colors": [
        {
          "name": "Negro- Kamel",
          "hex": "#151515",
          "accent": "#c4a27e",
          "image": 0
        },
        {
          "name": "Negro- Verde",
          "hex": "#151515",
          "accent": "#55593a",
          "image": 1
        },
        {
          "name": "Negro- Azul",
          "hex": "#151515",
          "accent": "#24304f",
          "image": 2
        },
        {
          "name": "Verde- Kamel",
          "hex": "#55593a",
          "accent": "#c4a27e",
          "image": 3
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "stock": {
        "Negro- Kamel": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": true
        },
        "Negro- Verde": {
          "S": true,
          "M": false,
          "L": true,
          "XL": false,
          "XXL": true
        },
        "Negro- Azul": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": true
        },
        "Verde- Kamel": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": true
        }
      },
      "images": [
        {
          "key": "00",
          "w": 1058,
          "h": 1328,
          "widths": [
            480,
            800,
            1058
          ],
          "fallback": 800
        },
        {
          "key": "03",
          "w": 1119,
          "h": 1405,
          "widths": [
            480,
            800,
            1119
          ],
          "fallback": 800
        },
        {
          "key": "13",
          "w": 1058,
          "h": 1328,
          "widths": [
            480,
            800,
            1058
          ],
          "fallback": 800
        },
        {
          "key": "06",
          "w": 1058,
          "h": 1328,
          "widths": [
            480,
            800,
            1058
          ],
          "fallback": 800
        },
        {
          "key": "01",
          "w": 1058,
          "h": 1328,
          "widths": [
            480,
            800,
            1058
          ],
          "fallback": 800
        },
        {
          "key": "02",
          "w": 1792,
          "h": 2400,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        },
        {
          "key": "04",
          "w": 1058,
          "h": 1328,
          "widths": [
            480,
            800,
            1058
          ],
          "fallback": 800
        },
        {
          "key": "10",
          "w": 1058,
          "h": 1328,
          "widths": [
            480,
            800,
            1058
          ],
          "fallback": 800
        }
      ],
      "mainImage": 0,
      "detailImages": [
        4,
        5,
        6,
        7
      ],
      "sizeChart": null,
      "rating": {
        "average": 4,
        "count": 4,
        "fiveStar": 3
      },
      "reviews": [
        {
          "author": "Angela Gamboa González",
          "rating": 1,
          "date": "2025-09-18",
          "verified": true,
          "title": "Excelente compra",
          "body": "Excelente servicio y asesoría. Muy rápida la entrega. La chaqueta superó nuestras expectativas."
        },
        {
          "author": "María Isabel Montoya",
          "rating": 5,
          "date": "2025-07-21",
          "verified": true,
          "title": "Chaqueta impermeable",
          "body": "Excelente calidad el color es espectacular"
        },
        {
          "author": "Luis Ríos Henao",
          "rating": 5,
          "date": "2024-10-20",
          "verified": true,
          "title": "Excelente atención",
          "body": "La prenda que pedi llego en perfecto estado, son tal cual como las ves en las imagenes de la pagina, me encanto, la entrega fue muy rapida, excelente calidad."
        }
      ],
      "match": [
        "bomber-classic-hombre",
        "biker-tipo-cuero-hombre",
        "chaqueta-en-pano-hombre",
        "parka-impermeable"
      ],
      "tags": {
        "occasion": [
          "lluvia"
        ],
        "fit": [
          "normal",
          "termica"
        ]
      },
      "source": "https://genomacol.com/products/chaquetas-impermeable-doble-fax-hombre-14169"
    },
    {
      "id": "biker-tipo-cuero-hombre",
      "ref": "11013",
      "name": "Match Biker Tipo Cuero Hombre",
      "line": "hombre",
      "category": "biker",
      "collection": "Match",
      "price": 199900,
      "currency": "COP",
      "badge": "Match",
      "summary": "Efecto cuero con forro interno con Spandex",
      "description": [
        "Las chaquetas efecto cuero son ideales para armar un outfit casual o elegante. Tiene cortes asimétricos que permitirán que se ajuste perfecto a tu figura; el forro interno es liso con Spandex, permitiendo que la prenda sea bastante cómoda."
      ],
      "features": [
        "Efecto cuero",
        "Forro interno con Spandex",
        "Molde slim fit",
        "Bolsillo interno"
      ],
      "colors": [
        {
          "name": "Negro",
          "hex": "#151515",
          "image": 0
        },
        {
          "name": "Azul",
          "hex": "#2a3346",
          "image": 1
        },
        {
          "name": "Brown",
          "hex": "#8a5a37",
          "image": 2
        },
        {
          "name": "Cafe",
          "hex": "#3d2c24",
          "image": 3
        },
        {
          "name": "Gris",
          "hex": "#6d7274",
          "image": 4
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "stock": {
        "Negro": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": true
        },
        "Azul": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": false
        },
        "Brown": {
          "S": true,
          "M": true,
          "L": true,
          "XL": false,
          "XXL": false
        },
        "Cafe": {
          "S": true,
          "M": true,
          "L": false,
          "XL": false,
          "XXL": false
        },
        "Gris": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true,
          "XXL": false
        }
      },
      "images": [
        {
          "key": "01",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "07",
          "w": 1058,
          "h": 1328,
          "widths": [
            480,
            800,
            1058
          ],
          "fallback": 800
        },
        {
          "key": "08",
          "w": 1058,
          "h": 1328,
          "widths": [
            480,
            800,
            1058
          ],
          "fallback": 800
        },
        {
          "key": "09",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "10",
          "w": 1058,
          "h": 1328,
          "widths": [
            480,
            800,
            1058
          ],
          "fallback": 800
        },
        {
          "key": "00",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "02",
          "w": 1080,
          "h": 1623,
          "widths": [
            480,
            800,
            1080
          ],
          "fallback": 800
        },
        {
          "key": "04",
          "w": 4032,
          "h": 3024,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        },
        {
          "key": "05",
          "w": 4032,
          "h": 3024,
          "widths": [
            480,
            800,
            1200
          ],
          "fallback": 800
        }
      ],
      "mainImage": 0,
      "detailImages": [
        5,
        6,
        7,
        8
      ],
      "sizeChart": {
        "sizes": [
          "S",
          "M",
          "L",
          "XL"
        ],
        "rows": [
          [
            "Ancho",
            49,
            51,
            52,
            55
          ],
          [
            "Largo total",
            63,
            65,
            67,
            68
          ],
          [
            "Largo manga",
            64,
            65,
            65,
            68
          ]
        ]
      },
      "rating": {
        "average": 4.63,
        "count": 19,
        "fiveStar": 17
      },
      "reviews": [
        {
          "author": "JOHANA CASTIBLANCO",
          "rating": 5,
          "date": "2026-09-08",
          "verified": true,
          "title": "",
          "body": "La compre para dar un obsequio y a la persona que se la regale, le encanto!"
        },
        {
          "author": "Catalina Flórez Cardozo",
          "rating": 1,
          "date": "2025-12-13",
          "verified": true,
          "title": "",
          "body": "Hermosa chaqueta"
        },
        {
          "author": "Jecika Agudelo",
          "rating": 5,
          "date": "2025-10-01",
          "verified": true,
          "title": "Chaqueta Biker Tipo Cuero Hombre",
          "body": "La adquirí para un obsequio de amor y amistad y a mí pareja le encantó. Excelente calidad como siempre ❤️."
        },
        {
          "author": "stephanie parra",
          "rating": 5,
          "date": "2025-06-14",
          "verified": true,
          "title": "Una marca recomendada",
          "body": "Como siempre es mi mejor opción, recomendada al 1000%"
        },
        {
          "author": "Ana Cristina García Carvajal",
          "rating": 5,
          "date": "2024-07-01",
          "verified": true,
          "title": "No ha llegado",
          "body": "No ha llegado"
        }
      ],
      "match": [
        "biker-tipo-cuero",
        "bomber-classic-hombre",
        "impermeable-doble-faz",
        "chaqueta-en-pano-hombre"
      ],
      "tags": {
        "occasion": [
          "noche"
        ],
        "fit": [
          "slim"
        ]
      },
      "source": "https://genomacol.com/products/chaqueta-efecto-cuero"
    },
    {
      "id": "chaqueta-en-pano-hombre",
      "ref": "14172",
      "name": "Chaqueta Hombre en Paño",
      "line": "hombre",
      "category": "blazers",
      "collection": "Chaquetas Bomber Classic",
      "price": 189900,
      "currency": "COP",
      "badge": "Espina de pescado",
      "summary": "Paño con patrón de espina de pescado",
      "description": [
        "Perfecta para quienes buscan un equilibrio entre estilo tradicional y funcionalidad.",
        "El patrón de espina de pescado añade un toque clásico y cómodo, mientras que el corte cuidadosamente estructurado garantiza un ajuste cómodo y estilizado."
      ],
      "features": [
        "Paño espina de pescado",
        "Corte estructurado"
      ],
      "colors": [
        {
          "name": "Cafe",
          "hex": "#6a4a32",
          "image": 0
        },
        {
          "name": "Gris",
          "hex": "#8a8b8d",
          "image": 1
        }
      ],
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "stock": {
        "Cafe": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true
        },
        "Gris": {
          "S": true,
          "M": true,
          "L": true,
          "XL": true
        }
      },
      "images": [
        {
          "key": "00",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "01",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "02",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "03",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "05",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        },
        {
          "key": "06",
          "w": 800,
          "h": 1200,
          "widths": [
            480,
            800
          ],
          "fallback": 800
        }
      ],
      "mainImage": 0,
      "detailImages": [
        2,
        3,
        4,
        5
      ],
      "sizeChart": null,
      "rating": {
        "average": 0,
        "count": 0,
        "fiveStar": 0
      },
      "reviews": [],
      "match": [
        "bomber-classic-hombre",
        "impermeable-doble-faz",
        "biker-tipo-cuero-hombre",
        "blazer-en-pano"
      ],
      "tags": {
        "occasion": [
          "oficina"
        ],
        "fit": [
          "normal"
        ]
      },
      "source": "https://genomacol.com/products/chaqueta-hombre-pano"
    }
  ];

  var CATEGORIES = {
    impermeables: 'Parkas Impermeables',
    biker: 'Biker Tipo Cuero',
    blazers: 'Blazers & Paño',
    bomber: 'Bomber Classic',
    jean: 'Chaquetas de Jean',
    corta: 'Estilo Versátil'
  };

  function clone(x) { return JSON.parse(JSON.stringify(x)); }
  function byId(id) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i]; return null; }

  // Interfaz asíncrona: hoy resuelve datos locales; mañana puede hacer fetch() a una API.
  var ProductService = {
    getAll: function () { return Promise.resolve(clone(PRODUCTS)); },
    getById: function (id) { var p = byId(id); return Promise.resolve(p ? clone(p) : null); },
    getByIds: function (ids) { return Promise.resolve(ids.map(byId).filter(Boolean).map(clone)); },
    getByLine: function (line) { return Promise.resolve(PRODUCTS.filter(function (p) { return !line || line === 'todas' || p.line === line; }).map(clone)); },
    search: function (q) {
      var n = normalize(q);
      if (!n) return Promise.resolve([]);
      return Promise.resolve(PRODUCTS.filter(function (p) {
        return normalize([p.name, p.collection, p.line, CATEGORIES[p.category], p.colors.map(function (c) { return c.name; }).join(' ')].join(' ')).indexOf(n) > -1;
      }).map(clone));
    }
  };

  function normalize(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim(); }

  G.STORE = STORE;
  G.STORE_REVIEWS = STORE_REVIEWS;
  G.CATEGORIES = CATEGORIES;
  G.ProductService = ProductService;
  G.normalize = normalize;
})(window.GENOMA = window.GENOMA || {});
