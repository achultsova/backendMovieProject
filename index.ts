import  { FastifyInstance } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import cookie from 'fastify-cookie'
import { opts, optsEdit, optsFilms, optsLikes, optsRegist } from './schemas';
import  { UserRegist, UserLogin, UserEdit, TFilm, TId, likes } from './types';



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

const db = mongoClient.db("MovieProject")
const collection = db.collection("allFilms")
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
    if (err) throw err
    res.send(result)
})   
})

server.get('/newFilms', async (req, res) => {
  console.log('get /')
  collection.find({tag: 'new'}).toArray((err: number, result: TFilm) => {
    if (err) throw err
    res.send(result)
})   
})

server.get('/horrorFilms', async (req, res) => {
  console.log('get /')
  collection.find({tag: 'horror'}).toArray((err: number, result: TFilm) => {
    if (err) throw err
    res.send(result)
})   
})


server.get('/cartoonFilms', async (req, res) => {
  console.log('get /')
  collection.find({tag: 'cartoon'}).toArray((err: number, result: TFilm) => {
    if (err) throw err
    res.send(result)
})   
})

server.get('/comedyFilms', async (req, res) => {
  console.log('get /')
  collection.find({tag: 'comedy'}).toArray((err: number, result: TFilm) => {
    if (err) throw err
    res.send(result)
})   
})

server.post('/descriptionFilm', async (req, res) => {
  collection.findOne({'_id': ObjectId(req.body)},function(err: number, result: TFilm) {
    if (err) throw err
    res.send(result)
})
})

server.post('/likes', optsLikes, async (req, res) => {
  console.log(req.body)
 try {   
  const filmList = await userscollection.findOne({likedfilms: (req.body as likes).filmid}, {projection:{likedfilms: true}})
    console.log(filmList)
    if (filmList) {
      res.status(404)
    }  else if (filmList === null) {
    await userscollection.updateOne(
        {"_id": ObjectId(req.body as likes).id}, 
        {$push: { "likedfilms": {id: (req.body as likes).filmid }}}
        )
      res.status(200)
    } 
  }
  catch (err) {
      console.log(`Something went wrong: ${err}`)
    }
})

server.post('/userInfo', optsEdit, async (req, res) => {
  const userInfo = await userscollection.findOne({_id: ObjectId(req.body as UserEdit).id}, {projection: {username: true, email: true, mobile: true, age: true}})
  console.log(userInfo)
  res.send(userInfo)
})

server.post('/watchedFilms', optsFilms, async (req, res) => {
  try {
    const watchedFilms: string []  = req.body as string []
    const result = await watchedFilms.map(item => collection.find({_id: ObjectId(item)}).toArray())
    console.log(result)
    res.send(result)
  } catch (err) {
    console.log(`Something went wrong: ${err}`)
  }  
})

server.post('/editAccount', optsEdit, async(req, res) => {
  console.log(req.body)


    // if ((req.body as UserEdit).username === null ) {
    //   userscollection.updateOne({"_id": ObjectId(req.body as UserEdit).id}, 
    //   {$set: {"username": (req.body as UserEdit).username}}, function(err: number) {
    //     if (err) throw err 
    //     res.status(200)
    //   })
    // }
    // if ((req.body as UserEdit).email === null ) {
    //   userscollection.updateOne({"_id": ObjectId(req.body as UserEdit).id}, 
    //   {$set: {"email": (req.body as UserEdit).email}}, function(err: number) {
    //     if (err) throw err 
    //     res.status(200)
    //   })
    // }
    // if ((req.body as UserEdit).mobile === null ) {
    //   userscollection.updateOne({"_id": ObjectId(req.body as UserEdit).id}, 
    //   {$set: {"mobile": (req.body as UserEdit).mobile}}, function(err: number) {
    //     if (err) throw err 
    //     res.status(200)
    //   })
    // }
    // if ((req.body as UserEdit).age === null ) {
      
    // } else {
    //   userscollection.updateOne({"_id": ObjectId(req.body as UserEdit).id}, 
    //   {$set: {"age": (req.body as UserEdit).age}}, function(err: number) {
    //     if (err) throw err 
    //     res.status(200)
    //   })
    // }
    // const user = await userscollection.findOne({'_id': ObjectId(req.body as UserEdit).id}) 
    // res.send(user)
})

server.post('/registration', optsRegist,  async (req, res) => {
  const token = 'hjfkjbjdk' 
  const user = await userscollection.findOne({username: (req.body as UserRegist).username})
  if(user) {
    res.status(400)
  } else {
    userscollection.insertOne({
      username: (req.body as UserRegist).username,
      email: (req.body as UserRegist).email, 
      mobile: (req.body as UserRegist).mobile,
      age: (req.body as UserRegist).age,
      password: (req.body as UserRegist).password,
      likedfilms: []
    }) 
    userscollection.distinct("_id", {username: (req.body as UserRegist).username}).then(function(userid: TId) {
      console.log(userid)
      const data = {
        "token": token,
        "id": userid
      }
      res.send(data) 
    })    
  }              
});

server.post('/login',  opts,  async (req, res) => {
  const token = 'hfdjodsgdso'
  let user = await userscollection.findOne({username: (req.body as UserLogin).username}, {projection:{_id: true}})
  console.log(user)
  if(user) {
    let data = {
      "token": token,
      "id": user._id
    }
    console.log(data)
    res.send(data)  
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