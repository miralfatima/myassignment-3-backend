var mongoose = require("mongoose");
const Joi = require("joi");

var categoriesSchema = mongoose.Schema({
	type: String,
	brand: String,
	name: String,
	price: String,
});
const Category = mongoose.model("Category", categoriesSchema);

module.exports = Category;
