var express = require("express");
var router = express.Router();
var checkSessionAuth = require("../middlewares/checkSessionAuth");
var Category = require("../models/categories");
//console.log(Category);
/* GET home page. */
router.get("/", async function (req, res, next) {
	let categorys = await Category.find();
	console.log(req.session.user);
	res.render("categorys/list", { title: "Products In Our Store", categorys });
});

router.get("/add", checkSessionAuth, async function (req, res, next) {
	res.render("categorys/add");
});

router.post("/add", async function (req, res, next) {
	let category = new Category(req.body);
	await category.save();
	res.redirect("/categorys");
});
router.get("/delete/:id", async function (req, res, next) {
	let category = await Category.findByIdAndDelete(req.params.id);
	res.redirect("/categorys");
});

//for edit
router.get("/edit/:id", async function (req, res, next) {
	let category = await Category.findById(req.params.id);
	res.render("categorys/edit", { category });
});
router.post("/edit/:id", async function (req, res, next) {
	let category = await Category.findById(req.params.id);

	category.type = req.body.type;
	category.brand = req.body.brand;
	category.name = req.body.name;
	category.price = req.body.price;

	await category.save();
	res.redirect("/categorys");
});

//add to cart
router.get("/cart/:id", async function (req, res, next) {
	let category = await Category.findById(req.params.id);
	let cart = [];
	if (req.cookies.cart) cart = req.cookies.cart;
	cart.push(category);
	res.cookie("cart", cart);
	res.redirect("/categorys");
});
//remove from cart
router.get("/cart/remove/:id", async function (req, res, next) {
	let cart = [];
	if (req.cookies.cart) cart = req.cookies.cart;
	cart.splice(
		cart.findIndex((c) => c._id == req.params.id),
		1
	);
	res.cookie("cart", cart);
	res.redirect("/cart");
});
module.exports = router;
