import { Inter, JetBrains_Mono } from 'next/font/google'
 
export const inter = Inter({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-inter',
  display: 'swap'
  // adjustFontFallback: false
})
 
export const jetbrain_mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: '--font-jetbrain-mono',
  display: 'swap',
  adjustFontFallback: false
})