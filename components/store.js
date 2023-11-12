import { createStore } from 'redux';
import rootReducer from './reducers'; // Zaimportuj swój reducer

const store = createStore(rootReducer);

export default store;
