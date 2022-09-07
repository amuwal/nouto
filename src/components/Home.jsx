import React from "react";
import { Notes } from "./Notes";
import { CreateNote } from "./CreateNote";


export const Home = () => {

  return (
    
    <>
      <div className="container col-10">
        <CreateNote/>
        <Notes></Notes>
      </div>
    </>
  );
};
