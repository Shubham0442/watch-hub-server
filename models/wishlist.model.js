const mongoose = require("mongoose");

const wishlistchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  suitable_for: { type: String, required: true },
  userId: { type: String, required: true }
});

const Wishlist = mongoose.model("wishlist", wishlistchema);

module.exports = { Wishlist };
