const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { signupController } = require("./controllers/signup.controller");
const { loginController } = require("./controllers/login.controller");
const { watchController } = require("./controllers/watch.controller");
const { bagController } = require("./controllers/bag.controller");
const { wishlistController } = require("./controllers/wishlist.controller");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/signup", signupController);
app.use("/login", loginController);
app.use("/watch", watchController);
app.use("/wishlist", wishlistController);
app.use("/bag", bagController);

const PORT = process.env.PORT || 5050;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`app is running on http://localhost:${PORT}`);
  } catch (error) {
    console.log("err:", error);
  }
});
