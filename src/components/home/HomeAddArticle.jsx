import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BsCardImage } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import {
  add_article,
  get_tag_category,
} from '../../Store/actions/Dashboard/articleAction';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import {
  useLocation,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import { get_home_tag_category } from '../../Store/actions/home/homeAction';
import PopularArticle from './PopularArticle';
import { FaChevronRight } from 'react-icons/fa';
const HomeAddArticle = ({ history }) => {
  const { allCategory, allTag, loader, articleError, articleSuccessMessage } =
    useSelector((state) => state.dashboardArticle);

  const [state, setState] = useState({
    title: '',
    category: '',
    tag: '',
    image: '',
    slug: '',
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
  const imageHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({
        ...state,
        image: e.target.files[0],
      });
      const imageReader = new FileReader();
      imageReader.onload = () => {
        setImage({
          ...image,
          img: imageReader.result,
          imageName: e.target.files[0].name,
        });
      };
      imageReader.readAsDataURL(e.target.files[0]);
    }
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
    }
  }, [articleSuccessMessage]);

  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const editor = useRef();
  const add = (e) => {
    e.preventDefault();
    const { title, image, category, tag } = state;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('category', category);
    formData.append('tag', tag);
    formData.append('slug', slug);
    formData.append('text', text);

    dispatch(add_article(formData));
  };

  const config = {
    readonly: false,
  };

  useEffect(() => {
    dispatch(get_tag_category());
  }, []);
  const { currentPage } = useParams();
  const { pathname } = useLocation();
  const [value, setValue] = useState('');
  const nav = useRef();
  const search = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(get_home_tag_category());
  }, []);
  const scrollTop = () => {
    nav.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="home">
        <Navbar nav={nav} />

        <div className="add-article home-page">
          <Toaster
            position={'bottom-center'}
            reverseOrder={false}
            toastOptions={{ style: { fontSize: '15px' } }}
          />
          <Helmet>
            <title>Add Article</title>
          </Helmet>

          <div className="add">
            <div className="title-show-article">
              <h2>Add Article</h2>
            </div>
            <form onSubmit={add}>
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
                {articleError ? (
                  <p className="error">{articleError.tag}</p>
                ) : (
                  ''
                )}
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
                {articleError ? (
                  <p className="error">{articleError.text}</p>
                ) : (
                  ''
                )}
              </div>
              <div className="form-group">
                <label htmlFor="image">Select Image</label>
                <div className="image-select">
                  {image.imageName ? (
                    <span>{image.imageName}</span>
                  ) : (
                    <span>Select Image</span>
                  )}
                  <label htmlFor="image">Select Image</label>
                  <input
                    onChange={imageHandle}
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                  />
                </div>
                <div className="image">
                  {image.img ? <img src={image.img} alt="" /> : ''}
                </div>
                {articleError ? (
                  <p className="error">{articleError.image}</p>
                ) : (
                  ''
                )}
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
                  <button className="btn btn-block">Add Article</button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeAddArticle;
