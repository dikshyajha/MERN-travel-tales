

import rootReducer from './root'
import { applyMiddleware, configureStore} from '@reduxjs/toolkit';

export default configureStore({
    reducer: rootReducer,
})