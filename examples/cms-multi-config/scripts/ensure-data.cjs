const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, '..', '.data')
try {
  fs.mkdirSync(dir, { recursive: true })
} catch {}
