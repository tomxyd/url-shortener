require("dotenv").config();
const mongoose = require("mongoose");
const ShortUrlModel = require("./models/shortUrl");

mongoose.connect(process.env.MONGO_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
});

ShortUrlModel.create(
     {
          original_url: "http://google.com",
          short_url: "1",
     },
     (error, short_url) => {
          console.log(error, short_url);
     }
);
