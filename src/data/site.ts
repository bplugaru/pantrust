export const contact = {
  phone: '0722 533 688',
  phoneHref: 'tel:0722533688',
  email: 'sales@pantrustromania.ro',
  emailHref: 'mailto:sales@pantrustromania.ro',
  emailAlt: 'pantrustromania@gmail.com',
  emailAltHref: 'mailto:pantrustromania@gmail.com',
  /** WhatsApp number in international format, digits only. */
  whatsapp: '40722533688',
};

/** Link that opens a WhatsApp chat with Pantrust, with the message already typed. */
export const whatsappHref = (message: string) => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

// Legal entity, as stated in the general terms of sale.
export const company = {
  name: 'Pantrust Management SRL',
  address: 'Șos. Arcu 48, Bl. Z8, Sc. B, Et. 1, Ap. 4, Iași, județul Iași',
  cui: 'RO 50626699',
  reg: 'J2024026994002',
};

export type Variant = {
  id: string;
  title: string;
  /** How the variant is named in an offer request: "Doresc o ofertă pentru …". */
  offer: string;
  img: string;
  /** Technical sheet image, as supplied by Pantrust. */
  sheet: string;
  /** Useful widths, mm. */
  widths: number[];
  /** Thermal conductivity λ, W/mK. */
  lambda: number;
  /** Sheet thickness assumed for the weights: [exterior, interior], mm. */
  facings: [number, number];
  /** [thickness mm, weight kg/m², U W/m²K, R m²K/W] */
  rows: [number, number, number, number][];
};

export type Product = {
  id: string;
  img: string;
  /** Cut-out render on a transparent background: shown whole on a light tile instead of cropped to fill. */
  cutout?: boolean;
  category: string;
  title: string;
  short: string;
  text: string;
  intro: string;
  highlights: string[];
  specs: { k: string; v: string }[];
  uses: string[];
  variants?: Variant[];
  colors?: boolean;
  /** Practical notes shown under the specifications. */
  notes?: string[];
  figure?: { img: string; alt: string; caption: string };
};

// Thermal values depend only on core and thickness, so the wall and roof variants share them.
const PUR_U_R: Record<number, [number, number]> = {
  30: [0.71, 1.4], 40: [0.56, 1.78], 50: [0.44, 2.27], 60: [0.37, 2.7], 80: [0.28, 3.57], 100: [0.22, 4.54],
  120: [0.19, 5.26], 150: [0.15, 6.66], 160: [0.14, 7.14], 180: [0.13, 7.79], 200: [0.11, 9.09],
};
const WOOL_U_R: Record<number, [number, number]> = {
  60: [0.68, 1.47], 80: [0.51, 1.96], 100: [0.41, 2.43], 120: [0.34, 2.94], 150: [0.26, 3.84], 200: [0.2, 5],
};
const rows = (table: Record<number, [number, number]>, weights: Record<number, number>, overrides: Record<number, [number, number]> = {}) =>
  Object.entries(weights).map(([mm, kg]): Variant['rows'][number] => [Number(mm), kg, ...(overrides[Number(mm)] ?? table[Number(mm)])]);

