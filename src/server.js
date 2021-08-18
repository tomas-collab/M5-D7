import express from 'express'
import cors from 'cors'
import listEndPoints from 'express-list-endpoints'
import authorsRouter from './services/authors/index.js'
import fileRouter from './services/files/index.js'
import { notFoundErrorHandler, forbiddenErrorHandler, badRequestErrorHandler, genericServerErrorHandler } from "./errorHandlers.js"

const server = express()
const port = 3000

//global middleware
server.use(cors())
server.use(express.json())

//Routes
server.use('/authors', authorsRouter)
server.use('/files',fileRouter)

// error middleware
server.use(notFoundErrorHandler)
server.use(badRequestErrorHandler)
server.use(forbiddenErrorHandler)
server.use(genericServerErrorHandler)

console.table(listEndPoints(server))
server.listen(port,()=>{
    console.log('server listening on port ' + port)
})