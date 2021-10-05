import joi from "joi";
import User from "../Models/user";
import bcryptHelper from '../authService/bcrypt';
import {
  badRequestResponse,
  serverErrorResponse,
} from '../helper/response';
const { comparePassword } = bcryptHelper;

export default class Validation {
  static async validateSignupDetails(request, response, next) {
    try {
      const schema = joi.object().keys({
        firstName: joi.string().max(255).required(),
        lastName: joi.string().max(255).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
      });
      await schema.validateAsync(request.body);
      return next();
    } catch (error) {
      console.log('validate', error);
      return response
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
  }

  static async validateLoginDetails(request, response, next) {
    try {
      const schema = joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
      });
      await schema.validateAsync(request.body);
      return next();
    } catch (error) {
      return response
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
  }

  static async validatePassword(request, response, next) {
    try {
      const { email, password } = request.body;
      const user = await User.findOne({ email });
      if (!user) {
        return badRequestResponse({
          response,
          message: 'Invalid email/password combination.',
        });
      }
      const passwordMatch = await comparePassword(user.password, password);

      if (!passwordMatch) {
        return badRequestResponse({
          response,
          message: 'Incorrect email/password combination.',
        });
      }
      return next();
    } catch (error) {
      console.log('error', error);

      return serverErrorResponse({
        response,
        message: 'something went wrong',
      });
    }
  }
}