export const products: Product[] = [
  {
    id: 'perete', img: 'perete-normala.png', cutout: true, category: 'Panouri sandwich PUR/PIR', title: 'Panouri sandwich perete', short: 'panouri de perete',
    text: 'Soluții eficiente pentru fațade și compartimentări.',
    intro: 'Panouri termoizolante cu miez din spumă poliuretanică PUR/PIR, pentru fațade și compartimentări interioare. Se montează rapid pe structură metalică și oferă izolare termică excelentă, cu un aspect curat al fațadei.',
    highlights: ['Prindere normală sau ascunsă', 'Lățimi utile de 1000, 1100 și 1180 mm', 'Grosimi de la 40 la 200 mm'],
    specs: [{ k: 'Miez izolant', v: 'Spumă poliuretanică PUR / PIR' }, { k: 'Grosimi', v: '40 – 200 mm' }, { k: 'Lățime utilă', v: '1000 / 1100 / 1180 mm' }, { k: 'Conductivitate termică (λ)', v: '0,02 W/mK' }, { k: 'Prindere', v: 'Normală sau ascunsă, cu holșurub autoperforant cu șaibă și garnitură EPDM' }, { k: 'Tablă', v: 'Oțel zincat prevopsit, conform EN 10346, EN 10143 și EN 10169-1' }, { k: 'Microprofilări', v: 'Standard, plissé, lis' }, { k: 'Lungime', v: '2 – 13,5 m standard' }, { k: 'Toleranțe dimensionale', v: 'Conform EN 14509' }],
    notes: [
      'Garnitura de etanșare asigură izolarea termică și etanșeitatea îmbinării dintre panouri.',
      'Panourile mai lungi de 13,5 m (până la 15 m) sau mai scurte de 2 m se execută doar cu consultarea departamentului tehnic.',
      'La livrări suplimentare pot apărea diferențe de nuanță între role diferite de tablă. Recomandăm comandarea unor panouri de rezervă.',
      'Finisaje speciale pentru industria alimentară și spații cu igienă strictă: film de protecție PVC, plastisol, vopsea food-safe sau poliester.',
    ],

    uses: ['Hale industriale', 'Depozite logistice', 'Spații comerciale', 'Compartimentări'],
    colors: true,
    variants: [
      { id: 'prindere-normala', title: 'Prindere normală', offer: 'panouri de perete cu prindere normală', img: 'perete-normala.png', sheet: 'fisa-perete-normala.jpg', widths: [1000, 1100, 1180], lambda: 0.02, facings: [0.5, 0.4],
        rows: rows(PUR_U_R, { 40: 9.23, 50: 9.63, 60: 10.03, 80: 10.83, 100: 11.63, 120: 12.43, 150: 13.63, 160: 14.03, 180: 14.83, 200: 15.63 }) },
      { id: 'prindere-ascunsa', title: 'Prindere ascunsă', offer: 'panouri de perete cu prindere ascunsă', img: 'perete-ascunsa.png', sheet: 'fisa-perete-ascunsa.jpg', widths: [1000, 1100], lambda: 0.02, facings: [0.5, 0.4],
        rows: rows(PUR_U_R, { 40: 9.78, 50: 10.18, 60: 10.58, 80: 11.38, 100: 12.18, 120: 12.98, 150: 14.18, 200: 16.18 }) },
    ],
  },
  {
    id: 'acoperis', img: 'acoperis.png', cutout: true, category: 'Panouri sandwich PUR/PIR', title: 'Panouri sandwich acoperiș', short: 'panouri de acoperiș',
    text: 'Rezistență și izolație pentru orice tip de proiect.',
    intro: 'Panouri cu profil trapezoidal și miez din spumă poliuretanică PUR/PIR, pentru acoperișuri. O singură soluție pentru învelitoare și izolație, cu îmbinare etanșă între panouri.',
    highlights: ['Profil trapezoidal, lățime utilă de 1000 sau 1100 mm', 'Grosimi de la 30 la 200 mm', 'Fixare cu holșurub autoperforant și calotă cu garnitură'],
    specs: [{ k: 'Miez izolant', v: 'Spumă poliuretanică PUR / PIR' }, { k: 'Grosimi', v: '30 – 200 mm' }, { k: 'Lățime utilă', v: '1000 / 1100 mm' }, { k: 'Pas între cute', v: '250 mm (la 1000) / 366,6 mm (la 1100)' }, { k: 'Conductivitate termică (λ)', v: '0,02 W/mK' }, { k: 'Fixare', v: 'Holșurub autoperforant cu șaibă și garnitură EPDM, calotă cu garnitură' }, { k: 'Tablă', v: 'Oțel zincat prevopsit, conform EN 10346, EN 10143 și EN 10169-1' }, { k: 'Lungime', v: '2 – 13,5 m standard' }, { k: 'Toleranțe dimensionale', v: 'Conform EN 14509' }],
    notes: [
      'Garnitura de etanșare asigură izolarea termică și etanșeitatea îmbinării dintre panouri.',
      'Panourile mai lungi de 13,5 m (până la 15 m) sau mai scurte de 2 m se execută doar cu consultarea departamentului tehnic.',
      'La livrări suplimentare pot apărea diferențe de nuanță între role diferite de tablă. Recomandăm comandarea unor panouri de rezervă.',
    ],

    uses: ['Hale de producție', 'Depozite', 'Ferme și spații agricole', 'Clădiri comerciale'],
    colors: true,
    variants: [
      { id: 'date-tehnice', title: 'Panou de acoperiș PUR/PIR', offer: 'panouri de acoperiș', img: 'acoperis.png', sheet: 'fisa-acoperis.jpg', widths: [1000, 1100], lambda: 0.02, facings: [0.5, 0.4],
        rows: rows(PUR_U_R, { 30: 9.38, 40: 9.78, 50: 10.18, 60: 10.58, 80: 11.38, 100: 12.18, 120: 12.98, 150: 14.18, 200: 16.18 }, { 40: [0.54, 1.85] }) },
    ],
  },
  {
    id: 'vata', img: 'vata-perete-normala.png', cutout: true, category: 'Panouri sandwich cu vată minerală', title: 'Panouri cu vată minerală', short: 'panouri cu vată minerală',
    text: 'Protecție sporită pentru cerințe speciale de siguranță.',
    intro: 'Panouri cu miez din vată minerală bazaltică, pentru proiecte cu cerințe ridicate de rezistență la foc și izolare fonică. Disponibile pentru perete, cu prindere normală sau ascunsă, și pentru acoperiș.',
    highlights: ['Pentru perete și acoperiș', 'Prindere normală sau ascunsă la perete', 'Grosimi de la 60 la 200 mm'],
    specs: [{ k: 'Miez izolant', v: 'Plăci de vată minerală bazaltică, cu fibra perpendiculară pe planul plăcii' }, { k: 'Fețe', v: 'Tablă profilată din oțel galvanizat, prevopsită cu vopsea poliesterică, sau din oțel inoxidabil' }, { k: 'Grosimi', v: '60 – 200 mm' }, { k: 'Lățime utilă perete', v: '1000 / 1100 / 1180 mm' }, { k: 'Lățime utilă acoperiș', v: '1000 / 1100 mm' }, { k: 'Conductivitate termică (λ)', v: '0,04 W/mK' }, { k: 'Garanție', v: '5 ani, în condiții normale de exploatare și montaj corect' }],
    notes: [
      'Miezul din vată minerală are calități ignifuge și protejează clădirea pe durata unui incendiu.',
      'Panourile asigură izolație termică, hidrofugă și fonică și nu emană substanțe poluante.',
      'Se folosesc la închiderile și compartimentările clădirilor civile și industriale, inclusiv în industria alimentară, depozite și centre comerciale.',
    ],

    uses: ['Pereți antifoc', 'Industria alimentară', 'Depozite', 'Centre comerciale'],
    colors: true,
    variants: [
      { id: 'perete-prindere-normala', title: 'Perete, prindere normală', offer: 'panouri de perete cu vată minerală, cu prindere normală', img: 'vata-perete-normala.png', sheet: 'fisa-vata-perete-normala.jpg', widths: [1000, 1100, 1180], lambda: 0.04, facings: [0.6, 0.5],
        rows: rows(WOOL_U_R, { 60: 15.72, 80: 17.72, 100: 19.72, 120: 21.72, 150: 24.72, 200: 29.72 }) },
      { id: 'perete-prindere-ascunsa', title: 'Perete, prindere ascunsă', offer: 'panouri de perete cu vată minerală, cu prindere ascunsă', img: 'vata-perete-ascunsa.png', sheet: 'fisa-vata-perete-ascunsa.jpg', widths: [1000, 1100], lambda: 0.04, facings: [0.6, 0.5],
        rows: rows(WOOL_U_R, { 60: 16.11, 80: 18.11, 100: 20.11, 120: 22.11, 150: 25.11, 200: 30.11 }) },
      { id: 'acoperis', title: 'Acoperiș', offer: 'panouri de acoperiș cu vată minerală', img: 'vata-acoperis.png', sheet: 'fisa-vata-acoperis.jpg', widths: [1000, 1100], lambda: 0.04, facings: [0.6, 0.5],
        rows: rows(WOOL_U_R, { 60: 16.49, 80: 18.49, 100: 20.49, 120: 22.49, 150: 25.49, 200: 30.49 }) },
    ],
  },
  {
    id: 'structuri', img: 'structuri.jpg', category: 'Structuri', title: 'Structuri metalice', short: 'structuri metalice',
    text: 'Hale, spații industriale și civile, la standarde înalte.',
    intro: 'Structuri metalice ușoare din profile zincate, pentru hale, depozite, locuințe și anexe, livrate împreună cu închiderile din panouri. Profilele se debitează și se găuresc după proiect, iar îmbinarea se face cu șuruburi, fără sudură.',
    highlights: ['Execuție rapidă, cu profile pregătite după proiect', 'Profile zincate, cu întreținere minimă', 'Fabricate integral în România'],
    specs: [{ k: 'Profile', v: 'Oțel zincat; vopsirea nu este obligatorie' }, { k: 'Prelucrare', v: 'Debitare și găurire la dimensiunile din proiect' }, { k: 'Îmbinare', v: 'Cu șuruburi, fără sudură' }, { k: 'Fundație', v: 'Redusă, datorită greutății mici a profilelor' }, { k: 'Producție', v: 'Profile fabricate integral în România' }],
    uses: ['Hale industriale', 'Depozite', 'Case și mansardări', 'Garaje și parcări', 'Containere', 'Anexe'],
    notes: [
      'Structura se poate demonta și muta în altă locație, cu pierderi minime, pentru că profilele sunt prinse doar în șuruburi.',
      'Profilele se produc exact la lungimile din proiect, deci fără debitări și pierderi de material pe șantier.',
      'Termen scurt de livrare din momentul lansării comenzii în producție.',
    ],
  },
  {
    // Photo: Pawel Czerwinski on Unsplash (unsplash.com/photos/uALiohJZ4xw), Unsplash License.
    id: 'tabla', img: 'tabla.jpg', category: 'Tablă', title: 'Tablă cutată', short: 'tablă cutată',
    text: 'Profile pentru acoperișuri și fațade, diverse finisaje.',
    intro: 'Panouri din tablă cutată de oțel, galvanizată și vopsită electrostatic, pentru acoperișuri și fațade. Se debitează la orice lungime, la cererea beneficiarului.',
    highlights: ['Lățime utilă de 1000 mm', 'Debitare la orice lungime', 'Disponibilă și din aluminiu sau doar galvanizată'],
    specs: [{ k: 'Material', v: 'Tablă de oțel, 0,50 – 0,60 mm' }, { k: 'Profil', v: '4 cute, înălțimea cutei 35 mm' }, { k: 'Lățime utilă', v: '1000 mm' }, { k: 'Lungime', v: 'Orice lungime, la cerere' }, { k: 'Acoperire galvanică', v: '275 g/m² (Z275)' }, { k: 'Vopsire', v: 'Exterior: 5 µ epoxi-primer + 20 µ vopsea poliesterică; interior: 7 – 10 µ epoxi-primer' }, { k: 'Culori standard', v: 'RAL 5010, RAL 9002, RAL 9006' }],
    uses: ['Acoperișuri', 'Fațade'],
    notes: ['Accesoriile (coamă, subcoamă, profile de închidere, profile „Z”) se livrează din același tip de tablă și în aceleași culori.'],
  },
  {
    id: 'accesorii', img: 'accesorii.png', cutout: true, category: 'Accesorii', title: 'Accesorii', short: 'accesorii',
    text: 'Elemente de finisaj și prindere, pentru un montaj complet.',
    intro: 'Tot ce trebuie pentru un montaj complet și etanș: profile de finisaj, elemente pluviale, șuruburi autoforante și garnituri.',
    highlights: ['Același tip de tablă și aceleași culori ca panourile', 'Lungime standard de 2000 mm', 'Profile la comandă, după proiectul tău'],
    specs: [{ k: 'Profile standard', v: 'Coamă, subcoamă, colțar exterior, profile de închidere pentru colțuri, laterale și fronton, profil „Z”' }, { k: 'Pluviale', v: 'Jgheab, burlan pătrat' }, { k: 'Lungime', v: '2000 mm' }, { k: 'Material', v: 'Tablă galvanizată sau galvanizată și vopsită electrostatic, 0,50 – 0,60 mm' }, { k: 'Prindere', v: 'Holșuruburi autoperforante cu șaibă și garnitură EPDM, calote cu garnitură' }, { k: 'La comandă', v: 'Profile după proiectul solicitantului' }],
    uses: ['Finisaje fațadă', 'Coame și dolii', 'Ancadramente', 'Etanșări'],
    figure: { img: 'accesorii-profile.png', alt: 'Secțiuni cotate: coamă, colțar exterior, burlan pătrat, profil „Z”, jgheab și profil închidere fronton', caption: 'Profile standard și dimensiunile lor, în mm.' },
  },
];

