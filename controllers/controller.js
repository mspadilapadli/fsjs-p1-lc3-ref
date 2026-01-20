const helper = require("../helper");
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
            // });63
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
            // console.log(req.params);
            let { id } = req.params;
            // res.send(`ini read category Id`)
            let data = await Category.findByPk(id, {
                include: {
                    model: Meme,
                    where: {
                        isFunny: false,
                    },
                    order: [["name", "ASC"]],
                },
            });
            // console.log(data);
            // res.send(data);
            res.render("show-categoryId", {
                title: `List Meme by Category`,
                data,
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async showForm(req, res) {
        try {
            let categories = await Category.findAll();
            let action = `/memes/add`;
            let isEdit = false;
            res.render("show-form", {
                categories,
                isEdit,
                action,
                errors: {},
                meme: {},
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async postAddMeme(req, res) {
        try {
            let { title, author, imageURL, CategoryId } = req.body;
            await Meme.create({ title, author, imageURL, CategoryId });
            res.redirect(`/`);
        } catch (error) {
            const errors = helper.formatValdiateErrors(error);
            if (errors) {
                let categories = await Category.findAll();
                return res.render("show-form", {
                    meme: req.body,
                    categories,
                    action: `/memes/add`,
                    isEdit: false,
                    errors,
                });
            }

            res.send(error);
        }
    }

    static async postEditMeme(req, res) {
        try {
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async vote(req, res) {
        try {
            let { id } = req.params;
            // res.send(`ini vote meme`);

            await Meme.increment(
                { votes: 1 },
                {
                    where: { id },
                },
            );
            res.redirect(`/categories/${id}`);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async funny(req, res) {
        try {
            let { id } = req.params;
            await Meme.update(
                { isFunny: true },
                {
                    where: {
                        id,
                    },
                },
            );
            // res.send(`ini funny`);
            res.redirect(`/categories/${id}`);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}

module.exports = Controller;
