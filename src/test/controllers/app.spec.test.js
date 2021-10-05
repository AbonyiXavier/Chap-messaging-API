import fs from 'fs';
import chai from 'chai';
import chatHttp from 'chai-http';
import 'chai/register-should';
import server from "../../server";
import User from "../../Models/user";
// import Book from "../../Models/book";
import { user, user2 } from "./test.data";


chai.use(chatHttp);
const { expect } = chai;

const url = "/api/v1";

let accessToken;
let channelId;
let messageId

  describe("it should register a user", () => {
    before(async () => {

  it("it should register a user successfully", async() => {
    const result = await chai.request(server)
      .post(`${url}/register`)
      .set('Accept', 'application/json')
      .send(user)
      expect(result.status).to.equal(201);
      expect(result.body.message).to.be.equal('User created successfully!');
  });

  it('It should not signup a user with duplicate details', async() => {
    const result = await chai.request(server)
      .post(`${url}/register`)
      .set('Accept', 'application/json')
      .send(user)
      expect(result.status).to.equal(400);
      expect(result.body.message).to.be.equal('email already in use.');
  });

  
  it('It should generate token when user logs in', async() => {
    const result = await chai.request(server)
      .post(`${url}/login`)
      .set('Accept', 'application/json')
      .send(user2)
      expect(result.status).to.equal(200);
      accessToken = result.body.data.accessToken
  });

  });
  });

