import {User, Users} from "../users"

const store = new Users()

const testUser: User = {
    firstname: "Max",
    lastname: "Mustermann",
    email: "max.mustermann@gmail.com",
    pw: "geheim"
}

describe("User Model", () => {
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
        const result = await store.create(testUser)
        const {firstname, lastname, email, pw} = result 
  
        expect(typeof firstname && typeof lastname && typeof email && typeof pw).toBe("string")
        expect(firstname).toEqual("Max")
        expect(lastname).toEqual("Mustermann")
        expect(email).toEqual("max.mustermann@gmail.com")
        expect(pw).toEqual("geheim")
      });

    it("should read user", async () => {
        const result= await store.show("2")
        expect(result).toEqual({
            id: 2,
            firstname: "Max",
            lastname: "Mustermann",
            email: "max.mustermann@gmail.com",
            pw: "geheim"  
        })
     })
})