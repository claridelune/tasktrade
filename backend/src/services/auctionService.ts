import prisma from '@/configs';
import { injectable } from 'tsyringe';

@injectable()
export class AuctionService {
  async bidOnTask(bidDto: any) {
    const { taskId, bidderId, amount } = bidDto;

    const bid = await prisma.bid.create({
      data: {
        taskId,
        bidderId,
        amount,
      },
    });

    return bid;
  }

  async getAuctionDetails(taskId: number) {
    const auctionDetails = await prisma.task.findUnique({
      where: { id: taskId },
      include: { bids: true },
    });

    return auctionDetails;
  }

  async closeAuction(taskId: number) {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { status: 'SOLD' },
    });

    return updatedTask;
  }
}
