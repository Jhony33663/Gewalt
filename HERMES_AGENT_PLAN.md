# GEWALT · Plan de Reestructura + 7 Prompts para Hermes Agent

## Estado actual del proyecto

- Stack actual: sitio estatico HTML + CSS + JavaScript vanilla.
- Paginas principales: `index.html`, `shop.html`, `product_page.html`, `checkout-1.html`, `admin.html`.
- Estilos principales: `assets/css/gewalt.css`.
- Logica de producto/stock/pedido: `assets/js/gewalt-store.js`.
- Dependencia visual actual: mockup con fotos de Unsplash, `localStorage` y estructura heredada de template.

## Objetivo del rediseño

El cliente quiere que GEWALT se sienta mas premium, minimalista y con identidad fuerte desde el primer scroll.

### Cambios clave pedidos por el cliente

1. Hero inicial mucho mas impactante.
2. Foto o video fullscreen ocupando la primera pantalla.
3. Diseno mas limpio, minimalista y con mas aire entre bloques.
4. Tipografias mas elegantes.
5. Animaciones suaves y modernas.
6. Las fotografias deben ser protagonistas.
7. Mucho mas protagonismo para las categorias `T-Shirts`, `Hoodies` y `Long Sleeves`.
8. Textos mas cortos, mas directos y mas de marca.
9. Verde GEWALT como color principal.
10. Negro como color secundario.
11. El verde debe dominar botones, detalles, focos visuales y CTA.
12. La web debe sentirse cuidada, moderna y con una identidad fuerte desde el primer momento.

## Limitaciones y realidad tecnica actual

- No hay framework moderno montado.
- No existe `package.json` ni pipeline de build.
- `gewalt.css` esta minificado/compactado y mezcla estilos propios con overrides del template.
- El home actual (`index.html`) es corto y funcional, pero todavia se siente como mockup.
- El catalogo y el checkout funcionan, asi que conviene preservar la logica y rediseñar la capa visual sin romper el flujo de compra.

## Estrategia recomendada

### Fase 1. Direccion visual y arquitectura

- Auditar el repo actual.
- Extraer patrones visuales del sitio de referencia que quieras emular.
- Definir tokens de marca GEWALT: colores, tipografias, espaciado, bordes, botones, overlays, tratamiento de imagen, ritmo vertical.
- Definir si conviene:
  - mantener `gewalt.css` y anexar una nueva capa, o
  - separar a `assets/css/gewalt-rebrand.css`.

### Fase 2. Home primero

- Rehacer `index.html` como pieza principal de marca.
- Crear hero fullscreen con foto/video dominante.
- Reordenar secciones para que categorias y productos entren antes y con mas impacto.
- Reducir copy y elevar direccion de arte.

### Fase 3. Sistema visual reutilizable

- Unificar botones, cards, headings, spacing, overlays, badges y estados.
- Aplicar el nuevo lenguaje visual a `shop.html`, `product_page.html` y `checkout-1.html`.

### Fase 4. Refinamiento

- Revisar responsive.
- Revisar performance de imagen/video.
- Revisar consistencia visual y microinteracciones.
- Documentar decisiones y pendientes.

## Entregables que deberia producir Hermes

1. Plan tecnico de reestructura visual.
2. Mapa de componentes y secciones a tocar.
3. Propuesta de design tokens GEWALT.
4. Implementacion del nuevo home.
5. Ajustes del catalogo/producto/checkout al nuevo lenguaje visual.
6. Recomendaciones de assets faltantes: fotos, video hero, tipografias, variantes.
7. Checklist final de QA visual y funcional.

## Informacion que conviene pasarle a Hermes antes de correr los prompts

Pegale esto junto al prompt cuando corresponda:

- Ruta del proyecto: `B:\PROYECTOS UGO\Gewalt`
- Stack: HTML + CSS + JS vanilla
- Archivos clave:
  - `index.html`
  - `shop.html`
  - `product_page.html`
  - `checkout-1.html`
  - `assets/css/gewalt.css`
  - `assets/js/gewalt-store.js`
