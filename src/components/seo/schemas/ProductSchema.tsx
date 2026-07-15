import JsonLd from '../JsonLd'

interface ProductSchemaProps {
  name: string
  image: string
  description: string
  sku?: string
  mpn?: string
  brand?: string
}

export default function ProductSchema({ name, image, description, sku, mpn, brand = 'Excelardor' }: ProductSchemaProps) {
  const data = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name,
    image,
    description,
    brand: {
      '@type': 'Brand',
      name: brand
    },
    sku: sku || name.toLowerCase().replace(/ /g, '-'),
    mpn: mpn || sku || name.toLowerCase().replace(/ /g, '-'),
    offers: {
      '@type': 'AggregateOffer',
      url: 'https://excelardor.com',
      priceCurrency: 'USD',
      lowPrice: '1000',
      highPrice: '50000',
      offerCount: '1',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '89'
    }
  }

  return <JsonLd data={data} />
}
