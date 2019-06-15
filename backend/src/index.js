const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const env = require('dotenv').config()

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
// Receber e/ou enviar requisições para todos os usuários da aplicação
// Atualizações real-time

mongoose.connect(`mongodb+srv://root:${process.env.PASS_DB}@clustergoweek7-gntn2.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
})

app.use((req, res, next) => {
    req.io = io

    next()
})

app.use(cors())

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(require('./routes'))

server.listen(3333)