- Objetivo principal: rediseñar fuerte la experiencia visual sin romper flujo de catalogo, stock y pedido por WhatsApp.
- Referencia visual externa: `[PEGAR URL O SCREENSHOTS DEL SITIO REFERENCIA]`

---

## Prompt 1 · El Arquitecto

```text
Actua como un arquitecto frontend senior especializado en rebranding y reestructuras visuales de ecommerce fashion.

Estoy trabajando sobre un proyecto real ya existente en esta ruta:
B:\PROYECTOS UGO\Gewalt

## Stack real
- HTML estatico
- CSS vanilla
- JavaScript vanilla
- Sin framework
- Sin package.json

## Archivos clave que debes inspeccionar
- index.html
- shop.html
- product_page.html
- checkout-1.html
- assets/css/gewalt.css
- assets/js/gewalt-store.js

## Contexto de marca
GEWALT es una marca de ropa con identidad fuerte. El cliente quiere una web mas premium, minimalista, moderna y visualmente impactante.

## Pedido del cliente
- Primera pantalla mucho mas impactante
- Foto o video fullscreen ocupando toda la pantalla
- Diseño mas limpio y minimalista
- Mas espacio entre secciones
- Tipografias mas elegantes
- Animaciones suaves
- Las fotografias deben ser protagonistas
- Mucho mas protagonismo para las categorias T-Shirts, Hoodies y Long Sleeves
- Textos mas cortos y directos
- Verde GEWALT como color principal
- Negro como color secundario
- El verde debe dominar botones, detalles y elementos importantes

## Referencia a emular
[PEGA AQUI LA URL DEL SITIO DE REFERENCIA O DESCRIBE SUS RASGOS]

## Lo que necesito que entregues
1. Auditoria del estado actual del sitio y sus limitaciones tecnicas reales.
2. Plan de reestructura por archivos: que tocar en index.html, shop.html, product_page.html, checkout-1.html y gewalt.css.
3. Nueva arquitectura visual del home en orden de secciones.
4. Sistema de design tokens GEWALT: colores, tipografias, espaciados, radios, sombras, overlays, estilos de botones, ritmo vertical.
5. Lista de componentes reutilizables a crear o normalizar.
6. Decisiones arquitectonicas clave y por que.
7. Riesgos tecnicos y como mitigarlos sin romper el flujo actual de compra por WhatsApp.

## Formato de respuesta
- Responde con secciones claras.
- No me des teoria general.
- Quiero decisiones aplicadas a este repo exacto.
- Si ves que falta material visual, indicame exactamente que assets hacen falta.
```

## Prompt 2 · El Constructor

```text
Actua como un frontend senior especializado en HTML, CSS y JavaScript vanilla para marcas fashion premium.

Quiero que implementes la nueva home de GEWALT directamente sobre este repo:
B:\PROYECTOS UGO\Gewalt

## Archivos principales a modificar
- index.html
- assets/css/gewalt.css
- assets/js/gewalt-store.js solo si hace falta tocar render del home

## Objetivo de esta tarea
Rediseñar la landing principal para que se sienta premium, minimalista y mucho mas impactante, sin romper el resto del sitio.

## Requisitos obligatorios
- Hero fullscreen con imagen o video dominante
- Header limpio y mas editorial
- Textos mucho mas cortos y directos
- Verde GEWALT como color principal y negro como secundario
- Tipografia mas elegante
- Secciones con mucho mas aire
- Categorias T-Shirts, Hoodies y Long Sleeves con gran protagonismo visual
- Fotografias protagonistas
- CTA claros y modernos
- Animaciones suaves de entrada, hover y scroll
- Mantener compatibilidad responsive desktop + mobile

## Importante
- Conserva el flujo actual de catalogo y compra.
- No conviertas el proyecto a React, Next o algun framework.
- No metas librerias innecesarias.
- Si necesitas crear nuevos bloques CSS, prioriza una capa clara y ordenada.

## Entrega
1. Codigo final por archivo.
2. Explicacion breve de por que moviste cada seccion.
3. Si agregas nuevos assets esperados, deja placeholders claros.
4. Al final incluye una mini guia: como validar visualmente el home.

## Contexto extra
Si la referencia visual tiene una grilla, ritmo, tratamiento de imagen o estilo de hero especifico, adaptalo a GEWALT sin perder identidad propia.
```

