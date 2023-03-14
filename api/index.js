import express from "express";

import postsRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use("/api/posts", postsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

// app.get("/api/v1/books", (req, res) => {
//   const q = "SELECT * FROM books";

//   db.query(q, (err, results) => {
//     if (err) {
//       res.json({ error: err });
//     }
//     res.json(results);
//   });
// });

// app.post("/api/v1/books", (req, res) => {
//   console.log(req.body, "req.body");
//   const q = "INSERT INTO books (`title`,`description`,`cover`) VALUES (?)";
//   const values = [req.body.title, req.body.description, req.body.cover];

//   db.query(q, [values], (err, results) => {
//     if (err) {
//       res.json({ error: err });
//     }
//     res.json({
//       status: "success",
//       message: "Add new book successfully",
//     });
//   });
// });

// app.delete("/api/v1/books/:id", (req, res) => {
//   const bookID = req.params.id;
//   const q = "DELETE FROM books WHERE id = ?";

//   db.query(q, [bookID], (err, results) => {
//     if (err) {
//       res.json({ error: err });
//     }
//     res.json({
//       status: "success",
//       message: "Delete book successfully",
//     });
//   });
// });

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