// Standard colours from the Pantrust colour card (hex values are screen approximations of the RAL shades).
export const standardColors = [
  ['RAL 9002', '#e7ebda'], ['RAL 9010', '#f7f9ef'], ['RAL 9001', '#fdf4e3'], ['RAL 7016', '#383e42'],
  ['RAL 7035', '#cbd0cc'], ['RAL 7038', '#b0b0a9'], ['RAL 9006', '#a1a1a0'], ['RAL 9007', '#878581'],
  ['RAL 8004', '#8f4e35'], ['RAL 8011', '#5a3a29'], ['RAL 8014', '#49392d'], ['RAL 6011', '#6c7c59'],
  ['RAL 3000', '#a72920'], ['RAL 3009', '#6d342d'], ['RAL 5010', '#004f7c'], ['RAL 6005', '#114232'],
] as const;

export const productHref = (id: string) => `/produse/${id}/`;

export const projectCategories = ['Hale logistice', 'Producție', 'Comercial', 'Agricol'] as const;

export type Project = {
  id: number;
  cat: (typeof projectCategories)[number];
  type: string;
  title: string;
  place: string;
  year: number;
  img: string;
  area: string;
  dur: string;
  prods: string[];
  desc: string;
};

export const projects: Project[] = [
  { id: 1, cat: 'Hale logistice', type: 'Hală logistică', title: 'Centru logistic', place: 'București, Ilfov', year: 2025, img: 'pf1.png', area: '12.400 m²', dur: '5 luni', prods: ['structuri', 'perete', 'acoperis'], desc: 'Centru de distribuție cu 18 rampe de încărcare, structură metalică cu deschidere de 36 m și închideri din panouri PIR.' },
  { id: 2, cat: 'Producție', type: 'Spațiu de producție', title: 'Hală producție', place: 'Iași', year: 2024, img: 'pf2.jpg', area: '6.800 m²', dur: '4 luni', prods: ['perete', 'vata', 'accesorii'], desc: 'Hală de producție cu zonă de birouri, fațadă bicoloră și pereți antifoc din panouri cu vată minerală.' },
  { id: 3, cat: 'Comercial', type: 'Spațiu comercial', title: 'Showroom și depozit', place: 'Cluj-Napoca', year: 2025, img: 'pf3.jpg', area: '3.200 m²', dur: '3 luni', prods: ['structuri', 'perete', 'acoperis'], desc: 'Showroom cu fațadă vitrată generoasă și depozit adiacent, închis cu panouri de perete cu prindere ascunsă.' },
  { id: 4, cat: 'Hale logistice', type: 'Depozit frigorific', title: 'Depozit frigorific', place: 'Constanța', year: 2024, img: 'hero.png', area: '8.100 m²', dur: '5 luni', prods: ['perete', 'acoperis', 'accesorii'], desc: 'Depozit cu camere frigorifice, panouri PIR de 150 mm și etanșare completă pentru menținerea temperaturii.' },
  { id: 5, cat: 'Producție', type: 'Spațiu de producție', title: 'Fabrică componente auto', place: 'Brașov', year: 2023, img: 'pf1.png', area: '9.500 m²', dur: '6 luni', prods: ['structuri', 'vata', 'acoperis'], desc: 'Hală industrială cu pod rulant și compartimentări antifoc între zonele de producție.' },
  { id: 6, cat: 'Agricol', type: 'Clădire agricolă', title: 'Depozit cereale și utilaje', place: 'Timiș', year: 2024, img: 'testi.jpg', area: '2.600 m²', dur: '2 luni', prods: ['structuri', 'tabla'], desc: 'Construcție agricolă cu structură metalică ușoară și închideri din tablă cutată.' },
  { id: 7, cat: 'Comercial', type: 'Spațiu comercial', title: 'Centru comercial de proximitate', place: 'Oradea', year: 2023, img: 'pf3.jpg', area: '4.300 m²', dur: '4 luni', prods: ['perete', 'acoperis', 'accesorii'], desc: 'Clădire comercială cu fațade din panouri de perete în două culori și acoperiș termoizolant.' },
  { id: 8, cat: 'Producție', type: 'Atelier', title: 'Atelier prelucrări metalice', place: 'Pitești', year: 2025, img: 'pf2.jpg', area: '1.900 m²', dur: '2 luni', prods: ['perete', 'acoperis'], desc: 'Atelier cu birouri integrate, închis complet cu panouri sandwich și accesorii de finisaj asortate.' },
  { id: 9, cat: 'Agricol', type: 'Fermă', title: 'Fermă zootehnică', place: 'Suceava', year: 2023, img: 'hero.png', area: '3.700 m²', dur: '3 luni', prods: ['acoperis', 'tabla', 'accesorii'], desc: 'Adăpost pentru animale cu acoperiș din panouri sandwich, pentru confort termic pe tot parcursul anului.' },
];

