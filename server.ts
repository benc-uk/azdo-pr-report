import { Application, send } from 'https://deno.land/x/oak@v6.3.1/mod.ts'
import 'https://deno.land/x/dotenv@v0.5.0/load.ts'
import router from './routes.ts'

const app = new Application()

// App specific routes
app.use(router.routes())

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/public`
  })
})

// Start the app server
const port = parseInt(Deno.env.get('PORT') || '3000')
const address = '0.0.0.0'

console.log(`### Server listening on ${address}:${port}`)
await app.listen({ port: port, hostname: address })
