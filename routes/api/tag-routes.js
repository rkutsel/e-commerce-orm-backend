const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
	// FIND ALL:
	Tag.findAll({
		include: [
			{
				model: Product,
				required: true,
				through: { model: ProductTag, attributes: [] },
			},
		],
		limit: 100,
	})
		.then((allTags) => res.status(202).json(allTags))
		.catch((err) => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
	// FIND ONE:
	Tag.findOne({
		where: { id: req.params.id },
		include: [
			{
				model: Product,
				required: true,
				through: { model: ProductTag, attributes: [] },
			},
		],
	})
		.then((tagId) => res.status(202).json(tagId))
		.catch((err) => {
			console.log(err);
			res.status(400).send(err);
		});
});

router.post("/", (req, res) => {
	// CREATE: {"tag_name": "purple"}
	Tag.create(req.body)
		.then((newTag) => {
			res.status(200).json(newTag);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

router.put("/:id", (req, res) => {
	// PUT: { "id": 4, "tag_name": "gray"}
	Tag.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then(() => {
			res.status(200).json(req.body);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.delete("/:id", (req, res) => {
	// DELETE: { "id": 4 }
	Tag.findOne({ where: { id: req.body.id } })
		.then((tagName) => {
			Tag.destroy({ where: { id: req.body.id } });
			return tagName;
		})
		.then((tagName) => res.status(200).json(tagName))
		.catch((err) => {
			res.status(400).json(err);
		});
});

module.exports = router;
