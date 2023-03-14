import { db } from "../db.js";
import jwt from "jsonwebtoken";
export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE category=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(data);
  });
};
export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`,`title`,`desc`, p.img, u.img AS userImg, `category`,`date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    console.log(data[0]);
    res.status(200).json(data[0]);
  });
};
export const addPost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: "Not Unauthorized" });
  }

  // verify token
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ error: "Token is not valid" });
    }

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `category`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};
export const deletePost = (req, res) => {
  // Check if the user is the owner of the post using token
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: "Not Unauthorized" });
  }

  // verify token
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ error: "Token is not valid" });
    }

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
    console.log(postId, "post id");

    db.query(q, [postId, userInfo.id], (err, data) => {
      console.log(userInfo, "user info");

      if (err) {
        return res
          .status(403)
          .json({ message: "you can only delete your post", error: err });
      }
      return res.status(200).json({ message: "Post deleted" });
    });
  });
};
export const updatePost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ error: "Not Unauthorized" });
  }

  // verify token
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json({ error: "Token is not valid" });
    }

    const postId = req.params.id;

    const q =
      "UPDATE posts SET `title=?`,`desc=?`,`img=?`,`category=?` WHERE `id`=? AND `uid`=?";
    const values = [
      userInfo.id,
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.category,
    ];

    console.log(values, "updated values");

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "failed update post", error: err });
      }
      return res
        .status(200)
        .json({ message: "Post has been updated succesfully " });
    });
  });
};
