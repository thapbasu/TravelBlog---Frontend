import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { add_tag } from '../../Store/actions/Dashboard/tagAction';

import { useDispatch, useSelector } from 'react-redux';

const AddTag = ({ history }) => {
  const dispatch = useDispatch();
  const { loader, tagError, tagSuccessMessage } = useSelector(
    (state) => state.dashboardTag
  );

  const [state, setState] = useState({
    tagName: '',
    tagDes: '',
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const addTag = (e) => {
    e.preventDefault();
    dispatch(add_tag(state));
  };

  useEffect(() => {
    if (tagError && tagError.error) {
      toast.error(tagError.error);
      dispatch({ type: 'TAG_ERROR_MESSAGE_CLEAR' });
    }
    if (tagSuccessMessage) {
      toast.success(tagSuccessMessage);
      dispatch({ type: 'TAG_SUCCESS_MESSAGE_CLEAR' });
      history.push('/dashboard/all-tag');
    }
  }, [tagError, tagSuccessMessage]);
  return (
    <>
      <div className="add-category">
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
          <title>Tag add</title>
        </Helmet>
        <div className="added" style={{}}>
          <div className="title-show-article">
            <h2>Add Tag</h2>
            <Link className="btn" to="/dashboard/all-tag">
              All Tag
            </Link>
          </div>
          <form onSubmit={addTag}>
            <div className="form-group">
              <label htmlFor="category_name">Tag Name:</label>
              <input
                value={state.tagName}
                type="text"
                className="form-control"
                id="category_name"
                placeholder="Tag name"
                name="tagName"
                onChange={inputHandle}
              />
              <p className="error">{tagError ? tagError.tagName : ''}</p>
            </div>
            <div className="form-group">
              <label htmlFor="category_des">Tag Description:</label>
              <textarea
                value={state.tagDes}
                name="tagDes"
                type="text"
                className="form-control"
                id="category_des"
                placeholder="Tag description"
                onChange={inputHandle}
              />
              <p className="error">{tagError ? tagError.tagDes : ''}</p>
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
                <button className="btn btn-block">Add Tag</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTag;
