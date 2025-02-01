import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice'; // Adjust the path as needed

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;