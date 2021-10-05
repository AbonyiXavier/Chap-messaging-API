const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
  channelName: {
    type: String,
    required: true,
  },
  channelDescription: {
    type: String,
    required: true,
  },
  userIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  deleted: {
    type: Boolean,
    index: true,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Channel", ChannelSchema);
