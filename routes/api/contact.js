const ContactController = require("../../controllers/contact");

module.exports = function (router) {
  router.post("/contact", ContactController.create);
  router.get("/contact", ContactController.getAll);
  router.get("/contact/:id", ContactController.get);
  router.put("/contact/:id", ContactController.update);
  router.delete("/contact/:id", ContactController.delete);
};
