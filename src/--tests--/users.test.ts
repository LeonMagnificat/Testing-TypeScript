import supertest from "supertest";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { server } from "../server";
import UsersModel from "../api/user/model";

dotenv.config();

const client = supertest(server);

const validUser = {
  email: "john@gmail.com",
  password: "1234",
  role: "Rambo",
};
const invalidUser = {
  email: "john@gmail.com",
  role: "Rambo",
};

beforeAll(async () => {
  await mongoose.connect("mongodb+srv://test:1234@cluster0.utairur.mongodb.net/data04-test?retryWrites=true&w=majority");
  const product = new UsersModel(validUser);
  await product.save();
});

afterAll(async () => {
  await UsersModel.deleteMany();
  await mongoose.connection.close();
});

let accessToken: String;

describe("Test APIs", () => {
  it("Should test that POST /users returns a valid _id and 201", async () => {
    const response = await client.post("/users").send(validUser).expect(201);
    expect(response.body._id).toBeDefined();
  });

  it("Should test that POST /users/login with right credentials gives us back an access token", async () => {
    const response = await client.post("/users/login").send(validUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    accessToken = response.body.accessToken;
  });
});