// Client feedback published on pantrustromania.ro (spelling and diacritics tidied, the third one shortened).
export const quotes = [
  { text: 'Vreau să vă mulțumesc pentru lucrarea efectuată și, nu în ultimul rând, echipei Pantrust, cei care au montat, muncitori de o calitate impecabilă. Sincer, nu mă așteptam la profesionalismul de care ați dat dovadă, dar m-am convins repede. Felicitări, ați mai câștigat un prieten.', who: 'Ganceanu Andrei', role: 'Vaslui' },
  { text: 'Sunt încântată și mulțumită de seriozitatea și profesionalismul de care ați dat dovadă. De asemenea, apreciez atenția voastră asupra detaliilor, capacitatea de a asculta și de a recomanda cea mai bună variantă preț-calitate. Recomand tuturor celor care își doresc lucruri de calitate să apeleze cu încredere la Pantrust!', who: 'SC Debut SRL', role: 'Iași' },
  { text: 'Am aflat de Pantrust de pe internet și, plăcându-mi raportul calitate-preț al lucrărilor văzute pe site, i-am contactat imediat. Mi s-au furnizat relațiile necesare într-o manieră profesionistă și promptă! Recomand oricui să apeleze la serviciile lor fără ezitare.', who: 'SC Conbarlad SA', role: 'Bârlad' },
  { text: 'Destul de ieftini față de alte firme, nu mai zic că au făcut comanda în scurt timp. Foarte comunicativi și respectuoși. Cu siguranță am să mai îndrum pe mulți la această firmă. Se merită!', who: 'SC Rowo SRL', role: 'Târgu Mureș' },
];

