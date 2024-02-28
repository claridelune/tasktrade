import bcrypt from 'bcrypt';
import prisma from '../configs';
import jwt from 'jsonwebtoken'

class UserService {
    async getAll() {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                registrationDate: true,
            },
            orderBy: {id: 'desc'},
        });
        return users;
    }

    async count() {
        const count = await prisma.user.count();
        return count;
    }

    async create(username: string, email: string, password: string) {
        const passwordHash = await bcrypt.hash(password, 10);
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
        return result;
    }

    async find(id: string) {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        select: {
          id: true,
          username: true,
          email: true,
          registrationDate: true,
        },
      });
      return user;
    }

    async search(username: string, email: string){
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
      return users;
    }

    async update(id: string, username: string, email: string) {
        await prisma.user.update({
            where: {id: parseInt(id)},
            data: {
                username,
                email,
            },
        });
    }
    
    async delete(id: string) {
        await prisma.user.delete({
            where: {id: parseInt(id)},
        });
    }

    currentUser(token: string){
        try {
            const JWT_SECRET = process.env.JWT_SECRET || '';
            const decodedToken: any = jwt.verify(token, JWT_SECRET);
            const userId = decodedToken.userId;
            return userId;
        } catch (error) {
            console.log(error);
            throw new Error('Invalid token');
        }

    }
}

export default new UserService();
