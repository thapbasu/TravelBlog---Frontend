import React, { useEffect, useState } from 'react';
import Navbar from '../home/Navbar';
import { FaFacebook, FaGoogle, FaUser } from 'react-icons/fa';
import { BsAt, BsLock } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { admin_login } from '../../Store/actions/authAction';
import toast, { Toaster } from 'react-hot-toast';
const AdminLogin = ({ history }) => {
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage, authenticate, userInfo } =
    useSelector((state) => state.adminReducer); //destructuring

  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const adminLogin = (e) => {
    e.preventDefault();
    dispatch(admin_login(state));
  };
  useEffect(() => {
    if (authenticate) {
      return history.push('/dashboard');
    }
  }, [authenticate, dispatch, successMessage]);

  useEffect(() => {
    if (errorMessage.error) {
      toast.error(errorMessage.error);
    }
    dispatch({ type: 'LOGIN_ERROR_CLEAR' });
  }, [errorMessage.error]);
  return (
    <>
      <Navbar />
      <div className="admin_login">
        <Toaster
          position={'bottom-center'}
          reverseOrder={false}
          toastOptions={{ style: { fontSize: '15px' } }}
        />
        <div className="card">
          <div className="auth">
            <h3>Admin Login</h3>

            <form onSubmit={adminLogin}>
              <div className="form-group">
                <label htmlFor="Email">Email: </label>
                <div className="icon-input">
                  <div className="icon">
                    <BsAt />
                  </div>
                  <input
                    type="email"
                    onChange={inputHandle}
                    id="email"
                    name="email"
                    value={state.email}
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
                    value={state.password}
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="password"
                  />
                </div>
                <p>{errorMessage?.password}</p>
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
                  <button className="btn btn-block">Login</button>
                )}
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

export default AdminLogin;
