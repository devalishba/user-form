require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB CONNECTED"))
  .catch(err => console.log(err));


const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String
});

const User = mongoose.model("User", userSchema);


app.post("/create-user", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json({ message: "User saved successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error saving user", error });
  }
});

app.listen(7000, () => console.log("Server running on port 7000"));
