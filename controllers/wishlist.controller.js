const { Router } = require("express");
const { Wishlist } = require("../models/wishlist.model");
const { authentication } = require("../middlewares/authentication");

const wishlistController = Router();

wishlistController.post("/add", authentication, async (req, res) => {
  console.log(req.body);
  try {
    const newItem = new Wishlist(req.body);
    await newItem.save();
    res.status(201).send({ msg: "Item added to bag" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

wishlistController.get("/:userId", authentication, async (req, res) => {
  const { userId } = req.params;
  try {
    const wishlistItems = await Wishlist.find({ userId });
    res.status(201).send({ wishlist: wishlistItems });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

wishlistController.delete("/remove/:id", authentication, async (req, res) => {
  const { userId } = req.query;
  const { id } = req.params;

  try {
    const bagItems = await Wishlist.findByIdAndDelete({ _id: id, userId });
    res.status(201).send({ msg: "Item removed" });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

module.exports = { wishlistController };
