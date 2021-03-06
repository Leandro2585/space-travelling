import * as prismic from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'

export function getPrismicClient(): prismic.Client {
  const client = prismic.createClient(process.env.PRISMIC_API_ENDPOINT)

  enableAutoPreviews({ client })

  return client
}
