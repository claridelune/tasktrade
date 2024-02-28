import { Request, Response } from 'express';
import UserService from '../services/userService'

class userController {
    async getAll(req: Request, res: Response) {
        try {
            const records = UserService.getAll();
            res.status(200).json(records);
        } catch (err) {
            console.error(err);
            res.status(500).json({error: 'Internal server error'});
        }
    }

    async count(req: Request, res: Response) {
        try {
            const count = UserService.count();
            res.status(200).json(count);
        } catch (err) {
            console.error(err);
            res.status(500).json({error: 'Internal server error'});
        }
    }

    async create(req: Request, res: Response) {
        try {
            const {username, email, password: oldPassword} = req.body;
            const result = UserService.create(username, email, oldPassword);
            res.status(201).json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({error: 'Internal server error'});
        }
    }

    async find(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const user = UserService.find(id);
            if (!user) {
                return res.status(404).json({error: 'User not found'});
            }
            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({error: 'Internal server error'});
        }
    }

    async search(req: Request, res: Response) {
        try {
            const {username, email} = req.body;
            const users = UserService.search(username, email);
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    }

    async update(req: Request, res: Response) {
        try {
            const {id, username, email} = req.body;
            UserService.update(id, username, email);
            res.status(200).json({message: 'User updated successfully!'});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const {id} = req.params;
            UserService.delete(id);
            res.status(200).json({message: 'User deleted successfully!'});
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    }
}

export default new userController();