export const benefits = [
  { icon: 'box', title: 'Soluții complete', text: 'de la proiect la montaj' },
  { icon: 'truck', title: 'Livrare națională', text: 'oriunde în România' },
  { icon: 'helmet', title: 'Consultanță tehnică', text: 'pentru proiectul tău' },
  { icon: 'gear', title: 'Execuție rapidă', text: 'cu echipe specializate' },
] as const;

export const reasons = [
  { icon: 'gem', title: 'Produse de calitate', text: 'Materiale durabile, performanță în timp' },
  { icon: 'layers', title: 'Soluții personalizate', text: 'Adaptate nevoilor fiecărui proiect' },
  { icon: 'users', title: 'Echipă cu experiență', text: 'Consultanță și suport tehnic dedicat' },
  { icon: 'truck', title: 'Livrare și montaj', text: 'În toată România, prin parteneri specializați' },
] as const;

// Client list published on pantrustromania.ro.
export const clients = {
  iasi: ['Radalex SRL', 'Huge Construct SRL', 'Aquamold SRL', 'DLL Company SRL', 'Vertical SRL', 'Rom Construct SRL', 'Solit Company SRL', 'Isocons SRL', 'Tenko Proiect SRL', 'Ramicons SRL', 'Plus City SRL', 'Almax Cont SRL', 'Debut SRL', 'Akela Utilaje SRL'],
  other: [
    ['Cons Pro SRL', 'Sibiu'], ['Cominco Oltenia SA', 'Vâlcea'], ['Conbarlad SA', 'Bârlad'], ['Bogaxa SRL', 'Brașov'], ['Starconf SRL', 'Hunedoara'],
    ['Vastex SA', 'Vaslui'], ['Romconstructor', 'Bacău'], ['Promixt SA', 'Botoșani'], ['Construct Edil', 'Focșani'], ['Coroma SRL', 'Piatra Neamț'],
    ['Zooagro SA', 'Bacău'], ['Electrosanit SRL', 'Huși'], ['Industrial Montaj SA', 'Ploiești'], ['Instalații SA', 'Bacău'], ['Electrofamar SRL', 'Brașov'],
    ['Rompak SRL', 'Pașcani'], ['Antrecons ID', 'Vaslui'], ['General Construct SA', 'Piatra Neamț'], ['Alco Plus SA', 'Brăila'],
    ['Unicom Wood Production SA', 'Roșiori de Vede'], ['Unicom SA', 'Galați'],
  ],
} as const;

