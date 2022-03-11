const MessageController = require("../../controllers/message");

module.exports = function (router) {
  router.post("/message", MessageController.create);
  router.get("/message", MessageController.getAll);
  router.get("/message/:to/:from", MessageController.getToFrom);
  router.get("/message/:id", MessageController.get);
  router.put("/message/:id", MessageController.update);
  router.delete("/message/:id", MessageController.delete);
};
