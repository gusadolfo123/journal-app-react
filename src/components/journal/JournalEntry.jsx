import React from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";

const advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

export const JournalEntry = ({ id, date, title, body, url }) => {
  const day = dayjs(date);
  const dispatch = useDispatch();

  const handleEntryClick = () => {
    dispatch(activeNote(id, { id, date, title, body, url }));
  };

  return (
    <div className="journal__entry pointer" onClick={handleEntryClick}>
      {url && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>

      <div className="journal_entry-date-box">
        <span>{day.format("dddd")}</span>
        <h4>{day.format("Do")}</h4>
      </div>
    </div>
  );
};
