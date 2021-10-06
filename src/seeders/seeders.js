import mongoose from "mongoose";
import faker from "faker";
import dotenv from "dotenv";
import User from "../Models/user";
import Message from "../Models/message";
import Channel from "../Models/channel";
import bcryptHelper from "../authService/bcrypt";
import { v4 as uuidv4 } from "uuid";

const { hashPassword } = bcryptHelper;

dotenv.config();

// connection to mongodb
const connect = () => {
  /** connection mongodb */
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("mongodb connected...");
    })
    .catch((err) => console.log(err.message));

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db");
  });
};

// Drop existing users if any
const userModelSeed = () => User.deleteMany({});
const messageModelSeed = () => Message.deleteMany({});
const channelModelSeed = () => Channel.deleteMany({});

const Seeders = {
  async seedUserModel() {
    try {
      // make a bunch of users
      const users = [];
      for (let i = 0; i < 2; i += 1) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const pass = "password";
        const photo = "https://good-deed-app.s3-us-west-1.amazonaws.com/user.png";
        const password = hashPassword(pass);
        const newUser = {
          firstName,
          lastName,
          email: faker.internet.email(firstName),
          password,
          photo
        };
        users.push(newUser);
      }
      await User.insertMany(users);
    } catch (error) {
      console.log("error", error);
    }
  },

  async seedChannelModel() {
    try {
      // make a bunch of rating
      const channels = [];
      for (let i = 0; i < 2; i += 1) {
        const channelName = faker.lorem.word();
        const channelDescription = faker.lorem.words();
        const newChannel = {
          channelName,
          channelDescription,
        };
        channels.push(newChannel);
      }
      await Channel.insertMany(channels);
    } catch (error) {
      console.log("error", error);
    }
  },

  async seedMessageModel() {
    try {
      // make a bunch of message
      const messages = [];
      for (let i = 0; i < 2; i += 1) {
        const messageText = "hi everyone!";
        const messageType = "text";

        const newMessage = {
          messageText,
          messageType
        };
        messages.push(newMessage);
      }

      await Message.insertMany(messages);
    } catch (error) {
      console.log("error", error);
    }
  },
 

};

const migration = async () => {
  try {
    await connect();
    await userModelSeed();
    await channelModelSeed();
    await messageModelSeed();
    await Seeders.seedChannelModel();
    await Seeders.seedUserModel();
    await Seeders.seedMessageModel();
    console.log("db migration successful");
  } catch (error) {
    console.log("error", error);
  }
};

migration();
