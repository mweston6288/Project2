const db = require("../models");

module.exports = (app) => {
    app.get("/api/wishlist/:id", (req, res) => {
        console.log(req)
        db.User_Wishlist.findAll({
            where: {
                userId: req.query.id
            }
        }).then((dbWishlist) => {
            res.json(dbWishlist);
        });
    });

    app.get("/api/wishlist", (req, res) => {
        db.Wishlist.findOne({
            where:  {
                id: req.params.id
            },
        }).then((dbWishlist) => {
            res.json(dbWishlist);
        });
    });

    app.post("/api/wishlist", (req, res) => {
        console.log(req.body);
        db.User_Wishlist.create({
            UserId: req.body.userID,
            GameId: req.body.id,
        }).then(((dbWishlist) => {
            res.json(dbWishlist);
        }));
    });

    app.delete("/api/wishlist", (req, res) => {
        db.Wishlist.destroy(req.body).then((dbWishlist) => {
            res.json(dbWishlist);
        });
    });
};