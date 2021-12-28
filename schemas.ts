import { RouteShorthandOptions } from "fastify"

export const opts: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            token: {
              type: 'string'
            },
            id: {
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
        200: {
          type: 'object',
          properties: {
            token: {
              type: 'string'
            },
            id: {
              type: 'array'
            },
          }
        }
      }
    }
  }


  export const optsFilms: RouteShorthandOptions = {
    schema: {
      response: {
        201: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            name: {
              type: 'string'
            },
            img: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            tag: {
              type: 'array'
            },
          }
        }
      }
    }
  }

  export const optsLikes: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            id: {
              type: 'string'
            },
            filmid: {
              type: 'string'
            },
          }
        }
      }
    }
  }

  export const optsEdit: RouteShorthandOptions = {
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
            mobile: {
              type: 'string'
            },
            age: {
              type: 'string'
            }
          }
        }
      }
    }
  }