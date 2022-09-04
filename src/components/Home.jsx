import React from "react";
import { Notes } from "./Notes";


export const Home = () => {

  return (
    
    <>
      <div className="container col-10">
        <h2>Add a note</h2>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Title"
              />
            </div>

            <div className="form-group my-3">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Note content"
              ></textarea>
            </div>
          </form>

        <h2>Your notes</h2>
        <div className="container">
            <Notes></Notes>
        </div>
      </div>
    </>
  );
};
