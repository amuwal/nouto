import React from "react";
import { Notes } from "./Notes";
import { CreateNote } from "./CreateNote";


export const Home = (props) => {

  return (
    
    <>
      <div className="container col-10">
        <CreateNote showAlert={props.showAlert}/>
        <Notes showAlert={props.showAlert}></Notes>
      </div>
    </>
  );
};
