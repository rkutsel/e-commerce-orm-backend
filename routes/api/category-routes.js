const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
	// FIND ALL:
	Category.findAll({
		include: [{ model: Product, required: true }],
		limit: 100,
	})
		.then((allCategories) => res.status(202).json(allCategories))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

router.get("/:id", (req, res) => {
	// FIND ONE:
	Category.findOne({
		include: [{ model: Product, required: true }],
		where: { id: req.params.id },
	})
		.then((categoryName) => res.status(202).json(categoryName))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

router.post("/", (req, res) => {
	// CREATE: {"category_name": "Desktops"}
	Category.create(req.body)
		.then((newCategory) => {
			res.status(200).json(newCategory);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

router.put("/:id", (req, res) => {
	// PUT: { "id": 4, "category_name": "Laptops"}
	Category.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then(() => res.status(200).json(req.body))
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.delete("/:id", (req, res) => {
	// DELETE: { "id": 4 }
	Category.findOne({ where: { id: req.body.id } })
		.then((categoryName) => {
			Category.destroy({ where: { id: req.body.id } });
			return categoryName;
		})
		.then((categoryName) => res.status(200).json(categoryName))
		.catch((err) => {
			res.status(400).json(err);
		});
});

module.exports = router;
