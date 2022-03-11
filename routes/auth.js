const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config/database");

router.post("/register", (req, res, next) => {
  if (req.body.password && req.body.name && req.body.email) {
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(newUser);
    User.addUser(newUser, (err, user) => {
      if (err) {
        console.log(err);
        res.json({ success: false, msg: "Error al registrar el usuario" });
      } else {
        res.json({ success: true, msg: "Usuario registrado: ", user: newUser });
      }
    });
  } else {
    res.json({ success: false, msg: "Información incompleta" });
  }
});

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "Usuario no encontrado" });
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ user }, config.secret, {
          expiresIn: 604800, // 1 week
        });
        res.json({
          success: true,
          token: "JWT " + token,
          user: {
            id: user._id,
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
          },
        });
      } else {
        return res.json({ success: false, msg: "Contraseña incorrecta" });
      }
    });
  });
});

module.exports = router;
