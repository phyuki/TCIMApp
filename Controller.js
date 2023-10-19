const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const model = require('./models')
const { sequelize, Score } = require('./models');

let app = express()
app.use(cors())

//Requisições do tipo POST
app.use(bodyParser.urlencoded({ extended: false }))
//Requisições JSON
app.use(bodyParser.json())

//Rotas
app.post('/register', async(req,res) => {

     const [user, created] = await model.users.findOrCreate({
          where: { email: req.body.emailUser },
          defaults: {
               password: req.body.passwordUser,
               userType: req.body.userType
          }
     })

     if(created)
          res.send(JSON.stringify('O usuário foi cadastrado com sucesso!'))
     else
          res.send(JSON.stringify('Email já cadastrado no sistema'))
})

app.get('/login', async(req,res) => {

     const exists = await model.users.findOne({ where: { 
          email: req.query.emailUser, 
          password: req.query.passwordUser } 
     })

     res.send(JSON.stringify(exists.dataValues.userType))
     
})

app.get('/professional', async(req,res) => {

     const exists = await model.professionals.findOne({ 
          where: { id: req.query.userId } 
     })

     if(exists) {
          res.send(JSON.stringify(exists.dataValues))
     }

})

app.get('/professionals', async(req,res) => {

     const exists = await model.professionals.findOne({ 
          where: { email: req.query.emailUser } 
     })

     if(exists) {
          res.send(JSON.stringify(exists.dataValues.id))
     }
     else { 
          res.send(JSON.stringify(req.query.userId))
     }     
})

app.get('/allProfessionals', async(req,res) => {

     const exists = await model.professionals.findAll()
     if(exists) {
          const allItems = exists.map(item => item.dataValues)
          res.json(allItems)
     }
     
})

app.post('/professionals', async(req,res) => {

     const user = await model.professionals.create({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone
     })

     if(user)
          res.send(JSON.stringify(user))
       
})

app.put('/professionals', async(req,res) => {

     await model.professionals.update(
          {
               firstName: req.body.firstName,
               lastName: req.body.lastName,
               phone: req.body.phone,
               email: req.body.email,
          },
          { where: { id: req.body.id } }
     ).then(result => {
          if(result == 1) res.send(JSON.stringify('Seus dados foram atualizados com sucesso!'))
     })
})

app.get('/professionalByEmail', async(req,res) => {
     const exists = await model.professionals.findOne({ 
          where: { email: req.query.emailUser } 
     })

     if(exists) {
          res.send(JSON.stringify(exists.dataValues))
     }
     else{
          res.send(JSON.stringify(''))
     }
})

app.get('/patientByEmail', async(req,res) => {

     const exists = await model.patients.findOne({ 
          where: { email: req.query.emailUser } 
     })

     if(exists) {
          res.send(JSON.stringify(exists.dataValues))
     } 
     else{
          res.send(JSON.stringify(''))
     }
})

app.get('/patients', async(req,res) => {

     const exists = await model.patients.findAll({ 
          where: { professionalId: req.query.userId } 
     })

     if(exists){
          const allItems = exists.map(item => item.dataValues)
          res.json(allItems)
     }
})

app.put('/patients', async(req,res) => {

     await model.patients.update(
          {
               name: req.body.name,
               phone: req.body.phone,
               address: req.body.address,
               professionalId: req.body.professionalId
          },
          { where: { id: req.body.id } }
     ).then(result => {
          if(result == 1) res.send(JSON.stringify('O paciente foi atualizado com sucesso!'))
     })

})

app.post('/patients', async(req,res) => {
     
     const newPatient = await model.patients.create(
          {
               name: req.body.name,
               phone: req.body.phone,
               email: req.body.email,
               address: req.body.address,
               professionalId: req.body.professionalId
          })
     
     if(newPatient){
          res.send(JSON.stringify(newPatient))
     }
})

app.get('/dass', async(req,res) => {

     const exists = await model.dassQuestions.findAll()

     if(exists){
          const allItems = exists.map(item => item.dataValues.question)
          res.json(allItems)
     }
})

app.post('/dass', async(req,res) => {

     const mysql = require('mysql2/promise');
     const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'scidapp' });     

     const scoreA = req.body.scoreA; 
     const scoreD = req.body.scoreD; 
     const scoreE = req.body.scoreE; 
     const patientId = req.body.patientId; 

     const query = 'INSERT INTO scoresdass (scoreA, scoreD, scoreE, patientId, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())';
     const values = [scoreA, scoreD, scoreE, patientId];

     await connection.execute(query, values);
     await connection.end();

     res.send(JSON.stringify("Success"))

})

let port = process.env.PORT || 3000
app.listen(port, (req, res) => {
    console.log('Servidor Rodando')
})
