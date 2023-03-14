import React, { useContext, useEffect, useState } from "react";
import EditBtn from "../img/edit.png";
import DeleteBtn from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Single = () => {
  const [post, setPosts] = useState([]);

  const location = useLocation();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post.img}`} alt="" />
        <div className="user">
          {post?.userImg && <img src={post?.userImg} alt="" />}

          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post.data).fromNow()}</p>
          </div>

          {currentUser?.data.username === post?.username && (
            <div className="edit">
              <Link to={`/writepost?edit=${postId}`} state={post}>
                <img src={EditBtn} alt="edit button" />
              </Link>
              <img onClick={handleDelete} src={DeleteBtn} alt="delete button" />
            </div>
          )}
        </div>
        <h1>{post?.title}</h1>
        {getText(post?.desc)}
      </div>
      <Menu cat={post.category} />
    </div>
  );
};

export default Single;
