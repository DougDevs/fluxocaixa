const Task = require('../models/Task');

module.exports = class TaskController {

    static async createTaskSave(req, res) {

        if (!req.body.title) {
            res.status(422).json({
                message: "Faltou informar o título"
            });
            return;
        }

        const task = {
            title: req.body.title,
            description: req.body.description,
            done: false,
            periodo: req.body.periodo // Valor constante para o atributo "periodo"
        };

        await Task.create(task)
            .then(res.status(201).json({
                message: `Tarefa ${task.title} criada com sucesso`
            }));
    }

    static async showTasks(req, res) {
        await Task.findAll({ raw: true })
            .then((data) => {
                let emptyTasks = false;

                if (data.length === 0) {
                    emptyTasks = true;
                }

                res.status(200).json({ tasks: data, emptyTasks });
            }).catch((err) => console.log(err));
    }

    static updateTask(req, res) {
        const id = req.params.id;

        if (!id) {
            res.status(422).json({
                message: "Faltou informar o id da tarefa"
            });
            return;
        }

        Task.findOne({ where: { id: id }, raw: true })
            .then((data) => {
                res.status(200).json({ task: data });
            })
            .catch((err) => console.log(err));
    }

    static async updateTaskPost(req, res) {
        const id = req.body.id;

        if (!req.body.title) {
            res.status(422).json({
                message: "Faltou informar o título"
            });
            return;
        }

        if (!id) {
            res.status(422).json({
                message: "Faltou informar o id da tarefa"
            });
            return;
        }

        const task = {
            title: req.body.title,
            description: req.body.description,
            periodo: req.body.periodo, // Valor constante para o atributo "periodo"
        };


        await Task.update(task, { where: { id: id } })
            .then(res.status(200).json({
                message: `Tarefa ${task.title} atualizada com sucesso`
            }))
            .catch((err) => console.log(err));
    }

    static async removeTask(req, res) {
        const id = req.body.id;

        if (!id) {
            res.status(422).json({
                message: "Faltou informar o id da tarefa"
            });
            return;
        }
        await Task.destroy({ where: { id: id } })
            .then(res.status(200).json({
                message: "Tarefa excluída com sucesso"
            }))
            .catch((err) => console.log(err));
    }

    static async statusTask(req, res) {
        const id = req.body.id;
        console.log(req.body);

        if (!id) {
            res.status(422).json({
                message: "Faltou informar o id da tarefa"
            });
            return;
        }

        const task = {
            done: req.body.done === '0' ? true : false,
        };

        await Task.update(task, { where: { id: id } })
            .then(await res.status(200).json({
                message: "Status da tarefa alterado com sucesso"
            }))
            .catch((err) => console.log())
    }

}