// Typical building types and the products that go into each.
export const solutions = [
  { title: 'Hale industriale și logistice', img: 'pf3.jpg', text: 'Structură metalică și închideri complete din panouri sandwich, pentru depozite, centre logistice și hale de producție.', prods: ['structuri', 'perete', 'acoperis', 'accesorii'] },
  { title: 'Hale de producție și ateliere', img: 'pf2.jpg', text: 'Construcții realizate după cerințele dimensionale și tehnologice ale fluxului tău de producție.', prods: ['structuri', 'perete', 'acoperis'] },
  { title: 'Depozite frigorifice', img: 'cta.jpg', text: 'Închideri cu panouri termoizolante cu spumă poliuretanică sau vată minerală, pentru spații cu temperatură controlată.', prods: ['perete', 'acoperis', 'vata'] },
  { title: 'Construcții agricole și zootehnice', img: 'testi.jpg', text: 'Grajduri, crescătorii, ateliere de reparații și depozite, cu structuri ușoare și învelitori rezistente.', prods: ['structuri', 'acoperis', 'tabla'] },
  { title: 'Birouri și spații comerciale', img: 'hero.png', text: 'Clădiri de birouri și spații comerciale pe structură metalică, cu fațade din panouri cu prindere ascunsă.', prods: ['structuri', 'perete', 'accesorii'] },
  { title: 'Compartimentări și pereți antifoc', img: 'vata-perete-normala.png', cutout: true, text: 'Compartimentări de spații industriale cu panouri termoizolante și panouri cu vată minerală, acolo unde contează comportarea la foc.', prods: ['vata', 'perete'] },
];
