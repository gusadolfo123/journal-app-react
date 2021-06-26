import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNode = () => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      url: null,
    };

    const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
    dispatch(activeNote(docRef.id, newNote));
  };
};

export const updateNote = () => {
  return async (dispatch, getState) => {
    const { active: note } = getState().notes;
    const uid = getState().auth.uid;
    // console.log(JSON.stringify(note));
    const docRef = await db.doc(`${uid}/journal/notes/${note.id}/`);
    await docRef.update({ ...note });

    dispatch(refreshNote(note.id, note));

    Swal.fire("Save", note.title, "success");
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const refreshNote = (id, note) => ({
  type: types.noteRefresh,
  payload: {
    id,
    note,
  },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: note } = getState().notes;
    const url = await fileUpload(file);
    // dispatch(refreshNote(activeNote.id, { ...note, url }));
    console.log(url);
  };
};
