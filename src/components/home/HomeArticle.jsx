import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { get_all_article } from '../../Store/actions/home/homeAction';
import { convert, htmlToText } from 'html-to-text';
const HomeArticle = () => {
  const { currentPage } = useParams();
  const dispatch = useDispatch();
  const { allArticle, parPage, countArticle } = useSelector(
    (state) => state.homeReducer
  );
  useEffect(() => {
    dispatch(get_all_article(currentPage ? currentPage.split('-')[1] : 1, ''));
  }, [currentPage]);
  return (
    <>
      <div className="home-articals">
        {allArticle.length > 0
          ? allArticle.map((art, index) => (
              <div key={index} className="home-artical">
                <div className="row">
                  <div className="col-4">
                    <div className="home-image">
                      <div className="image">
                        <img
                          src={`http://localhost:3000/articleImages/${art.image}`}
                          alt=""
                        />
                        <span>{art.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="home-artical-details">
                      <div className="title">
                        <Link to={`/article/details/${art.slug}`}>
                          {art.title}
                        </Link>
                      </div>
                      <div className="name-time">
                        <span>
                          <Link to="/">{art.adminName}</Link>
                        </span>
                        <span>{moment(art.createdAt).fromNow()}</span>
                      </div>
                      <div className="artical-text">
                        <p> {htmlToText(art.articleText.slice(0, 230))}</p>
                      </div>
                      <div className="read-more">
                        <button className="read-more-btn">
                          <Link to={`/article/details/${art.slug}`}>
                            Read More
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : 'article not found'}
      </div>
      {parPage < countArticle ? (
        <Pagination
          pageNumber={currentPage ? currentPage.split('-')[1] : 1}
          parPage={parPage}
          itemCount={countArticle}
          path="/article"
        />
      ) : null}
    </>
  );
};

export default HomeArticle;
