import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import { FastifyCookieOptions } from 'fastify-cookie'
import cookie from 'fastify-cookie'
import { type } from 'os';


const fs = require('fs');
const { writeFileSync } = require('fs')
const { readFileSync } = require('fs');




const server: FastifyInstance = fastify({})

const User = Type.Object ({
  username: Type.String(),
  email: Type.Optional(Type.String({ format: "email"})),
})
type UserType = Static <typeof User>;

const app = fastify();

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          email: {
            type: 'string'
          },
          password: {
            type: 'string'
          },
        }
      }
    }
  }
}

const optsRegist: RouteShorthandOptions = {
  schema: {
    response: {
      201: {
        type: 'object',
        properties: {
          username: {
            type: 'string'
          },
          email: {
            type: 'string'
          },
          mobile: {
            type: 'string'
          },
          age: {
            type: 'string'
          },
          password: {
            type: 'string'
          },
        }
      }
    }
  }
}



server.register(cookie); 
server.register(require('fastify-cors'), { 
  origin: "*",
  methods: ["POST"]
})




server.post('/registration', optsRegist,  async (req, res) => {
  const token = 'hjfkjbjdk';
  console.log(req.body)
  const path = './user.json'
  try {
    let data  = fs.readFileSync(path)
    data = JSON.parse(data)
    data.push(req.body)
    writeFileSync(path, JSON.stringify(data), 'utf-8');
    console.log('Data successfully saved to disk');
  } catch (error) {
    console.log('An error has occurred ', error);
  }
  res 
  .status(200)
  .send(token)
});

type User = {
username: string
password: string
}
 
server.post('/login/',  opts,  async (req, res) => {
  const token = 'hjfkjbjdk';
  const userData = readFileSync('./user.json')
  function isUser (user: any) {
    return userData.username === (req.body as User).username && userData.password === (req.body as User).password
  }
  if (userData.find(isUser)) {
    res
  .send(JSON.stringify(token))
  } else {
  res.status(404) 
  }
}); 



const start = async () => {
  try {
    await server.listen(8080)
    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port
    console.log('uhjfivdefbhv')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()