import  { FastifyInstance } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import cookie from 'fastify-cookie'
import { opts, optsFilms, optsRegist } from './schemas';
import  { User, TFilm, likes } from './types';



const fastify= require('fastify')
const server: FastifyInstance = fastify({})
const fs = require('fs');
const { writeFileSync } = require('fs')
const path = './user.json'
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId

const mongoClient = new MongoClient('mongodb+srv://achultsova:Anastas23@cluster0.348oq.mongodb.net/test',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoClient.db("MovieProject");
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
  collection.findOne({'_id': ObjectId(req.body)},function(err: number, result: TFilm) {
    if (err) throw err;
    console.log(result);
    res.send(result)
})
})

server.post('/likes', async (req, res) => {
  try {
    console.log((req.body as likes).id)
    console.log((req.body as likes).filmid)
    userscollection.updateOne({_id: (req.body as likes).id}, 
    {$set: {
      likedFilms: [
        {id: (req.body as likes).filmid}
      ]
    }
  })
    res.status(200)
    console.log('film successfully saved to bd')
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
  let user = await userscollection.findOne({username: (req.body as User).username})
  if(user) {
    return res.status(400)
  } else {
    userscollection.insertOne({
      username: (req.body as User).username,
      email: (req.body as User).email, 
      mobile: (req.body as User).mobile,
      age: (req.body as User).age,
      password: (req.body as User).password
    }) 
    let userid = await userscollection.distinct("_id", {username: (req.body as User).username})
      let data = {
        "token": token,
        "id": userid
      }
      res.send(data)
      console.log(data)  
  }      
});

server.post('/login',  opts,  async (req, res) => {
  const token = 'hfdjodsgdso'
  let user = await userscollection.findOne({username: (req.body as User).username})
  console.log(user)
  if(user) {
    let loginid = await userscollection.distinct("_id", {username: (req.body as User).username})
    let data = {
      "token": token,
      "id": loginid
    }
    res.send(data)
    console.log(data) 
  } else {
    return res.status(404)
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