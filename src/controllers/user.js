import {
  successfulResponse,
  createdResponse,
  badRequestResponse,
  serverErrorResponse,
} from "../helper/response";
import {
  createUser,
  loginUser,
  fectchUsers,
  fectchSingleUser,
  updateUser,
  deleteUser,
} from "../services/user/user.service";

export default class userController {
  static async registerUsers(request, response, next) {
    try {
      const { firstName, lastName, email, password } = request.body;
      const { status, message, data } = await createUser(
        firstName,
        lastName,
        email,
        password
      );

      if (!status) {
        return badRequestResponse({
          response,
          message,
        });
      }

      response.cookie("accessToken", data.token);

      return createdResponse({
        response,
        message,
        data,
      });
    } catch (error) {
      console.log("err", error);
      return serverErrorResponse({
        response,
        message: "something went wrong",
      });
    }
  }

  static async login(request, response) {
    try {
      const { email } = request.body;

      const { status, message, data } = await loginUser(email);

      if (!status) {
        return badRequestResponseponse({
          response,
          message,
        });
      }

      response.cookie("accessToken", data.token);

      return successfulResponse({
        response,
        message,
        data,
      });
    } catch (error) {
      console.log("err", error);
      return serverErrorResponse({
        response,
        message: "something went wrong",
      });
    }
  }

  static async fetchAllUsers(request, response) {
    try {
      let { page, limit } = request.query;

      const { status, message, data, meta } = await fectchUsers(page, limit);

      if (!status) {
        return badRequestResponseponse({
          response,
          message,
        });
      }

      return successfulResponse({
        response,
        message,
        meta,
        data,
      });
    } catch (error) {
      console.log("err", error);
      return serverErrorResponse({
        response,
        message: "something went wrong",
      });
    }
  }

  static async fetchUser(request, response) {
    try {
      const { id } = request.params;
      const { status, message, data } = await fectchSingleUser(id);

      if (!status) {
        return badRequestResponseponse({
          response,
          message,
        });
      }

      return successfulResponse({
        response,
        message,
        data,
      });
    } catch (error) {
      console.log("err", error);
      return serverErrorResponse({
        response,
        message: "something went wrong",
      });
    }
  }

  static async updateProfile(request, response) {
    try {
      const photo = request.file.location;
      const loggedUserId = request.user.user._id;
      const { status, message } = await updateUser(loggedUserId, photo);

      if (!status) {
        return badRequestResponseponse({
          response,
          message,
        });
      }

      return successfulResponse({
        response,
        message,
      });
    } catch (error) {
      console.log("err", error);
      return serverErrorResponse({
        response,
        message: "something went wrong",
      });
    }
  }
  static async deleteUserAccount(request, response) {
    try {
      const { id } = request.params;
      const { status, message } = await deleteUser(id);

      if (!status) {
        return badRequestResponse({
          response,
          message,
        });
      }

      return successfulResponse({
        response,
        message,
      });
    } catch (error) {
      console.log("err", error);
      return serverErrorResponse({
        response,
        message: "something went wrong",
      });
    }
  }
}
