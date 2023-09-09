import React, { useEffect, useState } from 'react';
import { BsBell, BsListUl } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import AdminInfo from './AdminInfo';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  delete_notification,
  get_notification,
  seen_notification,
} from '../../Store/actions/Dashboard/dashboardAction';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';

const DashboardNavbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.adminReducer);
  const { notifications, successMessage } = useSelector(
    (state) => state.dashboardIndex
  );
  const [profileModelShow, setProfileModelShow] = useState(false);
  const [nModelShow, setNModelShow] = useState(false);

  const profileModel = () => {
    if (profileModelShow) {
      setProfileModelShow(false);
    } else {
      setNModelShow(false);
      setProfileModelShow(true);
    }
  };

  const nModel = () => {
    if (nModelShow) {
      setNModelShow(false);
    } else {
      setProfileModelShow(false);
      setNModelShow(true);
    }
  };
  useEffect(() => {
    dispatch(get_notification(userInfo.id));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch({
        type: 'N_SUCCESS_MESSAGE_CLEAR',
      });
      dispatch(get_notification(userInfo.id));
    }
  }, [successMessage]);

  const seenNotification = (id) => {
    dispatch(seen_notification(id));
  };
  return (
    <>
      <div className="dashboard-navbar">
        <Toaster
          position={'bottom-center'}
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: '15px',
            },
          }}
        />
        <div className="dashboard-navbar-left-side">
          <img className="navbar-user-img" src={userInfo.image} alt="" />

          <label className="bar" htmlFor="sidebar">
            <span>
              <BsListUl />
            </span>
          </label>
          <h2>
            <Link to="/dashboard">{userInfo.name}</Link>
          </h2>
        </div>
        <div className="dashboard-navbar-right-side">
          <h2>
            <Link to="/dashboard">
              <span>View site</span>
            </Link>
          </h2>

          <div className="user">
            <div className="notification-message">
              <div className="notification">
                <div onClick={nModel}>
                  <span>
                    <BsBell />
                  </span>
                  {notifications.length > 0 && (
                    <div className="nCount">{notifications.length}</div>
                  )}
                </div>

                <div className={`notifications ${nModelShow ? 'show' : ''}`}>
                  <ul>
                    {notifications.map((n, i) => (
                      <li className={n.status === 'seen' ? '' : 'bg'} key={i}>
                        <Link
                          onClick={() => seenNotification(n._id)}
                          to={`/article/details/${n.slug}`}
                        >
                          {n.subject}
                        </Link>
                        <div
                          onClick={() => dispatch(delete_notification(n._id))}
                          className="nDelete"
                        >
                          <FaTrash />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <label onClick={profileModel} htmlFor="adminInfo">
              <img src={userInfo.image} alt="" />
            </label>
            <div className="name-time">
              <h3>{userInfo.name}</h3>
              <span>{moment(userInfo.createdAt).format('ll')}</span>
            </div>
          </div>
        </div>
      </div>
      <AdminInfo profileModelShow={profileModelShow} userInfo={userInfo} />
    </>
  );
};

export default DashboardNavbar;
