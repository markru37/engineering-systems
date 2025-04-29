import { URL } from 'url'
import axios from 'axios'

export default async function (req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`)
  const source = url.searchParams.get('source')

  try {
    const { data } = await axios.get(source)
    res.setHeader('Content-Type', 'application/xml')
    res.end(data)
  } catch (error) {
    console.error(`Error occurred while fetching the ${source} RSS feed:`, error)
    res.statusCode = 500
    res.end(`Error occurred while fetching the ${source} RSS feed.`)
  }
}
