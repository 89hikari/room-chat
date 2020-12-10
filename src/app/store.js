import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/counter/userSlice';
import chatReducer from '../features/counter/chatSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer
  },
});
