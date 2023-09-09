import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { get_old_recent_acticle } from '../../Store/actions/home/homeAction';
import moment from 'moment';
const Footer = () => {
  const dispatch = useDispatch();
  const { oldArticle, recentArticle, allTag, allCategory } = useSelector(
    (state) => state.homeReducer
  );
  useEffect(() => {
    dispatch(get_old_recent_acticle());
  }, []);

  return (
    <>
      <section id="footer">
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-4">
                <div className="title">
                  <h3>Old Article</h3>
                </div>
                {oldArticle.length > 0 &&
                  oldArticle.map((art, index) => (
                    <div key={index} className="some-recent-artical">
                      <div className="row">
                        <div className="col-4">
                          <div className="img">
                            <img
                              src={`http://localhost:3000/articleImages/${art.image}`}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="col-8">
                          <div className="title-link">
                            <Link to={`/article/details/${art.slug}`}>
                              {art.title}
                            </Link>

                            <br />
                            <span>{moment(art.createdAt).fromNow()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="col-4">
                <div className="title-cate-tag">
                  <div className="title">
                    <h3>Tag Category</h3>
                  </div>
                  <div className="cate-tag">
                    <div className="cate">
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
                        <h3>Tag</h3>
                      </div>
                      <ul className="tag-list">
                        {allTag.length > 0 &&
                          allTag.map((tag, index) => (
                            <li className="tag-item" key={index}>
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
              <div className="col-4">
                <div className="title">
                  <h3>Recent Article</h3>
                </div>

                {recentArticle.length > 0 &&
                  recentArticle.map((art, index) => (
                    <div key={index} className="some-recent-artical">
                      <div className="row">
                        <div className="col-4">
                          <div className="img">
                            <img
                              src={`http://localhost:3000/articleImages/${art.image}`}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="col-8">
                          <div className="title-link">
                            <Link to={`/article/details/${art.slug}`}>
                              {art.title}
                            </Link>
                            <br />
                            <span>{moment(art.createdAt).fromNow()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
