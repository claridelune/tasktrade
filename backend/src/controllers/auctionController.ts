import { Request, Response } from 'express';
import {Bid} from '../types';

class AuctionController {
  async bidOnTask(req: Request, res: Response) {
    try {
      const { taskId, bidderId, amount } = req.body as Bid;
      const bid = await prisma.bid.create({
        data: {
          taskId: Number(taskId),
          bidderId: Number(bidderId),
          amount,
        },
      });
      res.status(201).json(bid);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAuctionDetails(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const auctionDetails = await prisma.task.findUnique({
        where: { id: Number(taskId) },
        include: {
          bids: true,
        },
      });
      res.status(200).json(auctionDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async closeAuction(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const updatedTask = await prisma.task.update({
        where: { id: Number(taskId) },
        data: { status: 'SOLD' },
      });
      res.status(200).json({ message: 'Auction closed successfully', task: updatedTask });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new AuctionController();
