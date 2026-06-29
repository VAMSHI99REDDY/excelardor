import JsonLd from '../JsonLd'

export default function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Excelardor',
    url: 'https://excelardor.com',
    logo: 'https://excelardor.com/logo.png',
    description: 'Global manufacturer and supplier of telescopic masts, pneumatic masts, military masts, and industrial engineering solutions.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      addressCountry: 'India'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-1234567890',
      contactType: 'customer service',
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'Hindi']
    },
    sameAs: [
      'https://www.linkedin.com/company/excelardor',
      'https://twitter.com/excelardor',
      'https://www.youtube.com/c/excelardor'
    ]
  }

  return <JsonLd data={data} />
}
