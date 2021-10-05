import {
  successfulResponse,
  createdResponse,
  badRequestResponse,
  serverErrorResponse,
} from "../helper/response";

import { createChannel, searchChannels, selectChannelToJoin, viewMembers, deleteChannel } from "../services/channel/channel.service"

export default class channelController {
  static async createChannels(request, response) {
    try {
      const { channelName, channelDescription, userIds } = request.body;
      const createdBy = request.user.user._id

      const { status, message, data } = await createChannel(
        channelName,
        channelDescription,
        userIds,
        createdBy
      )

      if (!status) {
        return badRequestResponse({
          response,
          message,
          data
        });
      }

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

  static async searchChannels(request, response) {
    try {
      let { search } = request.query;

      const { status, message, data } = await searchChannels(search)

      if (!status) {
        return badRequestResponse({
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

  static async selectChannelToJoin(request, response) {
    try {
 
      const { channelName } = request.body;
      const loggedUserId = request.user.user._id;

      const { status, message, data } = await selectChannelToJoin(channelName, loggedUserId)

      if (!status) {
        return badRequestResponse({
          response,
          message,
          data
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

  static async viewChannelMembers(request, response) {
    try {
      const { id } = request.params
      const { status, message, data, meta } = await viewMembers(id)

      if (!status) {
        return badRequestResponse({
          response,
          message,
          data
        });
      }

      return successfulResponse({
        response,
        message,
        data,
        meta
      });
    } catch (error) {
      console.log("err", error);
      return serverErrorResponse({
        response,
        message: "something went wrong",
      });
    }
  }
  
  static async deleteChannel(request, response) {
    try {
      const { id } = request.params;
      const { status, message } = await deleteChannel(id);
  
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
