import type { APIRoute } from 'astro';
import { company, contact, productHref, products, solutions } from '../data/site';

// Plain-text summary of the site for AI assistants and answer engines (https://llmstxt.org).
export const GET: APIRoute = ({ site }) => {
  const link = (path: string) => new URL(path, site).href;
  const productTitle = (id: string) => products.find((p) => p.id === id)!.title;
  const range = (values: number[]) => `${Math.min(...values)}–${Math.max(...values)} mm`;

  const productLines = products.map((p) => {
    const facts = (p.variants ?? []).map((v) => `${v.title}: lățime utilă ${v.widths.join('/')} mm, grosimi ${range(v.rows.map((r) => r[0]))}, λ ${String(v.lambda).replace('.', ',')} W/mK`);
    return `- [${p.title}](${link(productHref(p.id))}): ${p.intro}${facts.length ? ` Variante — ${facts.join('; ')}.` : ''}`;
  });

  const text = `# Pantrust Romania

> Pantrust furnizează panouri sandwich termoizolante (PUR/PIR și vată minerală), structuri metalice ușoare și accesorii de montaj pentru construcții industriale, cu livrare în toată România. Oferă soluția completă: consultanță, panouri, structură, accesorii și organizarea transportului.

Firma: ${company.name}, Iași, România (CUI ${company.cui}). Limba site-ului: română.
Contact: telefon și WhatsApp ${contact.phone}, email ${contact.email}.
Prețurile nu sunt publicate; ofertele se fac la cerere, pe baza dimensiunilor proiectului.

## Produse

${productLines.join('\n')}

## Soluții pe tip de construcție

${solutions.map((s) => `- ${s.title}: ${s.text} Produse folosite: ${s.prods.map(productTitle).join(', ')}.`).join('\n')}

## Pagini

- [Toate produsele](${link('/produse')}): prezentarea tuturor categoriilor de produse
- [Soluții](${link('/solutii')}): ce include o soluție completă și ce produse se folosesc pe tip de clădire
- [Portofoliu](${link('/portofoliu')}): exemple de proiecte
- [Despre noi](${link('/despre-noi')}): cine este Pantrust și cum se ajunge de la proiect la hală
- [Feedback](${link('/feedback')}): testimoniale și lista de clienți
- [Contact](${link('/contact')}): cerere de ofertă prin WhatsApp, telefon sau email
- [Termeni și condiții](${link('/termeni-si-conditii')}): condițiile generale de vânzare
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
