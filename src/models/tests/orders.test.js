"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../orders");
const testOrder = {
    userId: 1,
    status: "registered"
};
const testOrderProduct = {
    quantity: 3,
    orderid: 1,
    productid: 1
};
const store = new orders_1.Orders();
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
    it("showOrdersByUser method should show the orders from a user", async () => {
        const orders = await store.showOrdersByUser("1");
        expect(orders.length).toBe(1);
    });
    it("addProductToOrder method should add a product to the order", async () => {
        const orderProduct = await store.addProductToOrder(testOrderProduct);
        const { quantity, orderid, productid } = orderProduct;
        expect(quantity).toEqual(3);
        expect(orderid).toEqual(1);
        expect(productid).toEqual(1);
    });
});
