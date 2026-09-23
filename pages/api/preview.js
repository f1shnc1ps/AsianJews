export default async function preview(req, res) {
  // const { secret } = req.query
 
  // if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
  //   return res.status(401).json({ message: 'Invalid secret' })
  // }
 
  res.setPreviewData({ 
    maxAge: 60 * 60, // The preview mode cookies expire in 1 hour
    path: '/preview', // The preview mode cookies apply to paths with /preview
  })
 
  const url = `/preview`
  res.setHeader('Content-Type', 'text/html')
  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>
    </html>`
  )
  res.end()
}