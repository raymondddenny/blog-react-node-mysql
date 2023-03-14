import { response } from "express";
import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signin = (req, res) => {
  // CHECK IF USER EXISTS
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      return res.json({ error: err });
    }
    if (data.length > 0) {
      // CHECK IF PASSWORD IS CORRECT
      const validPassword = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
      if (validPassword) {
        const jwtToken = jwt.sign({ id: data[0].id }, "jwtkey");

        return res
          .cookie("access_token", jwtToken, { httpOnly: true })
          .status(200)
          .json({
            message: "Login successfully",
            data: {
              username: data[0].username,
            },
          });
      } else {
        return res.status(401).json({ message: "Wrong username or password" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  });
};

export const signout = (req, res) => {
  res
    .clearCookie("access_token", { sameSite: "none", secure: true })
    .status(200)
    .json({
      message: "Signout successfully",
    });
};

export const register = (req, res) => {
  console.log(req.body, "register data from BE");
  // CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) {
      return res.json({ error: err });
    }
    if (data.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      // HASH THE PASSWORD AND CREATE NEW USER
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const q =
        "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
      const values = [req.body.username, req.body.email, hash];

      db.query(q, [values], (err, data) => {
        if (err) {
          return res.json({ error: err });
        }
        return res.status(201).json({ message: "User created successfully" });
      });
    }
  });
};
