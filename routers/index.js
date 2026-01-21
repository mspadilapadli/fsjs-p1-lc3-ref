const Controller = require("../controllers/controller");

const router = require("express").Router();

//read
router.get("/", Controller.readMemes);
router.get("/categories", Controller.readCategories);
router.get("/categories/:id", Controller.detailMeme);

//add
router.get("/memes/add", Controller.showForm);
router.post("/memes/add", Controller.postAddMeme);

//edit
router.get("/memes/:id/edit", Controller.showForm);
router.post("/memes/:id/edit", Controller.postEditMeme);
router.get("/memes/:id/vote", Controller.vote);
router.get("/memes/:id/funny", Controller.funny);

//delete
router.get("/memes/:id/delete", Controller.deleteMeme);

module.exports = router;
