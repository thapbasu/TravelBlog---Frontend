import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { get_category_article } from '../../Store/actions/home/homeAction';
import Pagination from './Pagination';
import Article from './Article';

const CategoryArticle = () => {
  const dispatch = useDispatch();
  const { currentPage, categorySlug } = useParams();
  const { allArticle, parPage, countArticle } = useSelector(
    (state) => state.homeReducer
  );

  useEffect(() => {
    dispatch(
      get_category_article(
        categorySlug,
        currentPage ? currentPage.split('-')[1] : 1
      )
    );
  }, [dispatch, currentPage, categorySlug]);
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
          path={`/article/category/${categorySlug}`}
        />
      ) : null}
    </>
  );
};

export default CategoryArticle;
