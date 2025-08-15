import express from 'express'

const app = express()
app.use(express.json())

app.post('/generate-summary', async (req, res) => {
  const { text } = req.body || {}
  const summary = typeof text === 'string' ? text.slice(0, 120) : ''
  res.json({ summary })
})

const port = process.env.PORT || 7010
app.listen(port, () => {})
