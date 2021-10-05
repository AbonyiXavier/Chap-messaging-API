import jwt from "jsonwebtoken";
import { unauthorizedResponse, serverErrorResponse } from "../helper/response";
const dotenv = require("dotenv");
dotenv.config();

/* eslint consistent-return: off */
const verifyToken = async (request, response, next) => {
  const token = request.cookies.token || request.header("Authorization");
  try {
    if (!token) {
      return unauthorizedResponse({
        response,
        message: "Access Denied",
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    request.user = decoded;
    next();
  } catch (error) {
    console.log("error", error);
    return serverErrorResponse({
      response,
      message: "something went wrong",
    });
  }
};
export default verifyToken;
