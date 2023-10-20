const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();

// Routes
const vendasRoutes = require('./routes/vendasRoutes'); // Importe as rotas de vendas

app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')

// Middlewares
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(
    express.urlencoded({
        extended:true,
    }),
)
app.use(express.json())

app.use(express.static('public'))

app.use('/vendas', vendasRoutes)

app.use('/', vendasRoutes)

app.listen(3000)
console.log('Escutando porta')