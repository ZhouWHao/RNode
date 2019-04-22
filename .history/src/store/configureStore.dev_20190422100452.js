import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(logger, promise()))
  );

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        store.replaceReducer(rootReducer)
      })
    }
  }

  return store;
};

export default configureStore;