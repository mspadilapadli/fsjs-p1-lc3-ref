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
            // experiment
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
            const { id } = req.params;
            //*try special isntance method sequelize
            const category = await Category.findByPk(id);
            const memes = await category.getMemes({
                where: {
                    isFunny: false,
                },
                order: [["title", "ASC"]],
            });
            //*experiment
            const memesWithStatus = memes.map((meme) => ({
                ...meme.toJSON(),
                status: meme.showStatus(),
            }));

            res.render("detail-categoryId", { category, memesWithStatus });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async showForm(req, res) {
        try {
            const { id } = req.params;
            let categories = await Category.findAll();
            let meme = {};
            let action = `/memes/add`;
            let isEdit = false;

            if (id) {
                meme = await Meme.findByPk(id);
                action = `/memes/${id}/edit`;
                isEdit = true;
            }
            res.render("show-form", {
                categories,
                isEdit,
                action,
                errors: {},
                meme,
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async postAddMeme(req, res) {
        try {
            let { title, author, imageURL, CategoryId } = req.body;
            const payload = { title, author, imageURL, CategoryId };
            await Meme.create(payload);
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
        const { id } = req.params;
        try {
            let { title, author, imageURL, CategoryId } = req.body;
            const payload = { title, author, imageURL, CategoryId };
            const foundMeme = await Meme.findByPk(id);
            if (!foundMeme) {
                throw `Data not found!`;
            }
            await foundMeme.update(payload);

            res.redirect("/");
        } catch (error) {
            const errors = helper.formatValdiateErrors(error);
            if (errors) {
                let categories = await Category.findAll();
                return res.render("show-form", {
                    meme: req.body,
                    categories,
                    action: `/memes/${id}/edit`,
                    isEdit: true,
                    errors,
                });
            }

            res.send(error);
        }
    }
    static async vote(req, res) {
        try {
            const { id } = req.params;

            //*increment with instance method
            const meme = await Meme.findByPk(id);
            if (!meme) throw new Error("Meme not found");
            await meme.increment("votes", { by: 1 });

            //* increment with  static method
            // not recommend , cuz must findByPk again to get CategoryId
            // await Meme.increment(
            //     {
            //         votes: 1,
            //     },
            //     {
            //         where: { id },
            //     },
            // );
            // const meme = await Meme.findByPk(id);

            res.redirect(`/categories/${meme.CategoryId}`);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async funny(req, res) {
        try {
            let { id } = req.params;

            //* instance method
            // const meme = await Meme.findByPk(id);
            // if (!meme) throw new Error("Meme not found");
            // // await meme.update({ isFunny: true });

            //* static method
            await Meme.update(
                { isFunny: true },
                {
                    where: {
                        id,
                    },
                },
            );
            const meme = await Meme.findByPk(id);

            res.redirect(`/categories/${meme.CategoryId}`);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}

module.exports = Controller;
