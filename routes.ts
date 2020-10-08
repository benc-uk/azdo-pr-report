import { Router } from "https://deno.land/x/oak@v6.3.1/mod.ts"
import { render } from "./lib/helpers.ts"
import { AzDo } from "./lib/azdo.ts"
import { titleCase } from "https://deno.land/x/case@v2.1.0/mod.ts"

const ORG_URL = Deno.env.get('AZDO_ORG_URL') || ""
const PROJECT = Deno.env.get('AZDO_PROJECT') || ""
const ACCESS_TOKEN = Deno.env.get('AZDO_PAT') || ""

const router = new Router()

router.get("/", async (ctx) => {
  ctx.response.redirect('/prs')
})

router.get("/prs/:status?", async (ctx) => {
  const status = ctx.params.status ? ctx.params.status : 'active'

  try {
    const azdo = new AzDo(ORG_URL, ACCESS_TOKEN)
    const prs = await azdo.getPullRequests(PROJECT, status)

    await render(ctx, 'prs', {
      orgUrl: ORG_URL,
      project: PROJECT,
      prs: prs,
      status: titleCase(status)
    })

  } catch (err) {
    console.log(err)
    ctx.response.body = err.toString()
  }
})

export default router
