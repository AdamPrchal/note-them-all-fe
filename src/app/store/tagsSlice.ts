import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getTags from "../../api/getTags";
import { Tag } from "../../types/types";

export interface TagState {
  all: Tag[];
}

const initialState: TagState = {
  all: [],
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<TagState>) => {
      state.all = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTags } = tagsSlice.actions;

export const fetchTags = async (dispatch) => {
  const tags = await getTags();
  dispatch(setTags(tags));
};

export default tagsSlice.reducer;
