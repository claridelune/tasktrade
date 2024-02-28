import prisma from '../configs';

class TaskService {
    async createTask(data: any){
      const task = await prisma.task.create({
          data: data,
      });
      return task;
    }

    async updateTask(id: string, data: any) {
        const updatedtask = await prisma.task.update({
            where: {id: Number(id)},
            data: data,
        });
        return updatedtask;
    }

    async deleteTask(id: string) {
        await prisma.task.delete({
            where: {id: Number(id)},
        });
    }
}

export default new TaskService();
