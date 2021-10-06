import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
import server from "../../server";
import User from "../../Models/user";
import Channel from "../../Models/channel";
import Message from "../../Models/message";

import {
  user,
  user2,
  channelData
} from "./test.data";

chai.use(chatHttp);
const { expect } = chai;

const url = "/api/v1";

let accessToken;
let channelId;
let messageId;

describe("Message Endpoint", () => {
  before((done) => {
    User.deleteMany({});
    Channel.deleteMany({});
    Message.deleteMany({});
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
  it("It should create channel", async () => {
    const result = await chai
      .request(server)
      .post(`${url}/channels`)
      .set("Accept", "application/json")
      .set("Authorization", accessToken)
      .send(channelData);
    expect(result.status).to.equal(201);
    expect(result.body.status).to.equal(true);
    expect(result.body.message).to.be.equal("Channel created successfully!");
  });

  it("It should Retrieve existing channnel when craeting with same channel name", async () => {
    const result = await chai
      .request(server)
      .post(`${url}/channels`)
      .set("Accept", "application/json")
      .set("Authorization", accessToken)
      .send(channelData);
    expect(result.status).to.equal(400);
    expect(result.body.status).to.equal(false);
    expect(result.body.message).to.be.equal("Retrieve existing channnel");
    channelId = result.body.data.channelId;
  });

  it("It should create message", async () => {
    const result = await chai
      .request(server)
      .post(`${url}/messages`)
      .set("Accept", "application/json")
      .set("Authorization", accessToken)
      .send({
        messageText: "what sup",
        channelId: channelId
    });
    expect(result.status).to.equal(201);
    expect(result.body.status).to.equal(true);
    expect(result.body.message).to.be.equal("Message sent successfully");
  });

  it("It should fetch conversation in channel", async () => {
    const result = await chai
      .request(server)
      .get(`${url}/${channelId}/messages`)
      .set("Accept", "application/json")
      .set("Authorization", accessToken);
    expect(result.status).to.equal(201);
    expect(result.body.status).to.equal(true);
    expect(result.body.message).to.be.equal("Messages fetched successfully!");
    messageId = result.body.data.message._id
  });

  it("It should mark message read", async () => {
    const result = await chai
      .request(server)
      .put(`${url}/messages`)
      .set("Accept", "application/json")
      .set("Authorization", accessToken)
      .send({
        channelId: channelId,
      });
    expect(result.body.status).to.equal(true);
    expect(result.body.message).to.be.equal(
      "read"
    );
  });

  it("It should soft delete a message", async () => {
    const result = await chai
      .request(server)
      .delete(`${url}/messages/${messageId}`)
      .set("Authorization", accessToken);
    expect(result.body.message).to.be.equal("message deleted successfully!");
  });
});
