const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const usuarioRouter = require('./routers/usuario')

const app = express()

app.use( express.json() )
app.use(userRouter)
app.use(taskRouter)
app.use(usuarioRouter)


module.exports = app