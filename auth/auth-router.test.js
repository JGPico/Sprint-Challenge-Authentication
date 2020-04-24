const request = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

describe("server", function(){
    describe("POST/register", function(){
        beforeEach(async () => {
            await db('users').truncate();
        });

        it("should return a 201 status code", async function(){
            await request(server)
            .post("/api/auth/register")
            .send({ username: "Renzo", password: "CountToFive"})
            .then(res => {
                expect(res.status).toBe(201);
            });
        });

        it("Should insert a new user into the users database", async function(){
            const newName = { username: "Renzo"};
            const newPass = {password: "CountToFive"};
            const existing = await db('users').where({username: newName});
            expect(existing).toHaveLength(0);

            await request(server)
            .post("/api/auth/register")
            .send({ username: "Renzo", password: "CountToFive"})
            .then(res => {
                expect(res.body.username).toBe("Renzo");
            });
            const inserted = await db('users');
            expect(inserted).toHaveLength(1);
        });
    });

    describe("POST/login", function(){
        beforeEach(async () => {
            await db('users').truncate();
        });

        it("should return a 200 status code", async function(){
            await request(server)
            .post("/api/auth/login")
            .send({ username: "Quiggly", password: "Lemon"})
            .then(res => {
                expect(res.status).toBe(401);
            });
        });

        it("Should return a message saying Bad creds", async function(){

            await request(server)
            .post("/api/auth/login")
            .send({ username: "Renzo", password: "CountToFive"})
            .then(res => {
                expect(res.body.message).toBe("Bad creds");
            });
       });
    });
});