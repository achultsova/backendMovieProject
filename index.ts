import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import { FastifyCookieOptions } from 'fastify-cookie'
import cookie from 'fastify-cookie'


const fs = require('fs');
const path = require('path')

const jwt = require('jsonwebtoken')
const jwtSecret = 'secret123';

const server: FastifyInstance = fastify({})

const User = Type.Object ({
  username: Type.String(),
  email: Type.Optional(Type.String({ format: "email"})),
})
type UserType = Static <typeof User>;

const app = fastify();

app.post<{ Body: UserType; Reply: UserType}>(
  "/",
  {
    schema: {
      body: User,
      response: {
        200: User,
      },
    }, 
  },
  (req, rep) => {
    const { body: user } = req;
  }
)

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
  // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res
  .setCookie('token', 'utfyuoflgyiul', {
    path: '/',
    signed: true
  })  
  .status(200)
  .send(token)
});

 
server.post('/login/',  opts,  async (req, res) => {
  const token = 'hjfkjbjdk';

  res
  .setCookie('token', 'utfyuoflgyiul', {
    path: '/',
    signed: true
  })  
  .status(200)
  .send(token)
  console.log(res)
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