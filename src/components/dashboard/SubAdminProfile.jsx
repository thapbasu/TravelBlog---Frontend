import React from 'react';
import Helmet from 'react-helmet';
import { FaRegEye, FaSearch } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
const SubAdminProfile = () => {
  const user = 'admin';
  return (
    <>
      <div className="sub_admin_profile">
        <Helmet>
          <title>Sub-Admin Profile</title>
        </Helmet>
        <div className="profile-contents">
          <div className="numof-search-newAdd">
            <div className="numof">
              <h2>Profile</h2>
            </div>

            <div className="newAdd">
              <Link className="btn" to="/dashboard/all-sub-admin">
                View All Sub-Admin
              </Link>
            </div>
          </div>
          <div className="profile-image-article">
            <div className="profile-image-details">
              <div className="image">
                <img
                  src="http://localhost:3000/articleImages/popular1.jpg"
                  alt=""
                />
              </div>
              <ul className="profile-details">
                <li>
                  <span>Name: </span>
                  <span>Basu Thapa</span>
                </li>
                {user === 'admin' && (
                  <li>
                    <span>Email:</span>
                    <span>thapabasu@gmail.com</span>
                  </li>
                )}
                <li>
                  <span>Role: </span>
                  <span>Sub-Admin</span>
                </li>
                <li>
                  <span>Account Created: </span>
                  <span>2 June 2022</span>
                </li>
                <li>
                  <span>Article Written: </span>
                  <span>3</span>
                </li>
              </ul>
            </div>
            <div className="write-articles">
              <h2>Article</h2>
              <div className="articles">
                <Link className="article" to="/article/details/basu">
                  <img
                    src="http://localhost:3000/articleImages/popular1.jpg"
                    alt=""
                  />
                  <h3>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cupiditate animi quibusdam neque.
                  </h3>
                </Link>
                <Link className="article" to="/article/details/basu">
                  <img
                    src="http://localhost:3000/articleImages/popular1.jpg"
                    alt=""
                  />
                  <h3>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cupiditate animi quibusdam neque.
                  </h3>
                </Link>
                <Link className="article" to="/article/details/basu">
                  <img
                    src="http://localhost:3000/articleImages/popular1.jpg"
                    alt=""
                  />
                  <h3>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cupiditate animi quibusdam neque.
                  </h3>
                </Link>
                <Link className="article" to="/article/details/basu">
                  <img
                    src="http://localhost:3000/articleImages/popular1.jpg"
                    alt=""
                  />
                  <h3>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cupiditate animi quibusdam neque.
                  </h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubAdminProfile;
