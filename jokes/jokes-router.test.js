const request = require("supertest");

const server = require("../api/server.js");


describe("server", function(){
    describe("GET/jokes", function(){

        it("should return a 201 status code", async function(){
            await request(server)
            .get("/api/jokes")
            .send({ username: "Quiggly", password: "Lemon"})
            .then(res => {
                expect(res.status).toBe(400);
            });
        });

        it("should return a message saying No ticket", async function(){
            await request(server)
            .get("/api/jokes")
            .send({ username: "Quiggly", password: "Lemon"})
            .then(res => {
                expect(res.body.message).toBe("No ticket");
            });
        });

        
    });

   
});