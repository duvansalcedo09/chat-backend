"use strict";
var Message = require("../models/message");

/** create function to create Message. */
exports.create = function (req, res) {
  Message.create(req.body, function (err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });
};

exports.getToFrom = function (req, res) {
  Message.getAll(
    {
      $or: [{ to: req.params.to }, { from: req.params.to }],
    },
    function (err, result) {
      if (!err) {
        return res.json(result);
      } else {
        return res.send(err); // 500 error
      }
    }
  );
};

/** getCompany function to get Message by id. */
exports.get = function (req, res) {
  Message.get({ _id: req.params.id }, function (err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });
};

exports.getAll = function (req, res) {
  Message.getAll({}, function (err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });
};

exports.getByUsuario = function (req, res) {
  Message.getAll({ usuario: req.params.usuario }, function (err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });
};

/** updateCompany function to update Message by id. */
exports.update = function (req, res) {
  Message.updateById(req.params.id, req.body, function (err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });
};

/** removeCompany function to remove Client by id. */
exports.delete = function (req, res) {
  Message.removeById({ _id: req.params.id }, function (err, result) {
    if (!err) {
      return res.json(result);
    } else {
      return res.send(err); // 500 error
    }
  });
};
