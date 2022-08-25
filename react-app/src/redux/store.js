import { configureStore } from '@reduxjs/toolkit';
import markdownSlice from './markdownPreviewer/markdownSlice';

export const store = configureStore({
  reducer: {
    markdown: markdownSlice
  },
});