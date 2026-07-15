import JsonLd from '../JsonLd'

export default function LocalBusinessSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Excelardor',
    image: 'https://excelardor.com/office.jpg',
    '@id': 'https://excelardor.com',
    url: 'https://excelardor.com',
    telephone: '+91-1234567890',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Industrial Area',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500001',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 17.385044,
      longitude: 78.486671
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      opens: '09:00',
      closes: '18:00'
    },
    sameAs: [
      'https://www.linkedin.com/company/excelardor',
      'https://twitter.com/excelardor',
      'https://www.facebook.com/excelardor'
    ]
  }

  return <JsonLd data={data} />
}
