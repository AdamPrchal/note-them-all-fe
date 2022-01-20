import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getNotes from "../../api/getNotes";
import { Note } from "../../types/types";

export interface NoteState {
  all: Note[];
}

const initialState: NoteState = {
  all: [],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<NoteState>) => {
      state.all = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNotes } = notesSlice.actions;

export const fetchNotes = async (dispatch) => {
  const notes = await getNotes();
  dispatch(setNotes(notes));
};

export default notesSlice.reducer;
