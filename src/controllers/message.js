import {
  successfulResponse,
  createdResponse,
  badRequestResponse,
  serverErrorResponse,
} from "../helper/response";

import { postMessageInChannel, fetchConversationInChannel, markMessageRead, deleteMessage } from "../services/message/message.service";

export default class messageController {
  static async createMessageInChannel(request, response) {
    try {
      const { messageText, channelId } = request.body;
      const userWhoPostedMsg = request.user.user._id;

      const { status, message, data } = await postMessageInChannel(channelId, messageText,  userWhoPostedMsg)

      global.io.sockets.in(channelId).emit('post message', data)

      if (!status) {
        return badRequestResponse({
          response,
          message,
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

  static async fetchConversationInChannel(request, response) {
    try {
      const { channelId } = request.params;

      const { status, message, data } = await fetchConversationInChannel(channelId)


      if (!status) {
        return badRequestResponse({
          response,
          message,
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


  static async markMessageRead(request, response) {
    try {
      const { channelId } = request.body;
      const currentUserOnlineId = request.user.user._id;

      const { status, message, data } = await markMessageRead(channelId, currentUserOnlineId)


      if (!status) {
        return badRequestResponse({
          response,
          message,
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

  static async deleteMessage(request, response) {
    try {
      const { id } = request.params;
      const { status, message } = await deleteMessage(id);
  
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
