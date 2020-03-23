const db = require("../models");

module.exports = (app) => {
  app.get("https://api.rawg.io/api/wishlist", (req, res) => {
    db.Wishlist.findAll({
      where: devQuery, pubQuery,
      include: [db.Developer] [db.Publisher]
    }).then((dbWishlist) => {
      res.json(dbWishlist);
    });
  });

  app.get("https://api.rawg.io/api/wishlist/:name", (req, res) => {
    db.Wishlist.findOne({
      where:  {
        name: req.params.name
      },
    }).then((dbWishlist) => {
      res.json(dbWishlist);
    });
  });

  app.post("/api/wishlist", (req, res) => {
    db.Wishlist.create(req.body).then(((dbWishlist) => {
      res.json(dbWishlist);
    }));
  });

  app.delete("/api/wishlist", (req, res) => {
    db.Wishlist.destroy(req.body).then((dbWishlist) => {
      res.json(dbWishlist);
    });
  });
};