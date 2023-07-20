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

app.post('/login', async(req,res) => {

     const exists = await model.User.findOne({ where: { 
          email: req.body.emailUser, 
          password: req.body.passwordUser } 
     })

     if(exists){
          res.send(JSON.stringify(exists))
     }
})

let port = process.env.PORT || 3000
app.listen(port, (req, res) => {
    console.log('Servidor Rodando')
})
