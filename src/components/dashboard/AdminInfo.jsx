import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { logout_user } from '../../Store/actions/authAction';
const AdminInfo = ({ profileModelShow, userInfo }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const logout = () => {
    dispatch(logout_user({ role: userInfo.role, history }));
  };
  return (
    <>
      <div className={`adminInfo ${profileModelShow ? 'show' : ''}`}>
        <div className="image-email">
          <img className="navbar-user-img" src={userInfo.image} alt="" />
          <span>{userInfo.email}</span>
        </div>
        <ul>
          {userInfo.role === 'user' && (
            <li className="user-info-list">
              <Link to="/home-add-article">Add Article</Link>
            </li>
          )}
          <li className="user-info-list">
            <Link to="/">View site</Link>
          </li>
          <li className="user-info-list">
            <span onClick={logout}>Logout</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminInfo;
