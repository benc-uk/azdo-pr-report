import { renderFile, Params } from "https://deno.land/x/dejs@0.8.0/mod.ts"
import { Context } from "https://deno.land/x/oak@v6.3.1/mod.ts"

const VIEW_DIR = `${Deno.cwd()}/views`

export async function render(ctx: Context, template: string, params?: Params) {
  ctx.response.body = await renderFile(
    `${VIEW_DIR}/${template}.ejs`,
    params ? params : {},
  )
}
