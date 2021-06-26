import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startUploading, updateNote } from "../../actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();

  const handleButtonSave = () => {
    dispatch(updateNote());
  };

  const handlePictureUpload = () => {
    document.querySelector("#fileSelector").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
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
