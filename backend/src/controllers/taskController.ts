import Joi from 'joi';
import { Request, Response } from 'express';
import prisma from '../configs';
import { TaskStatus } from '@prisma/client';

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid(TaskStatus.AVAILABLE, TaskStatus.SOLD, TaskStatus.AUCTION),
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
      const task = await prisma.task.create({
        data: {
          ...req.body,
          ownerId: Number(req.body.ownerId),
        },
      });
      res.status(201).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateTask(req: Request, res: Response) {
    const { id } = req.params;
    const taskData = { ...req.body };

    try {
      const updatedTask = await prisma.task.update({
        where: { id: Number(id) },
        data: taskData,
      });
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteTask(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await prisma.task.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new TaskController();
