import  { FastifyInstance } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import cookie from 'fastify-cookie'
import { opts, optsFilms, optsRegist } from './schemas';
import  { User, TFilm, } from './types';



const fastify= require('fastify')
const server: FastifyInstance = fastify({})
const fs = require('fs');
const { writeFileSync } = require('fs')
const path = './user.json'
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId

const mongoClient = new MongoClient('mongodb://localhost:27017/films',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoClient.db("films");
const collection = db.collection("allFilms");
const likesCollection = db.collection("likes");
const userscollection = db.collection("users")

server.register(cookie)
server.register(require('fastify-cors'), { 
  origin: "*",
  methods: 'GET,PUT,POST,DELETE'
})

server.get('/recFilms', async (req, res) => {
  console.log('get /')
  collection.aggregate([
    { $match: {tag: 'rec'}},
    { $sample: {size: 6}}
  ]).toArray((err: number, result: TFilm) => {
    if (err) throw err;
    console.log(result);
    res.send(result)
})   
})

server.get('/newFilms', async (req, res) => {
  console.log('get /')
  collection.find({tag: 'new'}).toArray((err: number, result: TFilm) => {
    if (err) throw err;
    console.log(result);
    res.send(result)
})   
})

server.get('/horrorFilms', async (req, res) => {
  console.log('get /')
  collection.find({tag: 'horror'}).toArray((err: number, result: TFilm) => {
    if (err) throw err;
    console.log(result);
    res.send(result)
})   
})


server.get('/cartoonFilms', async (req, res) => {
  console.log('get /')
  collection.find({tag: 'cartoon'}).toArray((err: number, result: TFilm) => {
    if (err) throw err;
    console.log(result);
    res.send(result)
})   
})

server.get('/comedyFilms', async (req, res) => {
  console.log('get /')
  collection.find({tag: 'comedy'}).toArray((err: number, result: TFilm) => {
    if (err) throw err;
    console.log(result);
    res.send(result)
})   
})

server.post('/descriptionFilm', async (req, res) => {
  collection.findOne({'$id': ObjectId(req.body)},function(err: number, result: TFilm) {
    if (err) throw err;
    console.log(result);
    res.send(result)
})
})

server.post('/likes', async (req, res) => {
  try {
    likesCollection.insertOne({'$id': ObjectId(req.body)})
    res.status(200)
    console.log('film successfully saved to bd')
    res.send()
  } catch (error) {
    console.log('An error has occurred ', error)
    res.send(error)
  }  
})

server.get('/likedFilms', async (req, res) => {
  likesCollection.find({}).toArray((err: number, result: TFilm) => {
    if (err) throw err;
    console.log(result);
})    
})

server.post('/registration', optsRegist,  async (req, res) => {
  const token = 'hjfkjbjdk' 
  try{
      userscollection.insertOne({
        username: (req.body as User).username,
        email: (req.body as User).email, 
        mobile: (req.body as User).mobile,
        age: (req.body as User).age,
        password: (req.body as User).password
      }) 
      res.send(token).status(200)
  } catch (error) {
    console.log('An error has occurred ', error)
  } 
});

server.post('/login/',  opts,  async (req, res) => {
  const token = 'hfdjodsgdso'
  if (userscollection.find({email: (req.body as User).email})) {  
    res
  .send(token)
  
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