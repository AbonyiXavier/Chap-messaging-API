import fs from "fs";
import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
import server from "../../server";
import User from "../../Models/user";
import { user, user2 } from "./test.data";

chai.use(chatHttp);
const { expect } = chai;

const url = "/api/v1";

let accessToken;
let userId;

describe("User Endpoint", () => {
  before((done) => {
    User.deleteMany({});
    done()
  });
  it("it should register a user successfully", async () => {
    const result = await chai
      .request(server)
      .post(`${url}/register`)
      .set("Accept", "application/json")
      .send(user);
    expect(result.status).to.equal(201);
    expect(result.body.status).to.equal(true);
    expect(result.body.message).to.be.equal("User created successfully!");
  });

  it("It should not signup a user with duplicate details", async () => {
    const result = await chai
      .request(server)
      .post(`${url}/register`)
      .set("Accept", "application/json")
      .send(user);
    expect(result.status).to.equal(400);
    expect(result.body.status).to.equal(false);
    expect(result.body.message).to.be.equal("email already in use.");
  });

  it("It should generate token when user logs in", async () => {
    const result = await chai
      .request(server)
      .post(`${url}/login`)
      .set("Accept", "application/json")
      .send(user2);
    expect(result.status).to.equal(200);
    expect(result.body.status).to.equal(true);
    accessToken = result.body.data.accessToken;
  });

  it("It should fetch users", async () => {
    const result = await chai
      .request(server)
      .get(`${url}/users`)
      .set("Accept", "application/json")
      .set("Authorization", accessToken);
    expect(result.status).to.equal(200);
    expect(result.body.status).to.equal(true);
    expect(result.body.message).to.be.equal("Users fetched successfully!");
    expect(result.body.meta.totalPages).to.be.equal(1);
    expect(result.body.meta.totalUsers).to.be.equal(1);
    let { data } = result.body;
    for (const { _id } of data) {
      userId = _id;
    }
  });

  it("It should fetch single user", async () => {
    const result = await chai
      .request(server)
      .get(`${url}/users/${userId}`)
      .set("Accept", "application/json")
      .set("Authorization", accessToken);
    expect(result.status).to.equal(200);
    expect(result.body.status).to.equal(true);
    expect(result.body.message).to.be.equal("User fetched successfully!");
  });

  it("It should update user", async () => {
    const result = await chai
      .request(server)
      .patch(`${url}/users/${userId}`)
      .set("Authorization", accessToken)
      .set("content-type", "multipart/form-data")
      .attach(
        "photo",
        fs.readFileSync(`${__dirname}/carbon.png`),
        "test/controllers/carbon.png"
      );
      expect(result.body.status).to.equal(true);
    expect(result.body.message).to.be.equal("User updated successfully!");
  });

  it("It should soft delete a user", async () => {
    const result = await chai
      .request(server)
      .delete(`${url}/users/${userId}`)
      .set("Authorization", accessToken);
      expect(result.body.status).to.equal(true);
    expect(result.body.message).to.be.equal("User deleted successfully!");
  });
});
