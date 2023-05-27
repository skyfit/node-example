import express = require('express')
import {
  ItemDetails,
  OrderDetails,
  RemoteService
} from './remote-service'

const remoteService = new RemoteService();

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/order/:id', async (req, res) => {
  const order = await remoteService.getOrderSummary(req.params['id']);
  console.log(order);
  let items: ItemDetails[] = [];
  for (const itemId of order.itemIds) {
    const itemDetails = await remoteService.getItemDetails(order.orderId, itemId);
    console.log(itemDetails);
    items.push(itemDetails);
  }
  const orderDetails: OrderDetails = {
    orderId: order.orderId,
    items
  }
  console.log(orderDetails);
  res.send(orderDetails);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})