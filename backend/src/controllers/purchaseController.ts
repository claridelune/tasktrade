import Joi from 'joi';
import { Request, Response } from 'express';
import prisma from '../configs';
import { Bid, TaskStatus } from '../types';

const bidSchema = Joi.object({
    taskId: Joi.string().required(),
    bidderId: Joi.number().required(),
    amount: Joi.number().positive().required(),
});

class PurchaseController {
    async makePurchase(req: Request, res: Response) {
        try {
            const validation = bidSchema.validate(req.body);
            if (validation.error) {
                return res.status(400).json({error: validation.error.details[0].message});
            }

            const {taskId, bidderId, amount} = req.body as Bid;
            const purchase = await prisma.bid.create({
                data: {
                    taskId,
                    bidderId,
                    amount,
                },
            });
            await prisma.task.update({
                where: {id: taskId},
                data: {status: TaskStatus.Sold},
            });
            res.status(201).json(purchase);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    }

    async listPurchases(req: Request, res: Response) {
        try {
            const userIdParam = req.params.userId;
            const userId = Number(userIdParam);

            if (isNaN(userId)) {
                return res.status(400).json({error: 'Invalid user ID'});
            }

            const purchases = await prisma.bid.findMany({
                where: {bidderId: userId},
                include: {
                    task: true,
                },
            });

            res.status(200).json(purchases);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    }
}

export default new PurchaseController();
