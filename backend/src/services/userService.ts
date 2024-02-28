import bcrypt from 'bcrypt';
import prisma from '../configs';

class UserService {
  async getAll() {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          registrationDate: true,
        },
        orderBy: { id: 'desc' },
      });
      return users;
  }
}

export default new UserService();
