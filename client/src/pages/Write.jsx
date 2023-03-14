import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;

  console.log(state, "state in write");

  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(state?.img || null);
  const [category, setCategory] = useState(state?.category || "");

  const navigate = useNavigate();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleImgUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSelectedCategory = (e) => {
    setCategory(e.target.value);
  };
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            category,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            category,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={handleTitle}
          value={title}
        />
        <div className="editorContainer">
          <ReactQuill
            className="textarea"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={handleImgUpload}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              name="category"
              value="techstuff"
              id="techstuff"
              onChange={handleSelectedCategory}
              checked={category === "techstuff"}
            />
            <label htmlFor="techstuff">Tech Stuff</label>
          </div>

          <div className="cat">
            <input
              type="radio"
              name="category"
              value="knowme"
              id="knowme"
              onChange={handleSelectedCategory}
              checked={category === "knowme"}
            />
            <label htmlFor="knowme">Know Me</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
