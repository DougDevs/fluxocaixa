const Venda = require('../models/Venda'); // Importe o modelo "Venda"

module.exports = class VendaController {

    static async createVenda(req, res) {
        try {
            const { cliente, placa, dataHora, valor, modoPagamento, faturado } = req.body;
            const novaVenda = await Venda.create({
                cliente,
                placa,
                dataHora,
                valor,
                modoPagamento,
                faturado: faturado || false, // Se "faturado" não estiver definido no corpo da solicitação, ele será definido como falso
            });
            res.status(201).json({
                message: `Venda para ${cliente} criada com sucesso`
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Ocorreu um erro ao criar a venda"
            });
        }
    }

    static async listVendas(req, res) {
        try {
            const vendas = await Venda.findAll({ raw: true });
            let emptyVendas = false;

            if (vendas.length === 0) {
                emptyVendas = true;
            }

            res.status(200).json({ vendas, emptyVendas });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Ocorreu um erro ao buscar as vendas"
            });
        }
    }

    static async updateVenda(req, res) {
        try {
            const id = req.params.id;
    
            if (!id) {
                res.status(422).json({
                    message: "Faltou informar o ID da venda"
                });
                return;
            }
    
            const venda = await Venda.findOne({ where: { id }, raw: true });
            if (!venda) {
                res.status(404).json({
                    message: "Venda não encontrada"
                });
            } else {
                res.status(200).json({ venda });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Ocorreu um erro ao buscar a venda"
            });
        }
    
    
    }

    static async updateVendaPost(req, res) {
        try {
            const id = req.body.id;

            if (!req.body.cliente) {
                res.status(422).json({
                    message: "Faltou informar o nome do cliente"
                });
                return;
            }

            if (!id) {
                res.status(422).json({
                    message: "Faltou informar o ID da venda"
                });
                return;
            }

            const { cliente, placa, dataHora, valor, modoPagamento, faturado } = req.body;
            const venda = {
                cliente,
                placa,
                dataHora,
                valor,
                modoPagamento,
                faturado: faturado || false, // Se "faturado" não estiver definido, ele será definido como falso
            };

            const updatedVenda = await Venda.update(venda, { where: { id } });
            if (updatedVenda[0] === 1) {
                res.status(200).json({
                    message: `Venda para ${cliente} atualizada com sucesso`
                });
            } else {
                res.status(404).json({
                    message: "Venda não encontrada"
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Ocorreu um erro ao atualizar a venda"
            });
        }
    }

    static async removeVenda(req, res) {
        try {
            const id = req.body.id;

            if (!id) {
                res.status(422).json({
                    message: "Faltou informar o ID da venda"
                });
                return;
            }

            const deletedVenda = await Venda.destroy({ where: { id } });
            if (deletedVenda === 1) {
                res.status(200).json({
                    message: "Venda excluída com sucesso"
                });
            } else {
                res.status(404).json({
                    message: "Venda não encontrada"
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Ocorreu um erro ao excluir a venda"
            });
        }
    }

    static async changeVendaStatus(req, res) {
        try {
            const id = req.body.id;

            if (!id) {
                res.status(422).json({
                    message: "Faltou informar o ID da venda"
                });
                return;
            }

            const { done } = req.body;
            const venda = {
                faturado: done === '0' ? false : true,
            };

            const updatedVenda = await Venda.update(venda, { where: { id } });
            if (updatedVenda[0] === 1) {
                res.status(200).json({
                    message: "Status da venda alterado com sucesso"
                });
            } else {
                res.status(404).json({
                    message: "Venda não encontrada"
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Ocorreu um erro ao atualizar o status da venda"
            });
        }
    }
}
