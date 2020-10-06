const express = require('express')
const azdo = require('azure-devops-node-api')
const router = express.Router()

const ORG_URL = process.env.AZDO_ORG_URL
const PROJECT = process.env.AZDO_PROJECT
const ACCESS_TOKEN = process.env.AZDO_PAT

router.get('/', async (req, res) => {
  res.redirect('/prs')
})

router.get('/prs', async (req, res) => {
  try {
    const authHandler = azdo.getPersonalAccessTokenHandler(ACCESS_TOKEN)
    const connection = new azdo.WebApi(ORG_URL, authHandler)

    const gitClient = await connection.getGitApi()

    const prs = await gitClient.getPullRequestsByProject(PROJECT, "")

    res.render('prs', {
      orgUrl: ORG_URL,
      project: PROJECT,
      prs
    });
  } catch (err) {
    console.error(err)
    res.status(500).send(`ERROR: ${err.toString()}`)
  }
})

module.exports = router