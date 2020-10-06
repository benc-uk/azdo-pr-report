const express = require('express')
const path = require('path')
const octicons = require('@primer/octicons')

// Load config
require('dotenv').config()

// Basic Express app
const app = express()
const port = process.env.PORT || 3000

// View engine setup & static content
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

// Make icons available to all views
app.locals = {
  icons: octicons
}

// Routes & controllers
app.use('/', require('./routes'))

// Start server
app.listen(port, () => {
  console.log(`Azure DevOps Reporter listening at http://localhost:${port}`)
})
