const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const mongoosePaginate = require("mongoose-paginate-v2");
const { appConfig } = require("../../configs/appConfig");

const dataSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    article: { type: String, required: true },
    email: { type: String, required: true },
    tags: [{ type: String, required: false, default: [] }],
    hasProfanity: { type: Boolean, required: false, default: false },
    fileUrls: [
      {
        type: String,
        required: false,
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
      required: false,
    },
    // expireAt: {
    //   required: false,
    //   type: Date,
    //   default: Date.now() + appConfig.expiresAfterMinutes * 60 * 1000,
    //   index: { expires: 0 },
    // },
  },
  {
    timestamps: true,
  }
);
dataSchema.plugin(mongoosePaginate);
// dataSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model("Data", dataSchema);