## Prompt 3 · El Detective

```text
Actua como un debugger experto en sitios estaticos con HTML, CSS y JavaScript vanilla.

Estoy trabajando en este repo:
B:\PROYECTOS UGO\Gewalt

## Contexto
Se hizo una reestructura visual fuerte del sitio GEWALT. Necesito que detectes cualquier regresion visual o funcional causada por el rediseño.

## Archivos a revisar
- index.html
- shop.html
- product_page.html
- checkout-1.html
- assets/css/gewalt.css
- assets/js/gewalt-store.js

## Quiero que inspecciones estos problemas potenciales
- Hero fullscreen roto o con mala altura en mobile
- Texto ilegible sobre imagen o video
- Navegacion sticky que tape contenido
- Categorias con mala jerarquia visual
- Botones verdes con poco contraste
- Espaciados inconsistentes entre secciones
- Cards de producto deformadas por nuevas reglas CSS
- Flujo de producto > checkout > WhatsApp roto
- Layout shifts o elementos superpuestos en responsive

## Proceso exacto de respuesta
1. Lista de 5 a 10 hipotesis de fallo, ordenadas por probabilidad e impacto.
2. Analisis por archivo con referencias concretas.
3. Causa raiz de cada problema detectado.
4. Solucion exacta por archivo, con codigo corregido.
5. Checklist de prevencion para que no se repita en siguientes iteraciones.

## Regla
No quiero respuestas vagas. Quiero diagnostico aplicado al repo exacto.
```

## Prompt 4 · El Critico

```text
Actua como un code reviewer senior con foco en frontend premium, UX visual, mantenibilidad y coherencia de marca.

Estoy rediseñando este proyecto:
B:\PROYECTOS UGO\Gewalt

## Stack
- HTML
- CSS
- JS vanilla

## Objetivo del review
Revisar si la nueva implementacion realmente transmite una identidad fuerte de GEWALT y si el codigo quedo mantenible.

## Quiero que analices estas dimensiones
1. Fidelidad al pedido del cliente.
2. Fuerza del hero y primera impresion.
3. Protagonismo real de T-Shirts, Hoodies y Long Sleeves.
4. Calidad del sistema visual: color, tipografia, espaciado, contrastes, ritmo.
5. Calidad de UX: CTAs, jerarquia, lectura, escaneabilidad.
6. Calidad tecnica: CSS duplicado, selectores fragiles, HTML poco semantico, dependencias innecesarias.
7. Riesgo de regresion en catalogo, producto y checkout.

## Formato de respuesta
Para cada hallazgo:
- Severidad: alta / media / baja
- Archivo afectado
- Problema exacto
- Por que importa
- Solucion sugerida

## Cierre obligatorio
- Puntuacion global del rediseño de 1 a 10
- 3 cambios de mayor impacto si solo pudieras tocar 3 cosas
- Veredicto final: listo para presentar / necesita otra iteracion
```

## Prompt 5 · El Optimizador

