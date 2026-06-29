import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Excelardor | Industrial Engineering & Telescopic Masts',
    short_name: 'Excelardor',
    description: 'Manufacturer and supplier of high-quality telescopic masts, pneumatic masts, military masts, and custom industrial solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#003366',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
