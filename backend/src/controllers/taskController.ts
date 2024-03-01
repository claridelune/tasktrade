import Joi from 'joi';
import { Request, Response } from 'express';
import { TaskStatus, Category } from '../types';
import TaskService from '../services/taskService'

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  url: Joi.string().required(),
  status: Joi.string().valid(TaskStatus.Available, TaskStatus.Sold, TaskStatus.Auction),
  category: Joi.string().valid(Category.Art, Category.Humanities, Category.Languages, Category.Mathematics, Category.Science, Category.Technology),
  ownerId: Joi.number().required(),
  startingBid: Joi.number().required(),
});

class TaskController {
  async createTask(req: Request, res: Response) {
    const validation = taskSchema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ error: validation.error.details[0].message });
    }

    try {
        const task = TaskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

    async updateTask(req: Request, res: Response) {
        const {id} = req.params;
        const taskData = {...req.body};

        try {
            const updatedTask = TaskService.updateTask(id, taskData);
            res.status(200).json(updatedTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    }

    async deleteTask(req: Request, res: Response) {
        const {id} = req.params;

        try {
            TaskService.deleteTask(id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    }
}

export default new TaskController();
