import JsonLd from '../JsonLd'

export default function WebsiteSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Excelardor',
    url: 'https://excelardor.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://excelardor.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }

  return <JsonLd data={data} />
}
