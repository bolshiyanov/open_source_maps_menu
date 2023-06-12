import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import reducer from 'reducers';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(createLogger(), sagaMiddleware);

const currentReducer = combineReducers({
  config: reducer
});
const store = createStore(currentReducer, middleware);

sagaMiddleware.run(rootSaga);

export default store;
