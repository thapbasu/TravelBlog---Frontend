import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillDashboard } from 'react-icons/ai';
import { RiArticleLine } from 'react-icons/ri';

import { BsChevronRight } from 'react-icons/bs';
import { FaCaretSquareRight, FaEye, FaPlusCircle, FaTag } from 'react-icons/fa';
const Sidebar = () => {
  return (
    <>
      <div className="dashboard-main-content-sidebar">
        <ul>
          <input type="checkbox" id="article" />
          <input type="checkbox" id="category" />
          <input type="checkbox" id="tag" />
          <input type="checkbox" id="user" />
          <li>
            <Link to="/dashboard">
              <label>
                <h3>
                  <span>
                    <AiFillDashboard />
                  </span>
                  <span>Dashboard</span>
                </h3>
                {/* <span className="right_icon">
                  <BsChevronRight />
                </span> */}
              </label>
            </Link>
          </li>
          <li>
            <label htmlFor="article">
              <h3>
                <span>
                  <RiArticleLine />
                </span>
                <span>Article</span>
              </h3>
              <span className="right_icon1">
                <BsChevronRight />
              </span>
            </label>
            <div className="article_category">
              <Link to="/dashboard/all-article">
                <span>
                  <FaEye />
                </span>
                <span>All Article</span>
              </Link>
              <Link to="/dashboard/article-add">
                <span>
                  <FaPlusCircle />
                </span>
                <span>Add Article</span>
              </Link>
            </div>
          </li>
          <li>
            <label htmlFor="category">
              <h3>
                <span>
                  <FaCaretSquareRight />
                </span>
                <span>Category</span>
              </h3>
              <span className="right_icon2">
                <BsChevronRight />
              </span>
            </label>
            <div className="category_category">
              <Link to="/dashboard/all-category">
                <span>
                  <FaEye />
                </span>
                <span>All Category</span>
              </Link>
              <Link to="/dashboard/category-add">
                <span>
                  <FaPlusCircle />
                </span>
                <span>Add Category</span>
              </Link>
            </div>
          </li>
          <li>
            <label htmlFor="tag">
              <h3>
                <span>
                  <FaTag />
                </span>
                <span>Tag</span>
              </h3>
              <span className="right_icon3">
                <BsChevronRight />
              </span>
            </label>
            <div className="tag_category">
              <Link to="/dashboard/all-tag">
                <span>
                  <FaEye />
                </span>
                <span>All Tag</span>
              </Link>
              <Link to="/dashboard/add-tag">
                <span>
                  <FaPlusCircle />
                </span>
                <span>Add Tag</span>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
