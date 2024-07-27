// src/app/fonts.ts
import { Inter } from '@next/font/google';
import localFont from '@next/font/local';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const customFont = localFont({
  src: '../../public/fonts/Super-Pixel.ttf',
  variable: '--pixel-font',
});