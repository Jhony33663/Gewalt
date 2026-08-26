import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NUESTRA HISTORIA',
  description: 'La historia de GEWALT — streetwear con actitud.',
};

export default function AboutPage() {
  return (
    <div className="max-w-site mx-auto px-4 lg:px-8 py-16 lg:py-32">
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider mb-12">
        NUESTRA HISTORIA
      </h1>
      <div className="max-w-2xl space-y-8 text-gewalt-text-muted text-lg leading-relaxed">
        <p>
          La verdad es que GEWALT no empezó como una marca.
        </p>
        <p>
          Empezó porque <em>no encontraba ropa que me gustara</em>.
        </p>
        <p>
          Siempre veía prendas y pensaba que ninguna era realmente lo que quería usar. Así que empecé a hacer mi propia ropa. Al principio era solo para mí, sin pensar en venderla ni en crear una marca.
        </p>
        <p>
          Hasta que la gente empezó a preguntarme:
        </p>
        <p>
          <em>&ldquo;¿Qué marca es?&rdquo;</em><br />
          <em>&ldquo;¿Dónde la compraste?&rdquo;</em><br />
          <em>&ldquo;Está muy chevere, ¿dónde consigo una?&rdquo;</em>
        </p>
        <p>
          Y ahí se me prendió algo.
        </p>
        <p>
          Pensé: ¿y si hago mi propia marca?
        </p>
        <p>
          Tenía 17 años y realmente no sabía todo lo que implicaba. Pero igual decidí hacerlo.
        </p>
        <p>
          Yo puse el nombre.<br />
          Yo hice el logo.<br />
          Yo empecé a diseñar las prendas.<br />
          Yo busqué cómo hacerlas realidad.
        </p>
        <p>
          Los primeros meses fueron bastante complicados. Probamos proveedores, descartamos diseños, hicimos otros desde cero y tuvimos que conseguir toda la plata para poder producir.
        </p>
        <p>
          Pero lo más difícil no fue hacer la ropa.
        </p>
        <p>
          <em>Fue venderla.</em>
        </p>
        <p>
          Conseguir las primeras ventas y después lograr que no fueran solo unas pocas, sino que la gente realmente quisiera volver a comprar GEWALT.
        </p>
        <p>
          Hasta que llegó nuestro primer sold out.
        </p>
        <p>
          Ahí entendí que esto podía ser algo más que ropa que yo quería usar.
        </p>
        <p>
          Para el segundo drop ya no podía hacer todo solo, así que se unió un amigo y empezamos a construir GEWALT juntos.
        </p>
        <p>
          Todavía estamos aprendiendo. Todavía nos equivocamos. Todavía tenemos muchísimo por hacer.
        </p>
        <p>
          Pero hay algo que no ha cambiado desde el primer día:
        </p>
        <p>
          <em>GEWALT nació porque quería ponerme algo que realmente me gustara.</em>
        </p>
        <p>
          Y eso es lo que quiero que sientas cuando te pongas una prenda nuestra.
        </p>
        <p>
          Que estés cómodo.<br />
          Que te quede bien.<br />
          Que te sientas guapo.<br />
          Y sobre todo, que sientas que esa prenda es para ti.
        </p>
        <p>
          Esto empezó conmigo haciendo ropa para mí.
        </p>
        <p>
          Ahora quiero ver hasta dónde podemos llevarlo.
        </p>
        <p className="font-display text-gewalt-text uppercase tracking-wider">
          ESTO ES GEWALT.
        </p>
      </div>
    </div>
  );
}
