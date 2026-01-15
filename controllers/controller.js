const { Meme, Category } = require("../models");

class Controller {
    static async readMemes(req, res) {
        try {
            let memes = await Meme.findAll({
                include: {
                    model: Category,
                    attributes: ["name"],
                },
            });
            res.render("memes", { memes });
            //experiment
            // const memeswithStatus = memes.map((e) => {
            //     e.status = e.showStatus();
            //     return e;
            // });
            // const status = memes.showStatus();
            // console.log(memeswithStatus);
            // res.send(memeswithStatus);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async readCategories(req, res) {
        try {
            const categories = await Category.findAll();

            res.render("categories", { categories });
            // res.send(categories);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async detailMeme(req, res) {
        try {
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async showForm(req, res) {
        try {
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async postAdd(req, res) {
        try {
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async vote(req, res) {
        try {
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async funny(req, res) {
        try {
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}

module.exports = Controller;
