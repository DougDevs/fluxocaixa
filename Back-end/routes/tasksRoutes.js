const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')


router.post('/add',TaskController.createTaskSave)
router.get('/',TaskController.showTasks)
router.get('/edit/:id', TaskController.updateTask)
router.put('/edit',TaskController.updateTaskPost)
router.post('/remove',TaskController.removeTask)
router.put('/done',TaskController.statusTask)

module.exports = router