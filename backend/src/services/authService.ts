import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '@/configs';
import { createToken, refreshToken } from '@/middleware/token';
import { injectable } from 'tsyringe';

@injectable()
export class AuthService {
  async register(userDto: any) {
    const { username, password, email } = userDto;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    const { passwordHash: _, ...userWithoutPasswordHash } = user;

    return userWithoutPasswordHash;
  }

  async refreshToken(userDto: any) {
    const { refreshToken: refreshTokenFromBody, id } = userDto;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user || user.refreshToken !== refreshTokenFromBody) {
      throw new Error('Invalid refresh token');
    }

    jwt.verify(
      refreshTokenFromBody ?? '',
      process.env.REFRESH_TOKEN_SECRET ?? '',
      (err: Error | null, _: any) => {
        throw new Error('Failed to verify refresh token');
      },
    );

    const newToken = createToken(user);
    return newToken;
  }

  async login(userDto: any) {
    const { email, password } = userDto;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!user || !isValid) {
      throw new Error('Invalid username or password');
    }

    const token = createToken(user) ?? '';
    const refreshTokenValue = refreshToken(user, token) ?? '';

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: refreshTokenValue },
    });

    const { passwordHash: _, refreshToken: __, ...responseUser } = user;

    return {
      user: responseUser,
      token,
      refreshToken: refreshTokenValue,
    };
  }

  async logout(id: number) {
    await prisma.user.update({
      where: { id },
      data: { refreshToken: null },
    });
  }
}
