const express = require('express');
const router = express.Router();
const VendaController = require('../controllers/VendaController'); // Importe o controlador "VendaController"

router.post('/add', VendaController.createVenda); // Rota para criar uma nova venda
router.get('/', VendaController.listVendas); // Rota para listar todas as vendas
router.get('/edit/:id', VendaController.updateVenda); // Rota para obter detalhes de uma venda específica
router.put('/edit', VendaController.updateVendaPost); // Rota para atualizar uma venda
router.post('/remove', VendaController.removeVenda); // Rota para excluir uma venda
router.put('/done', VendaController.changeVendaStatus); // Rota para alterar o status de uma venda (faturado ou não)

module.exports = router;
