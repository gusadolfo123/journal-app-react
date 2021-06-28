import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null,
};

export const notesReducer = (state = initialState, action) => {
  switch (action?.type) {
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };
    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };
    case types.noteRefresh:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case types.addNoteToList:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((el) => el.id !== action.payload),
      };
    default:
      return state;
  }
};
