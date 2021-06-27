import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import { v4 as uuidv4 } from "uuid";

export const startNewNode = () => {
  return async (dispatch, getState) => {
    // const uid = getState().auth.uid;

    const newNote = {
      id: uuidv4(),
      title: "",
      body: "",
      date: new Date().getTime(),
      url: "",
    };

    // const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);
    // dispatch(activeNote(docRef.id, newNote));
    // dispatch(setNewNote({ id: docRef.id, ...newNote }));

    // dispatch(setNewNote(newNote.id, { ...newNote }));
    dispatch(activeNote(newNote.id, { ...newNote }));
  };
};

export const saveNote = () => {
  return async (dispatch, getState) => {
    const { active: note } = getState().notes;
    let { url } = note;
    const uid = getState().auth.uid;

    Swal.fire({
      title: "Uploading...",
      timer: 10000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    if (url && url !== "") {
      url = await fileUpload(url);
    }

    await db.collection(`${uid}/journal/notes`).add({ ...note, url });

    // const docRef = await db.doc(`${uid}/journal/notes/${docRef.id}/`);
    // await docRef.update({ ...note });

    dispatch(setNewNote(note.id, { ...note }));
    // dispatch(refreshNote(note.id, note));

    Swal.fire("Save", note.title, "success");
    // Swal.close();
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

// export const startUploading = (file) => {
//   return async (dispatch, getState) => {
//     const { active: note } = getState().notes;

//     const url = await fileUpload(file);

//     dispatch(activeNote(note.id, { ...note, url }));
//     // dispatch(refreshNote(note.id, { ...note, url  }));
//   };
// };

export const refreshImageNote = (url) => {
  return async (dispatch, getState) => {
    const { active: note } = getState().notes;
    dispatch(activeNote(note.id, { ...note, url }));
  };
};

export const setNewNote = (id, note) => ({
  type: types.addNoteToList,
  payload: {
    id,
    ...note,
  },
});
