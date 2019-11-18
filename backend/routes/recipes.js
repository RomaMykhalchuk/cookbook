const express = require("express");
const router = express.Router();

let Recipe = require("../models/recipe.model");

router.route("/").get((request, response) => {
  Recipe.find()
    .sort({createdAt:-1})
    .then(recipes => response.json(recipes))
    .catch(err => response.status(400).json("Error " + err));
});

router.route("/new").post((request, response) => {
  const category = request.body.category;
  const title = String(request.body.title);
  const description = String(request.body.description);

  const newRecipe = new Recipe({
    category,
    title,
    description
  });

  newRecipe
    .save()
    .then(() => response.json("Your recipe was added"))
    .catch(err => response.status(400).json("Error " + err));
});


router.route("/:id").get((request, response) => {
  Recipe.findById(request.params.id)
    .then(recipe => response.json(recipe))
    .catch(err => response.status(400).json("Error " + err));
});

router.route("/:id").delete((request, response) => {
  Recipe.findByIdAndDelete(request.params.id)
    .then(() => response.json('Recipe removed successfully!'))
    .catch(err => response.status(400).json('Error ' + err));
});

router.route("/update/:id").post((request, response) => {
  Recipe.findById(request.params.id)
    .then(recipe => {
      recipe.category = request.body.category;
      recipe.title = String(request.body.title);
      recipe.description = String(request.body.description);
      recipe
        .save()
        .then(() => response.json("recipe updated"))
        .catch(err => response.status(400).json("Error " + err));
    })
    .catch(err => response.status(400).json("Error " + err));
});

module.exports = router;