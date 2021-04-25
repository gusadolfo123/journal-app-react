import React from "react";
import { NotesAppBar } from "./NotesAppBar";

export const NotePage = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Someawesome title"
          className="notes__title-input"
          autoComplete="off"
        />

        <textarea
          placeholder="what happened today"
          className="notes__textarea"
        ></textarea>

        <div className="notes__image">
          <img
            src="https://bnetcmsus-a.akamaihd.net/cms/blog_header/91/91RKJ6KC62PA1594365571485.jpg"
            alt="imagen"
          />
        </div>
      </div>
    </div>
  );
};
