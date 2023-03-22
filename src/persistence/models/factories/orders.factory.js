const OrderDto = require('../dtos/order.dto');
const { OrderDao } = require('../daos/app.dao');

class OrderFactory{
    constructor(){
        try{
            if(OrderFactory._instance){
                throw new Error('OrderFactory already has an instance!!!');
            }
            this.OrderDao = new OrderDao();
            OrderFactory._instance = this;
        }catch(error){
            this.OrderDao = OrderFactory._instance.OrderDao;
        }
    }

    async createOrder(orderObj){
        const newOrder = new OrderDto("undefined", orderObj.email, orderObj.items, orderObj.address, new Date());
        const order = await this.OrderDao.createOrder(newOrder);
        return new OrderDto(order.id, order.email, order.items, order.address, order.createdAt);
    }

    async getOrders(){
        let orders = await this.OrderDao.getOrders();
        return orders.map(order => {
            return new OrderDto(order.id, order.email, order.items, order.address, order.createdAt);
        })
    }

    async getOrderById(id){
        let order = await this.OrderDao.getOrderById(id);
        return new OrderDto(order.id, order.email, order.items, order.address, order.createdAt);
    }
    
    async getOrdersByEmail(email){
        let orders = await this.OrderDao.getOrdersByEmail(email);
        return orders.map(order => {
            return new OrderDto(order.id, order.email, order.items, order.address, order.createdAt);
        })
    }
}

module.exports = OrderFactory;