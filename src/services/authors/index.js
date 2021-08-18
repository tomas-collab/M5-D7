import express from 'express'
import { fileURLToPath } from 'url'
import {dirname,join} from 'path'

import uniqid from 'uniqid'
import { postValidation } from './validation.js'
import expresValidator from 'express-validator'

const {validationResult} = expresValidator


const authorsRouter = express.Router()


                                 // post 
authorsRouter.post('/', postValidation,(request,response)=>{
    const errorList = validationResult(request)
    if(!errorList.isEmpty()){
        response.status(400).send(errorList)
    }else{
        console.log(request.body)
        console.log(uniqid())
        //step 1
        const newAuthors = {id:uniqid(),...request.body,createdAt: new Date()}
        //step 2
        const authors = JSON.parse(fs.readFileSync(authorsJSONpath))
        //step 3
        authors.push(newAuthors)
        //step 4
        fs.writeFileSync(authorsJSONpath,JSON.stringify(authors))
        response.status(201).send({id:newAuthors.id})
    }
})
   
                                //get1
authorsRouter.get('/',(request,response)=>{
    const fileContent = fs.readFileSync(authorsJSONpath)
    response.send(JSON.parse(fileContent))
})
                               //get2
authorsRouter.get('/:authorID',(request,response) => {

    const authors = JSON.parse(fs.readFileSync(authorsJSONpath)) 
    const author = authors.find(s => s.id === request.params.authorID)
    response.send(author)
    
})
                               //----------------------------put------------------------------------|
authorsRouter.put('/:authorID',(request,response)=>{
    const authors = JSON.parse(fs.readFileSync(authorsJSONpath))
    const remainingAuthors = authors.filter(author => author.id !== request.params.authorID)
    const updateAuthors = {...request.body,id:request.params.authorID}
    remainingAuthors.push(updateAuthors)
    fs.writeFileSync(authorsJSONpath,JSON.stringify(remainingAuthors))
    response.send(updateAuthors)})
                              //delete
authorsRouter.delete('/:authorID',(request,response)=>{
    const authors = JSON.parse(fs.readFileSync(authorsJSONpath))
    const remainingAuthors = authors.filter(author => author.id !== request.params.authorID)
    fs.writeFileSync(authorsJSONpath,JSON.stringify(remainingAuthors))
    response.status(204).send()})


export default authorsRouter