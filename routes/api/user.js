const UserController = require("../../controllers/user");

module.exports = function (router) {
  router.post("/user", UserController.create);
  router.get("/user", UserController.getAll);
  router.get("/user/:id", UserController.get);
  router.get("/user/email/:email", UserController.getByEmail);
  router.put("/user/:id", UserController.update);
  router.delete("/user/:id", UserController.delete);
};
