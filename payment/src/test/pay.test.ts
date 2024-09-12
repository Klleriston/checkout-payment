import request from "supertest";
import { app } from "../server";
describe("Payment Mock", () => {
    it("should return success or fail for payment route", async () => {
        const res = await request(app).get("/pay");
        expect([200, 400]).toContain(res.status);
    })
})