import {
    v4 as uuid
} from 'uuid';

const randomInt = (min: number, max: number): number => {
    return Math.round(Math.random() * (max - min) + min);
}

const delay = (time: number) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

export type OrderDetails = {
    orderId: string;
    items: ItemDetails[];
}

export type OrderSummary = {
    orderId: string;
    timestamp: number;
    itemIds: string[];
}

export type ItemDetails = {
    orderId: string;
    itemId: string;
    quantity: number;
}

export class RemoteService {
    public async getOrderSummary(orderId: string): Promise < OrderSummary > {
        let count = 10;
        await delay(500);
        return {
            orderId,
            timestamp: Date.now(),
            itemIds: [...Array(count)].map(_ => uuid()),
        }
    }
    public async getItemDetails(orderId: string, itemId: string): Promise < ItemDetails > {
        await delay(500);
        return {
            orderId,
            itemId,
            quantity: randomInt(100, 1000)
        }
    }
}