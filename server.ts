import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { initDB } from './connectDB'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'



const start = async () => {
  try {
    await initDB();
    console.log("connect db successful!!!");
    
  } catch(error) {
    console.log("connect db failed!!!");
    console.log(error)
  }

  const app = next({ dev })
  const handle = app.getRequestHandler()
  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url!, true)
      handle(req, res, parsedUrl)
    }).listen(port)
  
    console.log(
      `> Server listening at http://localhost:${port} as ${
        dev ? 'development' : process.env.NODE_ENV
      }`
    )
  })
}

start();
