const azdo = require('azure-devops-node-api')
//const ejs = require('ejs')
const path = require('path')

// Load config
require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// View engine setup & static content
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
  try {
    const ORG_URL = process.env.AZDO_ORG_URL
    const PROJECT = process.env.AZDO_PROJECT
    const ACCESS_TOKEN = process.env.AZDO_PAT

    const authHandler = azdo.getPersonalAccessTokenHandler(ACCESS_TOKEN)
    const connection = new azdo.WebApi(ORG_URL, authHandler)

    const gitClient = await connection.getGitApi()

    const prs = await gitClient.getPullRequestsByProject(PROJECT, "")

    res.render('report', {
      orgUrl: ORG_URL,
      project: PROJECT,
      prs
    });
  } catch (err) {
    console.error(err)
    res.status(500).send(`ERROR: ${err.toString()}`)
  }
})

app.listen(port, () => {
  console.log(`Azure DevOps Reporter listening at http://localhost:${port}`)
})
