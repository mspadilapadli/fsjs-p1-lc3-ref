const helper = require("../helper");
const { Meme, Category } = require("../models");
const { Op } = require("sequelize");

class Controller {
    static async readMemes(req, res) {
        try {
            const { q } = req.query;
            const { status, title } = req.query;

            let where = {};
            if (q) where.title = { [Op.iLike]: `%${q}%` };
            let memes = await Meme.findAll({
                where,
                include: {
                    model: Category,
                    attributes: ["name"],
                },
            });
            //* handle FE status
            const memesWithStatus = memes.map((meme) => ({
                ...meme.toJSON(),
                caption: meme.caption,
                status: meme.showStatus(),
                publishedTime: meme.timeAgo,
            }));

            res.render("memes", { memesWithStatus, q, status, title });
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
            const { status } = req.query;

            const listCategories = await Category.findAll();
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

            res.render("detail-categoryId", {
                category,
                memesWithStatus,
                listCategories,
                status,
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async showForm(req, res) {
        try {
            const { id, categoryId } = req.params;
            //handle add from memes
            let categories = await Category.findAll();
            let meme = {};
            let action = `/memes/add`;
            let isEdit = false;
            let from = "memes";

            //handle add from detail category
            if (categoryId) {
                action = `/categories/${categoryId}/add-meme`;
                meme.CategoryId = categoryId;
                from = "categories";
            }

            //hanle edit
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
                from,
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async postAddMeme(req, res) {
        try {
            let { title, author, imageURL, CategoryId, from } = req.body;
            const payload = { title, author, imageURL, CategoryId };
            await Meme.create(payload);

            from === "categories"
                ? res.redirect(`/categories/${CategoryId}?status=added`)
                : res.redirect(`/?status=added`);
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
                    from: req.body.from,
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

            res.redirect("/?status=updated");
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
                    from: req.body.from,
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

    static async deleteMeme(req, res) {
        try {
            const { id } = req.params;
            const delData = await Meme.findByPk(id);
            if (!delData) throw new Error`Data not found!`();
            await delData.destroy();
            res.redirect(
                `/?status=deleted&title=${encodeURIComponent(delData.title)}`,
            );
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}

module.exports = Controller;
