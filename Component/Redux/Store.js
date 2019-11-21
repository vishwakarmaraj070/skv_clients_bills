import {createStore, applyMiddleware} from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store;
