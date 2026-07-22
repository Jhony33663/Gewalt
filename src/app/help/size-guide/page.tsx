import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guía de Tallas',
  description: 'Encuentra tu talla perfecta — GEWALT streetwear.',
};

export default function SizeGuidePage() {
  return (
    <div className="max-w-site mx-auto px-4 lg:px-8 py-16 lg:py-32">
      <h1 className="font-display text-4xl md:text-5xl uppercase tracking-wider mb-12">Guía de Tallas</h1>
      <div className="max-w-2xl">
        <p className="text-gewalt-text-muted mb-8">
          Nuestras prendas tienen un fit oversized. Si prefieres algo más ajustado, elige una talla menos.
        </p>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gewalt-border">
              <th className="text-left py-3 font-display uppercase tracking-wider">Talla</th>
              <th className="text-left py-3 font-display uppercase tracking-wider">Pecho (cm)</th>
              <th className="text-left py-3 font-display uppercase tracking-wider">Largo (cm)</th>
            </tr>
          </thead>
          <tbody className="text-gewalt-text-muted">
            <tr className="border-b border-gewalt-border"><td className="py-3">S</td><td>100</td><td>68</td></tr>
            <tr className="border-b border-gewalt-border"><td className="py-3">M</td><td>106</td><td>72</td></tr>
            <tr className="border-b border-gewalt-border"><td className="py-3">L</td><td>112</td><td>74</td></tr>
            <tr className="border-b border-gewalt-border"><td className="py-3">XL</td><td>118</td><td>76</td></tr>
            <tr><td className="py-3">XXL</td><td>124</td><td>78</td></tr>
          </tbody>
        </table>
        <p className="text-gewalt-text-muted text-xs mt-6">
          * Medidas aproximadas. Pueden variar ±2cm según la prenda.
        </p>
      </div>
    </div>
  );
}
