import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { FaRegEye, FaSearch } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Pagination from '../home/Pagination';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  get_all_tag,
  delete_tag,
} from '../../Store/actions/Dashboard/tagAction';
import { Toaster, toast } from 'react-hot-toast';
const AllTag = () => {
  const dispatch = useDispatch();
  const { currentPage } = useParams();
  const { parPage, allTag, tagCount, tagSuccessMessage } = useSelector(
    (state) => state.dashboardTag
  );

  useEffect(() => {
    if (tagSuccessMessage) {
      toast.success(tagSuccessMessage);
      dispatch({ type: 'TAG_SUCCESS_MESSAGE_CLEAR' });
    }
    dispatch(get_all_tag(currentPage ? currentPage.split('-')[1] : 1));
  }, [currentPage, tagSuccessMessage]);
  return (
    <>
      <div className="all-category">
        <Toaster
          position={'bottom-center'}
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: '15px',
            },
          }}
        />
        <Helmet>
          <title>All Tags</title>
        </Helmet>
        <div className="show-category-action">
          <div className="numof-search-newAdd">
            <div className="numof">
              <h2>Tag ({tagCount})</h2>
            </div>
            <div className="searchOf">
              <input
                onChange={(e) =>
                  dispatch(
                    get_all_tag(
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
              <Link className="btn" to="/dashboard/add-tag">
                Add New Tag
              </Link>
            </div>
          </div>
          <div className="height-60vh">
            <div className="categorys">
              {allTag.length > 0
                ? allTag.map((c, index) => (
                    <div key={index} className="category">
                      <div className="name">{c.tagName}</div>
                      <div className="action">
                        <span>
                          <Link to={`/dashboard/tag/edit/${c.tagSlug}`}>
                            <MdEdit />
                          </Link>
                        </span>
                        <span onClick={() => dispatch(delete_tag(c._id))}>
                          <MdDelete />
                        </span>
                      </div>
                    </div>
                  ))
                : 'Tag not found...'}
            </div>
          </div>
          <Pagination
            pageNumber={currentPage ? currentPage.split('-')[1] : 1}
            parPage={parPage}
            itemCount={tagCount}
            path="/dashboard/all-tag"
          />
        </div>
      </div>
    </>
  );
};

export default AllTag;
