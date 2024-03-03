const mongoose = require("mongoose");

const bagSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  suitable_for: { type: String, required: true },
  userId: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const Bag = mongoose.model("bag", bagSchema);

module.exports = { Bag };
