import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
import server from "../../server";
import User from "../../Models/user";
import Channel from "../../Models/channel";

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

describe("Channel Endpoint", () => {
  before((done) => {
     User.deleteMany({});
     Channel.deleteMany({});
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

  it("It should search channel", async () => {
    const result = await chai
      .request(server)
      .get(`${url}/channels?search=backend`)
      .set("Accept", "application/json")
      .set("Authorization", accessToken);
    expect(result.status).to.equal(200);
    expect(result.body.status).to.equal(true);
    expect(result.body.message).to.be.equal("Channels fetched successfully");
  });

  it("It should select channel to join", async () => {
    const result = await chai
      .request(server)
      .patch(`${url}/channels`)
      .set("Accept", "application/json")
      .set("Authorization", accessToken)
      .send({
        channelName: channelId,
      });
    expect(result.status).to.equal(200);
    expect(result.body.status).to.equal(true);
    expect(result.body.message).to.be.equal(
      "You have successfully Joined the channel"
    );
  });

  it("It should view channel member", async () => {
    const result = await chai
      .request(server)
      .get(`${url}/channels/${channelId}`)
      .set("Authorization", accessToken);
    expect(result.body.message).to.be.equal("Members fetched successfully!");
    expect(result.body.status).to.equal(true);
    expect(result.body.meta.totalMembers).to.be.equal(2);
  });

  it("It should soft delete a channel", async () => {
    const result = await chai
      .request(server)
      .delete(`${url}/channels/${channelId}`)
      .set("Authorization", accessToken);
      expect(result.body.status).to.equal(true);
    expect(result.body.message).to.be.equal("channel deleted successfully!");
  });
});
