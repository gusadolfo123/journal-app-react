import React from "react";
import { useDispatch } from "react-redux";
import {
  refreshImageNote,
  // refreshNote,
  // startUploading,
  saveNote,
} from "../../actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();

  const handleButtonSave = () => {
    dispatch(saveNote());
    document.querySelector("#fileSelector").value = "";
  };

  const handlePictureUpload = () => {
    document.querySelector("#fileSelector").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // dispatch(startUploading(file));
      var reader = new FileReader();

      reader.onload = function (e) {
        dispatch(refreshImageNote(e.target.result));
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="notes__appbar">
      <span>28 de agosto 2021</span>

      <input
        type="file"
        name="file"
        id="fileSelector"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div>
        <button className="btn" onClick={handlePictureUpload}>
          Picture
        </button>
        <button className="btn" onClick={handleButtonSave}>
          Save
        </button>
      </div>
    </div>
  );
};
