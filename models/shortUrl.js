const mongoose = require("mongoose");
const shortid = require("shortid");
const Schema = mongoose.Schema;

const ShortUrlSchema = new Schema({
     original_url: {
          type: String,
          required: true,
     },
     short_url: {
          type: String,
          default: shortid.generate,
          required: true,
     },
});

const ShortUrlModel = mongoose.model("ShortUrlModel", ShortUrlSchema);
module.exports = ShortUrlModel;
