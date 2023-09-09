import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BsCardImage } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import joditEditor from 'jodit-react';
import {
  edit_category,
  update_category,
} from '../../Store/actions/Dashboard/categoryAction';
import { useDispatch, useSelector } from 'react-redux';
const EditCategory = ({ history }) => {
  const dispatch = useDispatch();
  const { cateSlug } = useParams();
  const {
    parPage,
    allCategory,
    categoryCount,
    categoryError,
    categorySuccessMessage,
    editCategory,
    editRequest,
  } = useSelector((state) => state.dashboardCategory);
  const [state, setState] = useState({
    categoryName: '',
    categoryDes: '',
  });

  useEffect(() => {
    if (editRequest) {
      setState({
        categoryName: editCategory.categoryName,
        categoryDes: editCategory.categoryDes,
      });
      dispatch({ type: 'EDIT_REQUEST_CLEAR' });
    } else {
      dispatch(edit_category(cateSlug));
    }
  }, [editCategory, cateSlug]);
  useEffect(() => {
    if (categorySuccessMessage) {
      history.push('/dashboard/all-category');
    }
  }, [categorySuccessMessage]);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const update = (e) => {
    e.preventDefault();
    dispatch(update_category(editCategory._id, state));
  };
  return (
    <>
      <div className="add-category">
        <Helmet>
          <title>Edit Category</title>
        </Helmet>
        <div className="added" style={{}}>
          <div className="title-show-article">
            <h2>Edit Category</h2>
            <Link className="btn" to="/dashboard/all-category">
              All Articles
            </Link>
          </div>
          <form onSubmit={update}>
            <div className="form-group">
              <label htmlFor="category_name">Category Name:</label>
              <input
                type="text"
                onChange={inputHandle}
                className="form-control"
                id="category_name"
                placeholder="category name"
                name="categoryName"
                value={state.categoryName}
              />
              <p className="error">
                {categoryError && categoryError.categoryName}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="category_des">Category Description:</label>
              <textarea
                onChange={inputHandle}
                name="categoryDes"
                type="text"
                value={state.categoryDes}
                className="form-control"
                id="category_des"
                placeholder="category description"
              />
              <p className="error">
                {categoryError && categoryError.categoryDes}
              </p>
            </div>
            <div className="form-group">
              <button className="btn btn-block">Update Category</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCategory;