```text
Actua como un ingeniero frontend senior especializado en refactoring de CSS legacy y performance visual.

Proyecto:
B:\PROYECTOS UGO\Gewalt

## Contexto
El sitio GEWALT mezcla estilos heredados del template con estilos propios. Quiero que lo refactorices para dejar una base mas limpia, escalable y facil de seguir para futuras iteraciones del branding.

## Objetivos
- Reducir fragilidad del CSS
- Separar mejor estilos de marca vs overrides del template
- Mejorar consistencia de spacing, botones, headings, grids y cards
- Bajar duplicacion
- Evitar que pequenos cambios rompan otras paginas

## Archivos foco
- assets/css/gewalt.css
- index.html
- shop.html
- product_page.html
- checkout-1.html

## Entrega obligatoria
1. Propuesta de refactor por capas o secciones.
2. Antes y despues de los bloques mas importantes.
3. Tabla: que cambie | por que | impacto esperado.
4. Recomendacion de naming y estructura para futuras clases GEWALT.
5. Lista de quick wins para performance visual: imagenes, video hero, sombras, animaciones, fuentes.

## Restricciones
- No cambies el comportamiento externo del flujo de compra.
- No metas build tools si no son indispensables.
- Si recomiendas crear un archivo CSS nuevo, justifica exactamente por que.
```

## Prompt 6 · El Escudo

```text
Actua como un QA senior especializado en testing manual asistido para sitios estaticos ecommerce.

Estoy trabajando en:
B:\PROYECTOS UGO\Gewalt

## Contexto
No hay suite automatizada robusta. Necesito una bateria de pruebas manuales y tecnicas para validar el rediseño de GEWALT sin romper el negocio.

## Quiero que generes un plan de testing completo para estas paginas
- index.html
- shop.html
- product_page.html
- checkout-1.html
- admin.html

## Cubre estas categorias
1. Happy path del usuario desde home hasta pedido por WhatsApp.
2. Responsive en mobile, tablet y desktop.
3. Jerarquia visual y legibilidad sobre imagen/video.
4. Estados hover, focus y active en botones y links.
5. Persistencia de localStorage para productos, favoritos y pedido.
6. Validaciones del checkout.
7. Riesgos por falta de stock.
8. Regresiones del admin mock.
9. Performance visual basica: LCP percibido, peso de hero media, saltos de layout.

## Formato de entrega
- Checklist por pagina.
- Casos de prueba paso a paso.
- Resultado esperado por caso.
- Priorizacion: critica / alta / media / baja.
- Lista final de bugs probables a vigilar.
```

## Prompt 7 · El Narrador

```text
Actua como un technical writer senior enfocado en handoff de proyectos frontend para clientes y equipos creativos.

Proyecto:
B:\PROYECTOS UGO\Gewalt

## Objetivo
Necesito documentar la reestructura visual de GEWALT para que cualquier persona del equipo entienda:
- que se cambio
- por que se cambio
- donde vive cada parte
- como seguir iterando sin romper la identidad

## Archivos a considerar
- index.html
- shop.html
- product_page.html
- checkout-1.html
- admin.html
- assets/css/gewalt.css
- assets/js/gewalt-store.js

## Genera
1. Un README de rebrand tecnico.
2. Un resumen ejecutivo corto para cliente no tecnico.
3. Un mapa de archivos con responsabilidades.
4. Un mini design system GEWALT: colores, tipografias, botones, espaciado, uso de imagenes.
5. Una lista de assets pendientes recomendados: hero video, fotos por categoria, tipografia, favicon, etc.
6. Una seccion de proximos pasos priorizados.

## Tono
Directo, tecnico y util. Nada de relleno.
```

---

## Orden recomendado para correrlos en Hermes

1. Prompt 1 · El Arquitecto
2. Prompt 2 · El Constructor
3. Prompt 4 · El Critico
4. Prompt 3 · El Detective
5. Prompt 5 · El Optimizador
6. Prompt 6 · El Escudo
7. Prompt 7 · El Narrador

## Sugerencia practica

Si me pasas la URL del sitio que quieren emular o screenshots del referente, el siguiente paso ideal es que te arme una segunda version de este archivo con prompts todavia mas cerrados:

- extraccion de layout
- extraccion de sistema tipografico
- extraccion de ritmo visual
- extraccion de paleta
- mapeo exacto referencia -> GEWALT
- lista de assets a producir o reemplazar
