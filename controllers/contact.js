"use strict";
const Contact = require("../models/contact");
const User = require("../models/user");

/** create function to create Contact. */
exports.create = function (req, res) {
  console.log(req.body);
  if (req.body.email)
    User.findOne({ email: req.body.email }, function (err, user) {
      console.log(err);
      console.log(user);
      if (!err && user != null) {
        let x = {
          name: req.body.name,
          email: req.body.email,
          user: user._id,
        };
        Contact.create(x, function (err, result) {
          console.log(user);
          if (!err) {
            return res.json({ success: true, data: result });
          } else {
            return res.json({ success: false, msg: "Error al crear contacto" }); // 500 error
          }
        });
      } else {
        return res.json({
          success: false,
          msg: "Error no se encontro el usuario",
        }); // 500 error
      }
    });
};

/** getContact function to get Contact by id. */
exports.get = function (req, res) {
  Contact.getAll({ userFrom: req.params.id }, function (err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });
};

exports.getAll = function (req, res) {
  Contact.getAll({}, function (err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });
};

exports.getByUsuario = function (req, res) {
  Contact.getAll({ usuario: req.params.usuario }, function (err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });
};

/** updateContact function to update Contact by id. */
exports.update = function (req, res) {
  Contact.updateById(req.params.id, req.body, function (err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });
};

/** removeContact function to remove Client by id. */
exports.delete = function (req, res) {
  Contact.removeById({ _id: req.params.id }, function (err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });
};
