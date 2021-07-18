import {createStore} from 'redux';
import combinedReducer from './reducers';
export default createStore(combinedReducer);