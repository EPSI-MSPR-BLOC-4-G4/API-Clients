import request from "supertest";
import app from "../src/app"; // Assurez-vous que le chemin vers app.ts est correct

const baseURL = "http://localhost:7000";

describe("API Tests", () => {
  const newCustomer = {
    company: {
      name: "Test Company",
    },
    name: "Test Name",
    username: "Test User",
    firstName: "Test Firstname",
    lastName: "Test Lastname",
    address: {
      postalCode: "99999",
      city: "Test City",
    },
    profile: {
      firstName: "Test Firstname",
      lastName: "Test Lastname",
    },
  };

  let server: any;

  beforeAll((done) => {
    server = app.listen(7000, () => {
      console.log("Test server is running on port 7000");
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(async () => {
    // Ajouter un client à la base de données avant chaque test
    await request(baseURL).post("/api/customers").send(newCustomer);
  });

  afterEach(async () => {
    // Supprimer tous les clients de la base de données après chaque test
    const response = await request(baseURL).get("/api/customers");
    const customers = response.body;
    for (const customer of customers) {
      await request(baseURL).delete(`/api/customers/${customer.id}`);
    }
  });

  it("GET /api/customers : should return 200", async () => {
    const response = await request(baseURL).get("/api/customers");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("GET /api/customers/:id : should return 200", async () => {
    const response = await request(baseURL).get("/api/customers");
    const lastCustomer = response.body[response.body.length - 1];

    const response2 = await request(baseURL).get(`/api/customers/${lastCustomer.id}`);
    expect(response2.statusCode).toBe(200);
    expect(response2.body).toHaveProperty('name', newCustomer.name);
  });

  it("DELETE /api/customers/:id : should return 200 at first, and 500 for the second time", async () => {
    const response = await request(baseURL).get("/api/customers");
    const lastCustomer = response.body[response.body.length - 1];

    const response2 = await request(baseURL).delete(`/api/customers/${lastCustomer.id}`);
    expect(response2.statusCode).toBe(200);

    const response3 = await request(baseURL).delete(`/api/customers/${lastCustomer.id}`);
    expect(response3.statusCode).toBe(500);
  });

  it("PUT /api/customers/:id : should return 200", async () => {
    const response = await request(baseURL).get("/api/customers");
    const lastCustomer = response.body[response.body.length - 1];

    const response2 = await request(baseURL)
      .put(`/api/customers/${lastCustomer.id}`)
      .send({ name: "Updated Name" });

    expect(response2.statusCode).toBe(200);

    const response3 = await request(baseURL).get(`/api/customers/${lastCustomer.id}`);
    expect(response3.body).toHaveProperty('name', "Updated Name");
  });
});