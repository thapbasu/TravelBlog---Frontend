import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { FaRegEye, FaSearch } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Pagination from '../home/Pagination';
import { useParams } from 'react-router-dom';
// import htmlToText from 'react-html-parser';

import { convert } from 'html-to-text';
import {
  get_all_article,
  delete_article,
} from '../../Store/actions/Dashboard/articleAction';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
const DashboardArticle = () => {
  const { currentPage } = useParams();
  const dispatch = useDispatch();
  const { allArticle, parPage, articleCount, articleSuccessMessage } =
    useSelector((state) => state.dashboardArticle);

  useEffect(() => {
    dispatch(get_all_article(currentPage ? currentPage.split('-')[1] : 1, ''));
  }, [currentPage, dispatch]);
  useEffect(() => {
    if (articleSuccessMessage) {
      toast.success(articleSuccessMessage);
      dispatch({ type: 'ART_SUCCESS_MESSAGE_CLEAR' });
      dispatch(
        get_all_article(currentPage ? currentPage.split('-')[1] : 1, '')
      );
    }
  }, [dispatch, articleSuccessMessage]);
  return (
    <>
      <div className="dashborad-article">
        <Helmet>
          <title>All Article</title>
        </Helmet>
        <Toaster
          position={'bottom-center'}
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: '15px',
            },
          }}
        />
        <div className="article-action-pagination">
          <div className="numof-search-newAdd">
            <div className="numof">
              <h2>Article ({articleCount})</h2>
            </div>
            <div className="searchOf">
              <input
                onChange={(e) =>
                  dispatch(
                    get_all_article(
                      currentPage ? currentPage.split('-')[1] : 1,
                      e.target.value
                    )
                  )
                }
                placeholder="Search articles"
                type="text"
                className="form-control"
              />
              <span>
                <FaSearch />
              </span>
            </div>
            <div className="newAdd">
              <Link className="btn" to="/dashboard/article-add">
                Add New Article
              </Link>
            </div>
          </div>
          <div className="height-70vh">
            <div className="articles">
              {allArticle.length > 0
                ? allArticle.map((art, index) => (
                    <div className="article" key={index}>
                      <img
                        src={`http://localhost:3000/articleImages/${art.image}`}
                        alt=""
                      />
                      <Link to={`/article/details/${art.slug}`}>
                        {convert(art.title.slice(0, 40))}
                      </Link>
                      <p>{convert(art.articleText.slice(0, 60))}</p>

                      <div className="action">
                        <span>
                          <Link to={`/dashboard/article/edit/${art.slug}`}>
                            <MdEdit />
                          </Link>
                        </span>
                        <span>
                          <Link>
                            <FaRegEye />
                          </Link>
                        </span>
                        <span onClick={() => dispatch(delete_article(art._id))}>
                          <MdDelete />
                        </span>
                      </div>
                    </div>
                  ))
                : 'Article not found...'}
            </div>
          </div>
          {articleCount === 0 || articleCount < parPage ? (
            ''
          ) : (
            <Pagination
              pageNumber={currentPage ? currentPage.split('-')[1] : 1}
              parPage={parPage}
              itemCount={articleCount}
              path="/dashboard/all-article"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardArticle;
