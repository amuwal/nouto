import React from "react";

export const Noteitem = (props) => {
  const { note } = props;
  return (
    <div className="col-4">
    <div className="card my-2">
      <div className="card-body">
        <div className="d-flex content-align-center">
        <h5 className="card-title">{note.title}</h5>
        <i className="fa-solid fa-trash-can m-1 mx-2"></i>
        <i className="fa-solid fa-pen m-1"></i>
        </div>
        <p className="card-text">{note.description}</p>
      </div>
    </div>
    </div>
  );
};
