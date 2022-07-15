import {Product, Products} from "../products"


const store = new Products()

describe("Book Model", () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });
  
    it('should have a delete method', () => {
      expect(store.index).toBeDefined();
    });
  
    it('create method should add a product', async () => {
      const result = await store.create({
        id: 1,
        name: "Klobürste",
        price: 100,
        category: "nichtsnutz"
      });
      expect(result).toEqual({
            id: 1,
            name: "Klobürste",
            price: 100,
            category: "nichtsnutz"
      });
    });

    it("should read a list of products", async () => {
        const result = await store.index()
        expect(result).toEqual([{
            id: 1,
            name: "Klobürste",
            price: 100,
            category: "nichtsnutz"
        }])

    })
})
