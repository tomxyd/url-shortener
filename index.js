require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ShortUrlModel = require("./models/shortUrl");

const app = express();

mongoose.connect(process.env.MONGO_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
});

app.use("/public", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
     res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/shorturl", async (req, res) => {
     await ShortUrlModel.create({ original_url: req.body.url }, (error, short_url) => {
          console.log(error, short_url);
     });
     res.redirect("/");
});

app.get("/api/shorturl/:short_url", async (req, res) => {
     const shortUrl = await ShortUrlModel.findOne({ short_url: req.params.short_url }, (error) => console.log(error)).clone();
     if (shortUrl == null) return res.sendStatus(404);
     shortUrl.save();
     res.redirect(shortUrl.original_url);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to server at port ${PORT}`));
