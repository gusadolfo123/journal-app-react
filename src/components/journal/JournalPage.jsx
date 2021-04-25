import React from "react";
import { NotePage } from "../notes/NotePage";
import { NothingSelected } from "./NothingSelected";
import { Sidebar } from "./Sidebar";

export const JournalPage = () => {
  return (
    <div className="journal__main-content">
      <Sidebar />

      <main>
        {/* <NothingSelected /> */}
        <NotePage />
      </main>
    </div>
  );
};
