import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: {
      type: String,
      default: "",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      default: "",
    },
    gif: {
      type: String,
      default: "",
    },
    replySnapshot: {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      text: { type: String, default: "" },
      img: { type: String, default: "" },
      gif: { type: String, default: "" },
      isLink: { type: Boolean, default: false },
      _id: false, // Prevent Mongoose from adding _id to subdoc
    },
    deletedBy: {
      type: Map,
      of: Boolean,
      default: {},
    },
    isLink: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
