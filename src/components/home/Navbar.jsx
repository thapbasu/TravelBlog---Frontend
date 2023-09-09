import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
  FaGithubSquare,
} from 'react-icons/fa';
import { ImLinkedin } from 'react-icons/im';
import { BsListUl } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import AdminInfo from '../dashboard/AdminInfo';

const Navbar = ({ nav }) => {
  const [profileModelShow, setProfileModelShow] = useState(false);
  const [nModelShow, setNModelShow] = useState(false);
  const { userInfo, authenticate } = useSelector((state) => state.adminReducer);
  const { notifications, successMessage } = useSelector(
    (state) => state.dashboardIndex
  );
  const profileModel = () => {
    if (profileModelShow) {
      setProfileModelShow(false);
    } else {
      setNModelShow(false);
      setProfileModelShow(true);
    }
  };
  return (
    <>
      <div ref={nav} id="navbar" className="navbar">
        <div className="container">
          <div className="row">
            <input type="checkbox" id="toggle" />

            <div className="col-4">
              <div className="image-menubar">
                <Link className="image" to="/">
                  <img src="http://localhost:3000/Image/logo.png" />
                </Link>
                <label className="menu_icon" htmlFor="toggle">
                  <BsListUl />
                </label>
              </div>
            </div>
            <div className="col-8">
              <ul className="link-list toggle">
                <li className="link-item">
                  <Link to="/about">About</Link>
                </li>
                <li className="link-item">
                  <Link to="/contact">Contact</Link>
                </li>
                <li className="link-item">
                  <Link to="/policy">Policy</Link>
                </li>

                <div className="social-icon">
                  <li className="link-item">
                    <Link to="/about">
                      <span>
                        <FaFacebookSquare />
                      </span>
                    </Link>
                  </li>
                  <li className="link-item">
                    <Link to="/about">
                      <span>
                        <FaTwitterSquare />
                      </span>
                    </Link>
                  </li>
                  <li className="link-item">
                    <Link to="/about">
                      <span>
                        <FaYoutubeSquare />
                      </span>
                    </Link>
                  </li>
                  <li className="link-item">
                    <Link to="/about">
                      <span>
                        <FaGithubSquare />
                      </span>
                    </Link>
                  </li>
                  <li className="link-item">
                    <Link to="/about">
                      <span>
                        <ImLinkedin />
                      </span>
                    </Link>
                  </li>
                </div>
                {authenticate ? (
                  <li>
                    <label onClick={profileModel} htmlFor="adminInfo">
                      <img
                        className="navbar-user-img"
                        src={userInfo.image}
                        alt=""
                      />
                    </label>
                  </li>
                ) : (
                  <Link to="/login">
                    <button className="btn btn-block">Login</button>
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <AdminInfo profileModelShow={profileModelShow} userInfo={userInfo} />
    </>
  );
};

export default Navbar;
