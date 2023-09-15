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

     const exists = await model.patients.findAll({
          attributes: ['name']
     })

     if(exists){
          const allNames = exists.map(item => item.dataValues.name)
          res.json(allNames)
     }
})

let port = process.env.PORT || 3000
app.listen(port, (req, res) => {
    console.log('Servidor Rodando')
})
