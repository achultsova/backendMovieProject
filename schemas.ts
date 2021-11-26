import { RouteShorthandOptions } from "fastify"

export const opts: RouteShorthandOptions = {
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

export const optsRegist: RouteShorthandOptions = {
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