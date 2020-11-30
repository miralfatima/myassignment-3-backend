var express = require("express");
var router = express.Router();
var checkSessionAuth = require("../middlewares/checkSessionAuth");
var OfferProduct = require("../models/Offer_products");

/* GET users listing. */
router.get("/", async function (req, res, next) {
	let offers = await OfferProduct.find();
	//console.log(req.session.user);
	res.render("offers/list", { title: "Here are Our Sales ", offers });
});
router.get("/", function (req, res, next) {
	res.render("offers/list");
});
//add
router.get("/add", async function (req, res, next) {
	res.render("offers/add");
});

router.post("/add", async function (req, res, next) {
	let offers = new OfferProduct(req.body);
	await offers.save();
	res.redirect("/offers");
});
//delete
router.get("/delete/:id", checkSessionAuth, async function (req, res, next) {
	let offers = await OfferProduct.findByIdAndDelete(req.params.id);
	res.redirect("/offers");
});
module.exports = router;
