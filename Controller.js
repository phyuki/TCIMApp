const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const model = require('./models')

let app = express()
app.use(cors())

//Requisições do tipo POST
app.use(bodyParser.urlencoded({ extended: false }))
//Requisições JSON
app.use(bodyParser.json())

//Rotas
app.post('/register', async(req,res) => {

     const [user, created] = await model.User.findOrCreate({
          where: { email: req.body.emailUser },
          defaults: {
               firstName: req.body.firstNameUser,
               lastName: req.body.lastNameUser,
               password: req.body.passwordUser,
          }
     })

     if(created){
          res.send(JSON.stringify('O usuário foi cadastrado com sucesso!'))
     }
})

app.get('/login', async(req,res) => {

     const exists = await model.User.findOne({ where: { 
          email: req.query.emailUser, 
          password: req.query.passwordUser } 
     })

     if(exists){
          res.send(JSON.stringify(exists))
     }
})

app.get('/dass', async(req,res) => {

     const exists = await model.dassQuestions.findOne({ where: { 
          id: req.query.questionId
     }})

     if(exists){
          res.json(exists.dataValues.question)
     }
})

app.get('/patients', async(req,res) => {

     const exists = await model.patients.findAll()

     if(exists){
          const allItems = exists.map(item => item.dataValues)
          res.json(allItems)
     }
})

app.post('/patients', async(req,res) => {

     await model.patients.update(
          {
               name: req.body.name,
               phone: req.body.phone,
               address: req.body.address,
          },
          { where: { id: req.body.id } }
     ).then(result => {
          if(result == 1) res.send(JSON.stringify('O paciente foi atualizado com sucesso!'))
     })

})

let port = process.env.PORT || 3000
app.listen(port, (req, res) => {
    console.log('Servidor Rodando')
})
