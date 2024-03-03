const { Router } = require("express");
const { Bag } = require("../models/bag.model");

const bagController = Router();

bagController.post("/add", async (req, res) => {
  try {
    const newItem = new Bag(req.body);
    await newItem.save();
    res.status(201).send({ msg: "Item added to bag" });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

bagController.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const bagItems = await Bag.find({ userId });
    res.status(201).send({ bag: bagItems });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

bagController.delete("/remove/:id", async (req, res) => {
  const { userId } = req.query;
  const { id } = req.params;

  try {
    const bagItems = await Bag.findByIdAndDelete({ _id: id, userId });
    res.status(201).send({ msg: "Item removed" });
  } catch (error) {
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

module.exports = { bagController };
