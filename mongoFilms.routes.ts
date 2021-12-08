import { FastifyInstance } from "fastify"

const { listFilms, getFilmRec } = require ('./films.controller')


const route: FastifyInstance = require('fastify')

route.get('/films', listFilms)
route.get('/get', getFilmRec)


module.exports = route

