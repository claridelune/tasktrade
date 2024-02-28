import express from 'express';
import PurchaseController from '../controllers/purchaseController';

const router = express.Router();

router.post('/', PurchaseController.makePurchase);
router.get('/purchases', PurchaseController.listPurchases);

export default router;
