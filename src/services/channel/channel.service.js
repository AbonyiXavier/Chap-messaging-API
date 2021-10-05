import Channel from "../../Models/channel";

export const createChannel = async (
  channelName,
  channelDescription,
  userIds,
  createdBy
) => {
  try {
    const availableChannel = await Channel.findOne({
      channelName,
      deleted: false
    });

    if (availableChannel) {
      return {
        status: false,
        message: `Retrieve existing channnel ${availableChannel.channelName}`,
        data: {
          channelId: availableChannel._id,
          channelName: availableChannel.channelName,
        },
      };
    }

    const channel = await Channel.create({
      channelName,
      channelDescription,
      userIds: [createdBy],
      createdBy,
    });

    return {
      status: true,
      message: "Channel created successfully!",
      data: channel,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};

export const searchChannels = async (search) => {
  try {
    const searchQueries = {
      $and: [
        {
          $or: [
            {
              channelName: { $regex: new RegExp(search), $options: "i" },
            },
          ],
        },
      ],
    };

    const channel = await Channel.find(searchQueries, { deleted: false, __v: 0 })
      .populate("createdBy")
      .exec();

    return {
      status: true,
      message: "Channels fetched successfully",
      data: channel,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};

export const selectChannelToJoin = async (channelName, loggedUserId) => {
  try {
    const data = new Channel({
      channelName,
    });

    if (!data) {
      return {
        status: false,
        message: "Invalid channel",
      };
    }

    await Channel.findOneAndUpdate(
      {
        _id: data.channelName,
        deleted: false
      },
      {
        $push: { userIds: loggedUserId },
      }
    );

    return {
      status: true,
      message: "You have successfully Joined the channel",
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};

export const viewMembers = async (id) => {
  try {
    const members = await Channel.findOne({ _id: id, deleted: false })
      .populate("createdBy")
      .populate("userIds")
      .exec();

    if (!members || members.deleted === true) {
      return {
        status: false,
        message: "Invalid channel",
      };
    }
   
    return {
      status: true,
      message: "Members fetched successfully!",
      meta: {
          totalMembers: members.userIds.length
      },
      data: members,
    };
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};

export const deleteChannel = async (id) => {
  try {
    const channel = await Channel.findOne({ _id: id, deleted: false }).exec();
    if (!channel || channel.deleted === true) {
      return {
        status: false,
        message: "Invalid channel.",
      };
    }
    channel.deleted = true;
    await channel.save();
    return {
      status: true,
      message: "channel deleted successfully!",
    };
    
  } catch (error) {
    console.log("error", error);
    return {
      status: false,
      message: "Something went wrong",
    };
  }
};