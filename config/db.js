// require('dotenv').config();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://demo:demo@cluster0.ee4g0.mongodb.net/UserDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));