import express from "express";

// create users routes
const usersRoutes = express.Router();

usersRoutes.get("/", (req, res) => {
  res.json("users");
});

export default usersRoutes;
