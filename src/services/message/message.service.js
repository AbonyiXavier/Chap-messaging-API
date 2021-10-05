import Message from "../../Models/message";
import Channel from "../../Models/channel";

export const postMessageInChannel = async (
  channelId,
  messageText,
  postedBy
) => {
  try {
    const postmessage = await Message.create({
      channelId,
      messageText,
      postedBy,
      readBy: { readByUserId: postedBy },
    });

    return {
      status: true,
      message: "Message sent successfully",
      data: postmessage,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};

export const fetchConversationInChannel = async (channelId) => {
  try {
    const channel = await Channel.findOne({ _id: channelId, deleted: false })
      .populate("userIds")
      .populate("createdBy")
      .exec();

    if (!channel || channel.deleted === true) {
      return {
        status: false,
        message: "No channel exists",
      };
    }

    const message = await Message.findOne({
      channelId: channelId,
      deleted: false
    })
      .populate("postedBy")
      .populate("readBy")
      .exec();

    return {
      status: true,
      message: "Messages fetched successfully!",
      data: {
        message,
        channel,
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};

export const markMessageRead = async (channelId, currentUserOnlineId) => {
  try {
    const channel = await Channel.findOne({ _id: channelId, deleted: false }).exec();

    if (!channel || channel.deleted === true) {
      return {
        status: false,
        message: "No channel exists",
      };
    }
    const readMessage = await Message.updateMany(
      {
        channelId,
        "readBy.readByUserId": { $ne: currentUserOnlineId },
        deleted: false
      },

      {
        $set: { readBy: { readByUserId: currentUserOnlineId } },
      },
      {
        multi: true,
      }
    );

    return {
      status: true,
      message: "read",
      data: readMessage,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};

export const deleteMessage = async (id) => {
  try {
    const message = await Message.findOne({ _id: id, deleted: false }).exec();
    if (!message || message.deleted === true) {
      return {
        status: false,
        message: "Invalid channel.",
      };
    }
    message.deleted = true;
    await message.save();
    return {
      status: true,
      message: "message deleted successfully!",
    };
    
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};