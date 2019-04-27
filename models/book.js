const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { type: String, required: true },
  authors: { type: String, required: true, default: "Can't find" },
  description: { type: String, required: true, default: "No description" },
  image: { type: String, default: "https://via.placeholder.com/150" },
  link: { type: String, default: "https://books.google.com/" },
  saved: { type: Boolean, default: false }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
