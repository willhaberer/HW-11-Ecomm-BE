const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const catData = await Category.findAll();
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // TO DO: be sure to include its associated Products
  try {
    const catData = await Category.findByPk(req.params.id);

    if (!catData) {
      res.status(404).json({ message: "No Category found with that id!" });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const catData = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const catData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!catData[0]) {
      res.status(404).json({ message: "No Category with this id!" });
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!catData) {
      res.status(404).json({ message: "No Category found with this id!" });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
