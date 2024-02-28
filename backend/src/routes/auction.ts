import express from 'express';
import AuctionController from '../controllers/auctionController';

const router = express.Router();

router.post('/:taskId/bid', AuctionController.bidOnTask);
router.get('/:taskId', AuctionController.getAuctionDetails);
router.put('/:taskId/close', AuctionController.closeAuction);

export default router;
