import { configureStore } from '@reduxjs/toolkit'
import tagsReducer from "./store/tagsSlice"
import notesReducer from "./store/notesSlice"

export default configureStore({
  reducer: {
    tags: tagsReducer,
    notes: notesReducer
  }
})