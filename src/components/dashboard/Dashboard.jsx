import React from 'react';
import DashboardNavbar from './DashboardNavbar';
import Sidebar from './Sidebar';
import { Switch, Route } from 'react-router-dom';
import DashboardIndex from './DashboardIndex';
import DashboardArticle from './DashboardArticle';
import { Helmet } from 'react-helmet';
import ArticleAdd from './ArticleAdd';
import ArticleEdit from './ArticleEdit';
import AllCategory from './AllCategory';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import AllTag from './AllTag';
import AddTag from './AddTag';
import EditTag from './EditTag';
import AllSubAdmin from './AllSubAdmin';
import AllUser from './AllUser';
import SubAdminProfile from './SubAdminProfile';

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <DashboardNavbar />
        <div className="dashboard-main-content">
          <Sidebar />
          <Switch>
            <Route path="/dashboard" component={DashboardIndex} exact />
            <Route path="/dashboard/article-add" component={ArticleAdd} exact />
            <Route
              path="/dashboard/category-add"
              component={AddCategory}
              exact
            />
            <Route
              path="/dashboard/article/edit/:articleSlug"
              component={ArticleEdit}
              exact
            />
            <Route
              path="/dashboard/all-article/:currentPage?"
              component={DashboardArticle}
              exact
            />
            <Route
              path="/dashboard/all-category/:currentPage?"
              component={AllCategory}
              exact
            />
            <Route
              path="/dashboard/category/edit/:cateSlug"
              component={EditCategory}
              exact
            />
            <Route
              path="/dashboard/all-tag/:currentPage?"
              component={AllTag}
              exact
            />
            <Route path="/dashboard/add-tag" component={AddTag} exact />
            <Route
              path="/dashboard/tag/edit/:tagSlug"
              component={EditTag}
              exact
            />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
