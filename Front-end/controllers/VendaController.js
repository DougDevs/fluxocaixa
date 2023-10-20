const axios = require('axios');

module.exports = class VendaController {

    static createVenda(req, res) {
        res.render('vendas/create');
    }

    static async createVendaSave(req, res) {
        let venda = {
            cliente: req.body.cliente,
            placa: req.body.placa,
            dataHora: req.body.dataHora,
            valor: req.body.valor,
            modoPagamento: req.body.modoPagamento,
            faturado: req.body.faturado || false
        };

        const resp = await axios.post('http://localhost:5000/vendas/add', venda);

        if (resp.status === 201) {
            console.log(resp.data);
            res.redirect('/vendas');
        }
    }

    static async listVendas(req, res) {
        const resp = await axios.get('http://localhost:5000/vendas');
        if (resp.status === 200) {
            let vendas = resp.data.vendas;
            let emptyVendas = resp.data.emptyVendas;
            res.render('vendas/all', { vendas, emptyVendas });
        }
    }

    static async updateVenda(req, res) {
        const id = req.params.id;
        const resp = await axios.get(`http://localhost:5000/vendas/edit/${id}`);
        let venda = resp.data.venda;
        res.render('vendas/edit', { venda });
    }

    static async updateVendaPost(req, res) {
        const venda = {
            id: req.body.id,
            cliente: req.body.cliente,
            placa: req.body.placa,
            dataHora: req.body.dataHora,
            valor: req.body.valor,
            modoPagamento: req.body.modoPagamento,
            faturado: req.body.faturado || false
        };

        const resp = await axios.put('http://localhost:5000/vendas/edit', venda);

        if (resp.status === 200) {
            console.log(resp.data);
            res.redirect('/vendas');
        }
    }

    static async removeVenda(req, res) {
        const venda = { id: req.body.id };

        const resp = await axios.post('http://localhost:5000/vendas/remove', venda);

        if (resp.status === 200) {
            console.log(resp.data);
            res.redirect('/vendas');
        }
    }

    static async changeVendaStatus(req, res) {
        const venda = {
            id: req.body.id,
            done: req.body.done
        };

        const resp = await axios.put('http://localhost:5000/vendas/done', venda);

        if (resp.status === 200) {
            console.log(resp.data);
            res.redirect('/vendas');
        }
    }
}
