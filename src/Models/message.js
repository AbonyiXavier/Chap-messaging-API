const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MESSAGE_TYPES = {
  TYPE_TEXT: "text",
};

const readBySchema = new Schema(
  {
    _id: false,
    readByUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  
    readAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: false,
  }
);

const MessageSchema = new Schema(
  {
    channelId: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // messageText: {
    //   type: String,
    //   required: true,
    // },
    messageText: {
      type: Schema.Types.Mixed,
      required: true,
    },
    messageType: {
      type: String,
      default: () => MESSAGE_TYPES.TYPE_TEXT,
    },
    readBy: [readBySchema],
    
    deleted: {
      type: Boolean,
      index: true,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
