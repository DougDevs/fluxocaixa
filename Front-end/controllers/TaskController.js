const axios = require('axios');

module.exports = class TaskController {

    static createTask(req, res) {
        res.render('tasks/create');
    }

    static async createTaskSave(req, res) {
        let task = {
            title: req.body.title,
            description: req.body.description,
            periodo: req.body.periodo 
        };

        const resp = await axios.post('http://localhost:5000/tasks/add/', task);

        if (resp.status === 201) {
            console.log(resp.data);
            res.redirect('/tasks');
        }
    }

    static async showTasks(req, res) {
        const resp = await axios.get('http://localhost:5000/');
        if (resp.status === 200) {
            let tasks = resp.data.tasks;
            let emptyTasks = resp.data.emptyTasks;
            res.render('tasks/all', { tasks: tasks, emptyTasks });
        }
    }

    static async updateTask(req, res) {
        const id = req.params.id;
        const resp = await axios.get(`http://localhost:5000/tasks/edit/${id}`);
        let task = resp.data.task;
        res.render('tasks/edit', { task });
    }

    static async updateTaskPost(req, res) {
        const task = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            periodo: req.body.periodo // Valor constante para o atributo "periodo"
        };
        const resp = await axios.put('http://localhost:5000/tasks/edit/', task);

        if (resp.status === 200) {
            console.log(resp.data);
            res.redirect('/tasks');
        }
    }

    static async removeTask(req, res) {
        const task = { id: req.body.id };

        const resp = await axios.post('http://localhost:5000/tasks/remove/', task);

        if (resp.status === 200) {
            console.log(resp.data);
            res.redirect('/tasks');
        }
    }

    static async statusTask(req, res) {
        const task = {
            id: req.body.id,
            done: req.body.done
        };

        const resp = await axios.put('http://localhost:5000/tasks/done/', task);

        if (resp.status === 200) {
            console.log(resp.data);
            res.redirect('/tasks');
        }
    }
}
