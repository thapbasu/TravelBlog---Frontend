import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import PopularArticle from './PopularArticle';
import { FaArrowUp, FaChevronRight, FaSearch } from 'react-icons/fa';
import { Link, Route, Switch } from 'react-router-dom';
import HomeArticle from './HomeArticle';
import ArticleDetails from './ArticleDetails';
import CategoryArticle from './CategoryArticle';
import TagArticle from './TagArticle';
import Footer from './Footer';
import CreateAt from './CreateAt';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  get_all_article,
  get_home_tag_category,
} from '../../Store/actions/home/homeAction';
import { useParams } from 'react-router-dom';
import HomeAddArticle from './HomeAddArticle';
const Home = ({ history }) => {
  const { currentPage } = useParams();
  const dispatch = useDispatch();
  const { allCategory, allTag } = useSelector((state) => state.homeReducer);
  const { pathname } = useLocation();
  const [value, setValue] = useState('');
  const nav = useRef();
  const search = (e) => {
    e.preventDefault();
    history.push(`/article/search/${value}`);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(get_home_tag_category());
  }, []);
  const scrollTop = () => {
    nav.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home">
      <Navbar nav={nav} />
      <div className="main-content">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <Switch>
                <Route
                  path="/article/:currentPage?"
                  component={HomeArticle}
                  exact
                />
                <Route path="/" component={HomeArticle} exact />
                <Route
                  path="/article/details/:slug"
                  component={ArticleDetails}
                  exact
                />
                <Route
                  path="/article/category/:categorySlug/:currentPage?"
                  component={CategoryArticle}
                  exact
                />
            
                <Route
                  path="/article/tag/:tagSlug/:currentPage?"
                  component={TagArticle}
                  exact
                />
                <Route
                  path="/article/search/:searchValue"
                  component={HomeArticle}
                  exact
                />
              </Switch>
            </div>
            <div className="col-4">
              <div className="search-category-tag">
                <div className="popular-artical">
                  <div className="title">
                    <h3>Popular Article</h3>
                  </div>
                  <PopularArticle />
                </div>
                <div className="flow-facebook">
                  <div className="title">
                    <h3>Follow Us</h3>
                  </div>
                  <div className="image">
                    <iframe
                      src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100095318045104&tabs=timeline&width=340&height=148&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                      style={{
                        width: '340px',
                        height: '145px',
                        border: 'none',
                        overflow: 'hidden',
                        scrolling: 'no',
                        frameborder: '0',
                        allowfullscreen: 'true',
                        allow:
                          'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share',
                      }}
                    ></iframe>
                  </div>
                </div>
                <div className="category">
                  <div className="title">
                    <h3>Category</h3>
                    <ul className="cate-list">
                      {allCategory.length > 0 &&
                        allCategory.map((cate, index) => (
                          <div key={index} className="cate-item">
                            <li>
                              <FaChevronRight />
                              <Link
                                to={`/article/category/${cate._id
                                  .split(' ')
                                  .join('-')}`}
                              >
                                {cate._id}
                              </Link>
                            </li>
                            <span>({cate.count})</span>
                          </div>
                        ))}
                    </ul>
                  </div>
                  <div className="tag">
                    <div className="title">
                      <h3>Tags</h3>
                    </div>
                    <ul>
                      {allTag.length > 0 &&
                        allTag.map((tag, index) => (
                          <li key={index}>
                            <Link
                              to={`/article/tag/${tag.split(' ').join('-')}`}
                            >
                              {tag}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CreateAt />
      <div onClick={scrollTop} id="scroll">
        <button className="scroll-btn">
          <span>
            <FaArrowUp />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Home;
