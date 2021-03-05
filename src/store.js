import { configureStore } from '@reduxjs/toolkit';
import harReducer from "./features/har_slice_reducer"
export default configureStore({
  reducer:{
    har :harReducer,
  }
});