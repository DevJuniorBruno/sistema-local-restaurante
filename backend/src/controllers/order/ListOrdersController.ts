import { Request, Response } from 'express';
import { ListOrdersService } from '../../services/order/ListOrdersService';

class ListOrdersController{
    async handle(req:Request, res:Response){

        const order_id = req.query.order_id as string;

        const findOrders = new ListOrdersService();

        const orders = await findOrders.execute()

        return res.json(orders)

    }
}
export { ListOrdersController };