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
    dispatch(activeNote({ ...newNote }));
  };
};

export const saveNote = () => {
  return async (dispatch, getState) => {
    const { active: note, notes } = getState().notes;
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

    if (notes.find((el) => el.id === note.id)) {
      if (
        url &&
        url !== "" &&
        notes.find((el) => el.id === note.id && el.url !== url)
      ) {
        url = await fileUpload(url);
      }

      const id = note.id;
      const docRef = await db.doc(`${uid}/journal/notes/${id}/`);
      delete note.id;
      await docRef.update({ ...note, url });

      dispatch(refreshNote({ id, ...note, url }));

      Swal.fire("Save", note.title, "success");
    } else {
      if (url && url !== "") {
        url = await fileUpload(url);
      }

      delete note.id;
      const docRef = await db
        .collection(`${uid}/journal/notes`)
        .add({ ...note, url });

      dispatch(setNewNote({ id: docRef.id, ...note, url }));
      // dispatch(refreshNote(note.id, note));

      Swal.fire("Save", note.title, "success");
      // Swal.close();
    }
  };
};

export const activeNote = (note) => ({
  type: types.notesActive,
  payload: {
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

export const refreshNote = (note) => {
  return {
    type: types.noteRefresh,
    payload: {
      ...note,
    },
  };
};

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
    dispatch(activeNote({ ...note, url }));
  };
};

export const setNewNote = (note) => ({
  type: types.addNoteToList,
  payload: {
    ...note,
  },
});

export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;

    await db.doc(`${uid}/journal/notes/${id}/`).delete();
    dispatch(deleteNote(id));
  };
};

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id,
});
