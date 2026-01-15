const Controller = require("../controllers/controller");

const router = require("express").Router();

//read
router.get("/", Controller.readMemes);
router.get("/categories", Controller.readCategories);
router.get("/categories/:id", Controller.detailMeme);

//add
router.get("/memes/add", Controller.showForm);
router.post("/memes/add", Controller.postAdd);

//edit
router.get("/memes/:id/vote", Controller.vote);
router.get("/memes/:id/funny", Controller.funny);

module.exports = router;
