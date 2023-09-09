import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AdminLogin from './components/auth/AdminLogin';
import Dashboard from './components/dashboard/Dashboard';
import ProtectRoute from './components/auth/ProtectRoute';
import EmailVerify from './components/auth/EmailVerify';
import { userView } from './Store/actions/home/homeAction';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ViewProfile from './components/home/ViewProfile';
import About from './components/home/About';
import Contact from './components/home/Contact';
import HomeAddArticle from './components/home/HomeAddArticle';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userView());
  });
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/home-add-article" component={HomeAddArticle} exact />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/register" component={Register} exact />
        <Route path="/register/email-verify" component={EmailVerify} exact />
        <Route
          path="/dashboard/article/edit/:articleSlug"
          component={Dashboard}
          exact
        />
        <Route
          path="/dashboard/category/edit/:cateSlug"
          component={Dashboard}
          exact
        />

        <Route path="/home/edit/:profileSlug" component={ViewProfile} exact />
        <Route path="/dashboard/article-add" component={Dashboard} exact />
        <Route path="/dashboard/category-add" component={Dashboard} exact />
        <Route
          path="/dashboard/all-category/:currentPage?"
          component={Dashboard}
          exact
        />
        <Route
          path="/dashboard/all-article/:currentPage?"
          component={Dashboard}
          exact
        />
        <Route path="/login" component={Login} exact />
        <Route path="/admin/login" component={AdminLogin} exact />
        <Route path="/article/:currentPage?" component={Home} exact />
        <Route path="/article/details/:slug" component={Home} exact />
        <Route
          path="/article/category/:categorySlug/:currentPage?"
          component={Home}
          exact
        />
        <ProtectRoute path="/dashboard" component={Dashboard} exact />

        <Route
          path="/article/tag/:categorySlug/:currentPage?"
          component={Home}
          exact
        />
        <Route path="/article/search/:searchValue" component={Home} exact />

        <Route
          path="/dashboard/all-tag/:currentPage?"
          component={Dashboard}
          exact
        />
        <Route path="/dashboard/add-tag" component={Dashboard} exact />
        <Route
          path="/dashboard/tag/edit/:tagSlug"
          component={Dashboard}
          exact
        />
        <Route
          path="/dashboard/all-sub-admin/:currentPage?"
          component={Dashboard}
          exact
        />
        <Route
          path="/dashboard/all-user/:currentPage?"
          component={Dashboard}
          exact
        />
        <Route
          path="/dashboard/sub-admin-profile/:adminId"
          component={Dashboard}
          exact
        />
        <Route
          path="/dashboard/comments/:currentPage?"
          component={Dashboard}
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
