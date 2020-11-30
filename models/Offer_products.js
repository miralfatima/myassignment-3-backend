var mongoose = require("mongoose");
const Joi = require("joi");

var OfferSchema = mongoose.Schema({
	name: String,
	price: String,
});
const OfferProduct = mongoose.model("OferProduct", OfferSchema);

module.exports = OfferProduct;
