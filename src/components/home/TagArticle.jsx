import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Article from './Article.jsx';
import Pagination from './Pagination';
import { get_tag_article } from '../../Store/actions/home/homeAction';
const TagArticle = () => {
  const dispatch = useDispatch();
  const { currentPage, tagSlug } = useParams();
  const { allArticle, parPage, countArticle } = useSelector(
    (state) => state.homeReducer
  );
  useEffect(() => {
    dispatch(
      get_tag_article(tagSlug, currentPage ? currentPage.split('-')[1] : 1)
    );
  }, [dispatch, currentPage, tagSlug]);
  return (
    <>
      <div className="home-articals">
        {allArticle.length > 0 ? (
          allArticle.map((art, index) => <Article key={index} art={art} />)
        ) : (
          <h3>Article not found</h3>
        )}
      </div>
      {parPage < countArticle ? (
        <Pagination
          pageNumber={currentPage ? currentPage.split('-')[1] : 1}
          parPage={parPage}
          itemCount={countArticle}
          path={`/article/tag/${tagSlug}`}
        />
      ) : null}
    </>
  );
};

export default TagArticle;
