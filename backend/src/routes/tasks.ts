import express from 'express';
import TaskController from '../controllers/taskController';

const router = express.Router();

router.post('/', TaskController.createTask);
/* router.get('/', TaskController.listTasks);
router.get('/:id', TaskController.getTaskDetails); */
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;
