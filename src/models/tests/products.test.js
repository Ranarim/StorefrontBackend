"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../products");
const store = new products_1.Products();
const testProduct = {
    name: "Testhose",
    price: 100
};
describe("Product Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('create method should add a product', async () => {
        const result = await store.create(testProduct);
        const { id, name, price } = result;
        expect(typeof id).toBe("number");
        expect(name).toEqual("Testhose");
        expect(price).toEqual(100);
    });
    it("should read product", async () => {
        const result = await store.show("1");
        expect(result).toEqual({
            id: 1,
            name: "Daunenjacke",
            price: 99
        });
    });
});
