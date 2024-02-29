import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { AuthService } from '@/services/authService';

@injectable()
export class authController {
  constructor(@inject(AuthService) private readonly authService: AuthService) {}

  async register(req: Request, res: Response) {
    try {
      const record = this.authService.register(req.body);
      res.status(201).json(record);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const record = this.authService.login(req.body);
      res.status(200).json(record);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const record = this.authService.register(req.body);
      res.status(200).json(record);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      await this.authService.register(req.body);
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Logout error' });
    }
  }
}
