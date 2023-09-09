import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BsCardImage } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { add_category } from '../../Store/actions/Dashboard/categoryAction';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
const AddCategory = ({ history }) => {
  const dispatch = useDispatch();
  const { loader, categoryError, categorySuccessMessage } = useSelector(
    (state) => state.dashboardCategory
  );
  const [state, setState] = useState({
    categoryName: '',
    categoryDes: '',
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const addCategory = (e) => {
    e.preventDefault();
    dispatch(add_category(state));
  };
  useEffect(() => {
    if (categoryError && categoryError.error) {
      toast.error(categoryError.error);
      dispatch({ type: 'CATE_ERROR_MESSAGE_CLEAR' });
    }
    if (categorySuccessMessage) {
      toast.success(categorySuccessMessage);

      dispatch({ type: 'CATE_SUCCESS_MESSAGE_CLEAR' });
      history.push('/dashboard/all-category');
    }
  }, [categoryError, categorySuccessMessage]);
  return (
    <>
      <div className="add-category">
        <Toaster
          position={'bottom-center'}
          reverseOrder={false}
          toastOptions={{ style: { fontSize: '15px' } }}
        />
        <Helmet>
          <title>Add Category</title>
        </Helmet>
        <div className="added" style={{}}>
          <div className="title-show-article">
            <h2>Add Category</h2>
            <Link className="btn" to="/dashboard/all-category">
              All Articles
            </Link>
          </div>
          <form onSubmit={addCategory}>
            <div className="form-group">
              <label htmlFor="category_name">Category Name:</label>
              <input
                type="text"
                onChange={inputHandle}
                className="form-control"
                id="category_name"
                placeholder="category name"
                name="categoryName"
              />
              <p className="error">
                {categoryError ? categoryError.categoryName : ''}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="category_des">Category Description:</label>
              <textarea
                name="categoryDes"
                type="text"
                className="form-control"
                id="category_des"
                placeholder="category description"
                onChange={inputHandle}
              />
              <p className="error">
                {categoryError ? categoryError.categoryDes : ''}
              </p>
            </div>
            <div className="form-group">
              {loader ? (
                <button className="btn btn-block">
                  <div className="spinner">
                    <div className="spinner1"></div>
                    <div className="spinner1"></div>
                    <div className="spinner1"></div>
                  </div>
                </button>
              ) : (
                <button className="btn btn-block">Add Category</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
