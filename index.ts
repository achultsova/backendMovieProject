import fastify, { FastifyInstance } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import cookie from 'fastify-cookie'
import { opts, optsRegist } from './schemas';
import User from './types';

const server: FastifyInstance = fastify({})
const fs = require('fs');
const { writeFileSync } = require('fs')
const path = './user.json'

const User = Type.Object ({
  username: Type.String(),
  email: Type.Optional(Type.String({ format: "email"})),
})

server.register(cookie)
server.register(require('fastify-cors'), { 
  origin: "*",
  methods: ["POST"]
})

server.post('/registration', optsRegist,  async (req, res) => {
  const token = 'hjfkjbjdk'
  console.log(req.body)
  try {
    let data  = fs.readFileSync(path)
    data = JSON.parse(data)
    data.push(req.body)
    writeFileSync(path, JSON.stringify(data), 'utf-8')
    console.log('Data successfully saved to disk')
  } catch (error) {
    console.log('An error has occurred ', error)
  }
  res 
  .status(200)
  .send(token)
});

server.post('/login/',  opts,  async (req, res) => {
  const token = 'hfdjodsgdso'
  let data  = fs.readFileSync(path)
  data = JSON.parse(data)
  console.log(data)
  console.log(req.body)
  function isUser (data: User) { 
    return data.username === (req.body as User).username && data.password === (req.body as User).password
  }
  if (data.find(isUser)) {
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