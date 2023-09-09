import React, { useEffect, useState } from 'react';
import Navbar from '../home/Navbar';
import { FaUser } from 'react-icons/fa';
import { BsAt, BsLock } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../Store/actions/authAction';
import toast, { Toaster } from 'react-hot-toast';
const Register = ({ history }) => {
  const dispatch = useDispatch();
  const { errorMessage, successMessage, loader, authenticate } = useSelector(
    (state) => state.adminReducer
  );

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
  });
  const [showImage, setShowImage] = useState('');
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const imageHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({
        ...state,
        image: e.target.files[0],
      });

      const render = new FileReader();
      render.onload = () => {
        setShowImage(render.result);
      };
      render.readAsDataURL(e.target.files[0]);
    }
  };
  const user_register = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', state.name);
    formData.append('email', state.email);
    formData.append('password', state.password);
    formData.append('image', state.image);

    dispatch(register(formData));
  };
  useEffect(() => {
    // if (authenticate) {
    //   history.push('/dashboard');
    // }
    if (successMessage) {
      history.push('/register/email-verify');
    }
    if (errorMessage.error) {
      toast.error(errorMessage.error);
      dispatch({ type: 'ERROR_CLEAR' });
    }
  }, [successMessage, errorMessage?.error, authenticate]);
  useEffect(() => {
    dispatch({ type: 'ERROR_CLEAR' });
  }, []);
  return (
    <>
      <Navbar />
      <div className="register">
        <Toaster
          position={'bottom-center'}
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: '16px',
            },
          }}
        />
        <div className="card">
          <div className="auth">
            <h3>Register</h3>
            <form>
              <div className="form-group">
                <label htmlFor="userName">Username: </label>
                <div className="icon-input">
                  <div className="icon">
                    <FaUser />
                  </div>
                  <input
                    onChange={inputHandle}
                    type="text"
                    name="name"
                    id="userName"
                    className="form-control"
                    placeholder="Username"
                  />
                </div>
                <p>{errorMessage?.name}</p>
              </div>
              <div className="form-group">
                <label htmlFor="Email">Email: </label>
                <div className="icon-input">
                  <div className="icon">
                    <BsAt />
                  </div>
                  <input
                    onChange={inputHandle}
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <p>{errorMessage?.email}</p>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password: </label>
                <div className="icon-input">
                  <div className="icon">
                    <BsLock />
                  </div>
                  <input
                    onChange={inputHandle}
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="password"
                  />
                </div>
                <p>{errorMessage?.password}</p>
              </div>
              <div className="form-group">
                <input
                  onChange={imageHandle}
                  hidden
                  type="file"
                  name="image"
                  id="reg-image"
                />
                <div className="image-file">
                  <div className="image">
                    {showImage && (
                      <img src={`${showImage}`} alt="profile image" />
                    )}
                  </div>
                  <div className="file-name">
                    <div className="form-control">
                      {state.image && state.image.name}
                    </div>
                    <label htmlFor="reg-image">Browse</label>
                  </div>
                </div>
                <p>{errorMessage?.image}</p>
              </div>
              <div className="form-group">
                {loader ? (
                  <button className="btn btn-block">
                    <div className="spinner">
                      <div className="spinner1"></div>
                      <div className="spinner2"></div>
                      <div className="spinner3"></div>
                    </div>
                  </button>
                ) : (
                  <button className="btn btn-block" onClick={user_register}>
                    Register
                  </button>
                )}
              </div>
              <div className="form-group">
                <div className="login-page">
                  <Link to="/login">Already have an Account? Login here</Link>
                </div>
              </div>
            </form>
          </div>
          <div className="image-logo">
            <img src="http://localhost:3000/image/registerImg.jpeg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
