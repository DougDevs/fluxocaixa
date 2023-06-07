const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')

router.get('/add',TaskController.createTask)
router.post('/add',TaskController.createTaskSave)
router.get('/',TaskController.showTasks)
router.get('/edit/:id', TaskController.updateTask)
router.post('/edit',TaskController.updateTaskPost)
router.post('/remove',TaskController.removeTask)
router.post('/done',TaskController.statusTask)

module.exports = router