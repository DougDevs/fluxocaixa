const express = require('express');
const router = express.Router();
const VendaController = require('../controllers/VendaController'); // Importe o controlador "VendaController"

router.get('/add', VendaController.createVenda); // Rota para exibir o formulário de criação de uma nova venda
router.post('/add', VendaController.createVendaSave); // Rota para criar uma nova venda
router.get('/', VendaController.listVendas); // Rota para listar todas as vendas
router.get('/edit/:id', VendaController.updateVenda); // Rota para exibir o formulário de edição de uma venda específica
router.post('/edit', VendaController.updateVendaPost); // Rota para atualizar uma venda
router.post('/remove', VendaController.removeVenda); // Rota para excluir uma venda
router.post('/done', VendaController.changeVendaStatus); // Rota para alterar o status de uma venda (faturado ou não)

module.exports = router;
