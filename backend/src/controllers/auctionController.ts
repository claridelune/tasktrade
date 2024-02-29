import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { AuctionService } from '@/services/auctionService';

@injectable()
export class AuctionController {
  constructor(
    @inject(AuctionService) private readonly auctionController: AuctionService,
  ) {}

  async bidOnTask(req: Request, res: Response) {
    try {
      const record = this.auctionController.bidOnTask(req.body);
      res.status(201).json(record);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAuctionDetails(req: Request, res: Response) {
    try {
      const record = this.auctionController.getAuctionDetails(req.body);
      res.status(200).json(record);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async closeAuction(req: Request, res: Response) {
    try {
      const record = this.auctionController.closeAuction(req.body);
      res
        .status(200)
        .json({ message: 'Auction closed successfully', task: record });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
