import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createToken, refreshToken } from '../middleware/token';
import jwt from 'jsonwebtoken';
import prisma from '../configs';

class authController {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          username,
          email,
          passwordHash,
        },
      });
      const { passwordHash: _, ...userWithoutPasswordHash } = user;
      res.status(201).json(userWithoutPasswordHash);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !await bcrypt.compare(password, user.passwordHash)) {
        res.status(401).json({ error: 'Invalid username or password' });
        return;
      }

      const token = createToken(user) ?? '';
      const refreshTokenValue = refreshToken(user, token) ?? '';

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: refreshTokenValue },
      });

      const { passwordHash: _, refreshToken: __, ...responseUser } = user;
      res.status(200).json({
        user: responseUser,
        token,
        refreshToken: refreshTokenValue,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  async refreshToken(req: Request, res: Response) {
  const { refreshToken: refreshTokenFromBody, id } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user || user.refreshToken !== refreshTokenFromBody) {
      res.status(403).json({ message: 'Invalid refresh token' });
      return;
    }

    jwt.verify(refreshTokenFromBody ?? '', process.env.REFRESH_TOKEN_SECRET ?? '', (err: Error | null, _: any) => {
  if (err) {
    res.status(403).json({ message: 'Failed to verify refresh token' });
    return;
  }

  const newToken = createToken(user);
  res.status(200).json({ token: newToken });
});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
  
  async logout(req: Request, res: Response) {
    const { id } = req.body;
    try {
      await prisma.user.update({
        where: { id },
        data: { refreshToken: null },
      });
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Logout error' });
    }
  }
}

export default new authController();
