import { createStore, applyMiddleware, compose } from 'redux';
import { RewardsReducer } from './Reducer';
import rootSaga from './Saga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(RewardsReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);