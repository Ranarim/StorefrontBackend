import {Order, Orders, OrderProduct} from "../orders"

const testOrder:Order = {
    userId: 1,
    status: "registered"
}

const testOrderProduct:OrderProduct = {
    quantity: 3,
    orderid: 1,
    productid: 1
}

const store = new Orders()

describe("Order Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
      });

    it('should have a showOrdersByUser method', () => {
      expect(store.showOrdersByUser).toBeDefined();
    });

    it('should have a showProductsByOrderId method', () => {
        expect(store.showProductsByOrderId).toBeDefined();
      });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
      });

    it('should have a addProductToOrder method', () => {
        expect(store.create).toBeDefined();
      });

    it("showOrdersByUser method should show the orders from a user", async() => {
        const orders: Order[] = await store.showOrdersByUser("1")
        expect(orders.length).toBe(1)
    }) 

    it("addProductToOrder method should add a product to the order", async() => {
        const orderProduct: OrderProduct = await store.addProductToOrder(testOrderProduct)
        const {quantity, orderid,productid} = orderProduct

        expect(quantity).toEqual(3)
        expect(orderid).toEqual(1)
        expect(productid).toEqual(1)
    })

    it("index method should return an array of orders", async() => {
      const result = await store.index()
      expect(result.length).toBeGreaterThan(0)
    })


})


