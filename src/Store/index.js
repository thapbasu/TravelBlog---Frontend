import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from 'redux';
import ThunkMiddleware from 'redux-thunk';
import { adminReducer } from './reducers/AdminReducer';
import { dashCategoryReducer } from './reducers/dashCategoryReducer';
import { dashTagReducer } from './reducers/dashTagReducer';
import { articleReducer } from './reducers/articleReducer';
import { homeReducer } from './reducers/home/homeReducer';
import { likeDislikeReducer } from './reducers/home/likeDislikeReducer';
import { homeCommentReducer } from './reducers/home/homeCommentReducer';
import { dashboardReducer } from './reducers/dashboardIndexReducer';
const rootReducer = combineReducers({
  adminReducer,
  dashboardCategory: dashCategoryReducer,
  dashboardTag: dashTagReducer,
  dashboardArticle: articleReducer,
  homeReducer,
  likeDislike: likeDislikeReducer,
  userComment: homeCommentReducer,
  dashboardIndex: dashboardReducer,
});

const middleware = [ThunkMiddleware];
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
