// Lucide-style 24×24 stroke icons. A string is a path `d`; a tuple is [tag, attrs].
type Shape = string | [tag: 'circle' | 'rect', attrs: Record<string, number>];

export const icons = {
  arrow: ['M5 12h14', 'm12 5 7 7-7 7'],
  'chevron-down': ['m6 9 6 6 6-6'],
  'chevron-left': ['m15 18-6-6 6-6'],
  'chevron-right': ['m9 18 6-6-6-6'],
  check: ['M20 6 9 17l-5-5'],
  close: ['M18 6 6 18', 'm6 6 12 12'],
  menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
  download: ['M12 3v12', 'm7 10 5 5 5-5', 'M5 21h14'],
  phone: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z'],
  mail: [['rect', { width: 20, height: 16, x: 2, y: 4, rx: 2 }], 'm22 7-10 5L2 7'],
  box: ['M21 8 12 3 3 8v8l9 5 9-5V8Z', 'M3 8l9 5 9-5', 'M12 13v8', 'M7.5 5.5l9 5'],
  truck: ['M14 18V6H2v12h2', 'M14 9h4l4 4v5h-2', 'M9 18h6', ['circle', { cx: 6.5, cy: 18.5, r: 2 }], ['circle', { cx: 17.5, cy: 18.5, r: 2 }]],
  helmet: ['M2 18h20', 'M4 18v-3a8 8 0 0 1 16 0v3', 'M10 10V5h4v5'],
  gear: [['circle', { cx: 12, cy: 12, r: 3 }], 'M12 2v3', 'M12 19v3', 'M4.9 4.9l2.1 2.1', 'M17 17l2.1 2.1', 'M2 12h3', 'M19 12h3', 'M4.9 19.1 7 17', 'M17 7l2.1-2.1'],
  gem: ['M6 3h12l4 6-10 13L2 9Z', 'M11 3 8 9l4 13 4-13-3-6', 'M2 9h20'],
  layers: ['m12 2 10 5-10 5L2 7Z', 'm2 17 10 5 10-5', 'm2 12 10 5 10-5'],
  users: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', ['circle', { cx: 9, cy: 7, r: 4 }], 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
} satisfies Record<string, Shape[]>;

export type IconName = keyof typeof icons;
