import React, { useContext } from "react";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
function Navbar() {
  const { currentUser, signout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="coffeelatteblog logo" srcset="" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=techstuff">
            <h6>TechStuff</h6>
          </Link>
          <Link className="link" to="/?cat=me">
            <h6>Know Me</h6>
          </Link>
          <Link className="link" to="/?cat=porto">
            <h6>Porto</h6>
          </Link>
          <span>{currentUser?.data.username}</span>

          {currentUser ? (
            <span onClick={signout}>Logout</span>
          ) : (
            <Link className="link" to={"/login"}>
              Login
            </Link>
          )}
          <span className="write">
            <Link className="link" to="/writepost">
              Write A Post
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
