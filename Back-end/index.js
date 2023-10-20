const express = require('express');
const app = express();
const conn = require('./db/conn');


// Models
const Venda = require('./models/Venda'); // Importe o modelo "Venda"

// Routes
const vendasRoutes = require('./routes/VendasRoutes'); // Importe as rotas de vendas

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use as rotas de vendas no caminho '/vendas'
app.use('/vendas', vendasRoutes);

conn.sync()
    .then(() => {
        app.listen(5000);
        console.log('Escutando na porta 5000');
    })
    .catch((err) => {
        console.error(err);
    });
