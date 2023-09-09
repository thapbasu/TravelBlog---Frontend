import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { get_popular_article } from '../../Store/actions/home/homeAction';
import moment from 'moment';

const PopularArticle = () => {
  const { mostLikedArticles } = useSelector((state) => state.homeReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_popular_article());
  }, []);
  return (
    <>
      {mostLikedArticles.length > 0 &&
        mostLikedArticles.map((art, index) => (
          <div className="row" key={index}>
            <div className="col-4">
              <Link to="/" className="image">
                <img
                  src={`http://localhost:3000/articleImages/${art.image}`}
                  alt=""
                />
              </Link>
            </div>
            <div className="col-8">
              <div className="title-time">
                <Link to={`/article/details/${art.slug}`}>{art.title}</Link>
                <br />
                <span>{moment(art.createdAt).fromNow()}</span>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default PopularArticle;
