import jwt from 'jsonwebtoken';
import { User } from '../types';

const createToken = (user: User) => {
  const JWT_SECRET = process.env.JWT_SECRET || '';
  const payload = { id: user.id, user_name: user.username, email: user.email };
  let token = null;
  try {
    token = jwt.sign(payload, JWT_SECRET, { expiresIn: '120s' });
  } catch (error) {
    console.error(error);
  }

  return token;
};

const refreshToken = (user: User, token: string) => {
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';
  const payload = { id: user.id, user_name: user.username, email: user.email };
  try {
    token = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '3600s' });
  } catch (error) {
    console.log(error);
  }

  return token;
};

export { createToken, refreshToken };
