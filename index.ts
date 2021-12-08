import  { FastifyInstance } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import cookie from 'fastify-cookie'
import { opts, optsFilms, optsRegist } from './schemas';
import User from './types';


const fastify= require('fastify')
const server: FastifyInstance = fastify({})
const fs = require('fs');
const { writeFileSync } = require('fs')
const path = './user.json'
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient('mongodb://localhost:27017/',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = Type.Object ({
  username: Type.String(),
  email: Type.Optional(Type.String({ format: "email"})),
})

const db = mongoClient.db("films");
const collection = db.collection("allFilms");

server.register(cookie)
server.register(require('fastify-cors'), { 
  origin: "*",
  methods: 'GET,PUT,POST,DELETE'
})

server.get('/movies', async (req, res) => {
  console.log('get /')
  const count = collection.countDocuments();
  res.send(`В коллекции allFilms ${count} документов`)  
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
    await mongoClient.connect()
    server.listen(8080)
    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port
    console.log('uhjfivdefbhv')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  } 
}
start()