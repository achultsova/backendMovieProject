import fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Static, Type } from '@sinclair/typebox'

const fs = require('fs');
const path = require('path')

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
          username: {
            type: 'string'
          },
          email: {
            type: 'string'
          },
          password: {
            type: 'string'
          },
          token: {
            type: 'string'
          }
        }
      }
    }
  }
}

const opts_regist: RouteShorthandOptions = {
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
          password: {
            type: 'string'
          },
          token: {
            type: 'string'
          }
        }
      }
    }
  }
}



server.get('/regist', opts, async (request, reply) => {
  return { username: 'username', email: 'username', password: 'password', token: "token" }
})

server.post('/registration', opts_regist,  async (request, reply) => {
  return request.body });

server.post('/login',  opts,  async (request, reply) => {
  return request.body }); 



const start = async () => {
  try {
    await server.listen(8080)

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port

  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()