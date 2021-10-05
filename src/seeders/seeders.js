import mongoose from "mongoose";
import faker from "faker";
import dotenv from "dotenv";
import User from "../Models/user";
import Book from "../Models/book";
import Review from "../Models/review";
import Cart from "../Models/bookCart";
import jwtHelper from "../authService/jwt";
import bcryptHelper from "../authService/bcrypt";
import { v4 as uuidv4 } from 'uuid';


const { generateToken, refreshToken } = jwtHelper;
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
const reviewModelSeed = () => Review.deleteMany({});
const cartModelSeed = () => Cart.deleteMany({});
const bookModelSeed = () => Book.deleteMany({});


const Seeders = {
    async seedUserModel() {
        try {
            // make a bunch of users
            const users = [];
            for (let i = 0; i < 2; i += 1) {
                const full_name = faker.name.firstName();
                const pass = "password";
                const password = hashPassword(pass);
                const newUser = {
                    full_name,
                    email: faker.internet.email(full_name),
                    password,
                };
                users.push(newUser);
            }
            await User.insertMany(users);
        } catch (error) {
            console.log("error", error);
        }
    },

    async seedRatingModel() {
        try {
            // make a bunch of rating
            const ratings = [];
            for (let i = 0; i < 2; i += 1) {
                const body = faker.address.streetAddress();
                const rating = 2
                const newRating = {
                    body,
                    rating
                };
                ratings.push(newRating);
            }
            await Review.insertMany(ratings);
        } catch (error) {
            console.log("error", error);
        }
    },

    async seedCartModel() {
        try {
            // make a bunch of Cart
            const carts = [];
            for (let i = 0; i < 2; i += 1) {
                const bookId = uuidv4();
                const quantity = 2
                const newCart = {
                    bookId,
                    quantity
                };
                carts.push(newCart);
            }
            await Cart.insertMany(carts);
        } catch (error) {
            console.log("error", error);
        }
    },

    async seedBookModel() {
        try {
            // make a bunch of Book
            const books = [];
            for (let i = 0; i < 2; i += 1) {
                const title = faker.address.streetAddress();
                const description = "book description";
                const author = 'Xavier francis';
                const author_year = 2021;
                const price = 1500;
                const genre = "Romance";
                const stockQuantity = 4;
                const photo = "https://my-amazon-v1.s3.amazonaws.com/1630168102428";

                const newBook = {
                    title,
                    description,
                    author,
                    author_year,
                    price,
                    genre,
                    stockQuantity,
                    photo
                };
                books.push(newBook);
            }

            await Book.insertMany(books);
        } catch (error) {
            console.log("", error);
        }
    },
};

const migration = async() => {
    try {
        await connect();
        await userModelSeed();
        await reviewModelSeed();
        await cartModelSeed();
        await bookModelSeed();
        await Seeders.seedRatingModel();
        await Seeders.seedUserModel();
        await Seeders.seedCartModel();
        await Seeders.seedBookModel();
        console.log("db migration successful");
    } catch (error) {
        console.log("error", error);
    }
};

migration();