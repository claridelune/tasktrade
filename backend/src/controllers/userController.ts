import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import prisma from '../configs';

class userController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          registrationDate: true,
        },
        orderBy: { id: 'desc' },
      });
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async count(req: Request, res: Response) {
    try {
      const count = await prisma.user.count();
      res.status(200).json(count);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { username, email, password: oldPassword } = req.body;
      const passwordHash = await bcrypt.hash(oldPassword, 10);
      const user = await prisma.user.create({
        data: {
          username,
          email,
          passwordHash,
        },
      });
      const result = {
        id: user.id,
        username: user.username,
        email: user.email,
        registrationDate: user.registrationDate,
      };
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async find(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        select: {
          id: true,
          username: true,
          email: true,
          registrationDate: true,
        },
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const { username, email } = req.body;
      const users = await prisma.user.findMany({
        where: {
          username: {
            contains: username,
            mode: 'insensitive',
          },
          email: {
            contains: email,
            mode: 'insensitive',
          },
        },
        select: {
          id: true,
          username: true,
          email: true,
          registrationDate: true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id, username, email } = req.body;
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          username,
          email,
        },
      });
      res.status(200).json({ message: 'User updated successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.user.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new userController();
