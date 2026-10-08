import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/*.{png,jpg,jpeg,webp}', { eager: true });

/** Image in src/assets by file name, or undefined when it has not been added yet. */
export const asset = (name: string): ImageMetadata | undefined => files[`../assets/${name}`]?.default;
