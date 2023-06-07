//npm install express express-handlebars mysql2 sequelize nodemon

const express = require('express')


const app = express()

const conn = require('./db/conn')

//Models
const Task = require('./models/Task')

//Routes
const taskRoutes = require('./routes/tasksRoutes')




//midlewares

app.use(
    express.urlencoded({
        extended:true,
    }),
)

app.use(express.json())



app.use('/tasks', taskRoutes)

app.use('/', taskRoutes)


conn
    .sync()
    .then(() => {
    app.listen(5000)
    console.log('Escutando porta')
}
).catch((err) =>
    console.log(err)
)


