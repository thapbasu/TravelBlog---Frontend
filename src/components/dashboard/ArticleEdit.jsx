import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BsCardImage } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import {
  article_update,
  get_tag_category,
  article_edit,
} from '../../Store/actions/Dashboard/articleAction';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
const ArticleEdit = ({ history }) => {
  const { articleSlug } = useParams();
  const {
    allCategory,
    allTag,
    loader,
    articleError,
    articleSuccessMessage,
    edtiArticle,
    editRequest,
  } = useSelector((state) => state.dashboardArticle);
  const [state, setState] = useState({
    title: '',
    category: '',
    tag: '',
  });
  const [slug, setSlug] = useState('');
  const [updatebtn, setUpdatebtn] = useState(false);
  const [image, setImage] = useState({
    imageName: '',
    img: '',
  });
  const inputHandle = (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const titleHandler = (e) => {
    const createSlug = e.target.value.trim().split(' ').join('-');

    setState({
      ...state,
      title: e.target.value,
      slug: createSlug,
    });
    setSlug(createSlug);
  };

  const slugHandle = (e) => {
    e.preventDefault();
    setSlug(e.target.value);
    setUpdatebtn(true);
  };
  const updateSlug = (e) => {
    e.preventDefault();
    const newSlug = slug.trim().split(' ').join('-');
    setSlug(newSlug);
    setUpdatebtn(false);
  };
  useEffect(() => {
    if (articleSuccessMessage) {
      toast.success(articleSuccessMessage);
      dispatch({ type: 'ART_SUCCESS_MESSAGE_CLEAR' });
      history.push('/dashboard/all-article');
    }
  }, [articleSuccessMessage]);

  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const editor = useRef();
  const update = (e) => {
    e.preventDefault();
    const { title, category, tag } = state;

    dispatch(
      article_update({
        title,
        category,
        tag,
        slug,
        text,
        articleId: edtiArticle._id,
      })
    );
  };

  const config = {
    readonly: false,
  };

  useEffect(() => {
    dispatch(get_tag_category());
  }, []);
  useEffect(() => {
    if (editRequest) {
      setState({
        title: edtiArticle.title,
        category: edtiArticle.category_slug,
        tag: edtiArticle.tag_slug,
      });
      setSlug(edtiArticle.slug);
      setText(edtiArticle.articleText);
    }
  }, [editRequest, edtiArticle]);
  useEffect(() => {
    dispatch(article_edit(articleSlug));
  }, []);
  return (
    <>
      <div className="add-article">
        <Toaster
          position={'bottom-center'}
          reverseOrder={false}
          toastOptions={{ style: { fontSize: '15px' } }}
        />
        <Helmet>
          <title>Edit Article</title>
        </Helmet>

        <div className="add">
          <div className="title-show-article">
            <h2>Edit Article</h2>
            <Link className="btn" to="/dashboard/all-article">
              All Articles
            </Link>
          </div>
          <form onSubmit={update}>
            <div className="form-group">
              <label htmlFor="title">Article Title</label>
              <input
                onChange={titleHandler}
                value={state.title}
                type="text"
                placeholder="article title"
                name="title"
                id="title"
                className="form-control"
              />
              {articleError ? (
                <p className="error">{articleError.title}</p>
              ) : (
                ''
              )}
            </div>
            {/* <div className="form-group">
              <label htmlFor="slug">Article Slug</label>
              <input
                disabled
                value={slug}
                onChange={slugHandle}
                type="text"
                placeholder="article-slug"
                name="slug"
                id="slug"
                className="form-control"
              />
              <p className="error">Please Provide Article Slug</p>
            </div> */}
            {updatebtn ? (
              <button className="btn" onClick={updateSlug}>
                Update
              </button>
            ) : (
              ''
            )}

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                onChange={inputHandle}
                value={state.category}
                className="form-control"
                name="category"
                id="category"
              >
                <option>--select article category--</option>
                {allCategory.length > 0
                  ? allCategory.map((c, index) => {
                      return (
                        <option key={index} value={c.categorySlug}>
                          {c.categoryName}
                        </option>
                      );
                    })
                  : ''}
              </select>
              {articleError ? (
                <p className="error">{articleError.category}</p>
              ) : (
                ''
              )}
            </div>
            <div className="form-group">
              <label htmlFor="tag">Tag</label>
              <select
                onChange={inputHandle}
                className="form-control"
                name="tag"
                value={state.tag}
                id="tag"
              >
                <option>--select article tag--</option>

                {allTag.length > 0
                  ? allTag.map((c, index) => (
                      <option key={index} value={c.tagSlug}>
                        {c.tagName}
                      </option>
                    ))
                  : ''}
              </select>
              {articleError ? <p className="error">{articleError.tag}</p> : ''}
            </div>
            <div className="form-group img_upload">
              <div className="upload">
                <label htmlFor="upload_image">
                  <BsCardImage />
                </label>
                <input type="file" id="upload_image" />
              </div>
              <label htmlFor="article text">Article Text</label>
              <JoditEditor
                value={text}
                tabIndex={1}
                ref={editor}
                config={config}
                onBlur={(newText) => setText(newText)}
                onChange={(newText) => {}}
              />
              {articleError ? <p className="error">{articleError.text}</p> : ''}
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
                <button className="btn btn-block">Update Article</button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ArticleEdit;
