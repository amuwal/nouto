import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { Noteitem } from "./Noteitem";

export const Notes = (props) => {
  const contextData = useContext(noteContext);
  const { notes, fetchAllNotes } = contextData;
  const updateNoteDatabase = contextData.updateNote;

  const [note, setNote] = useState({
    updateTitle: "",
    updateDescription: "",
    updateTag: "default",
  });


const showModal = useRef();
const cancleRef = useRef();

const updateNote = (currentNote) => {
    showModal.current.click();
    setNote({id: currentNote._id, updateTitle: currentNote.title, updateDescription: currentNote.description, updateTag: currentNote.tag})
};

const onChange = (e) => {
  setNote({ ...note, [e.target.name]: e.target.value });
};

const handleSaveNote = () => {
    updateNoteDatabase(note)
    cancleRef.current.click();
    props.showAlert("Note Updated Successfully", "warning")
}



  useEffect(() => {
    fetchAllNotes();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      <h2>Your notes</h2>

      <button
        ref={showModal}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#updateNote"
      >
        Launch demo modal
      </button>
      <div className="container">
        <div
          className="modal fade"
          id="updateNote"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Note
                </h5>
              </div>
              <div className="modal-body">
                {/* Form */}
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="updateTitle"
                      name="updateTitle"
                      placeholder="Title"
                      value={note.updateTitle}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group my-3">
                    <textarea
                      className="form-control"
                      id="updateDescription"
                      name="updateDescription"
                      rows="3"
                      value={note.updateDescription}
                      onChange={onChange}
                      placeholder="Note content"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="updateTag"
                      name="updateTag"
                      placeholder="updateTag"
                      value={note.updateTag}
                      onChange={onChange}
                    />
                  </div>

                  
                </form>
              </div>
              <div className="modal-footer">
                <button
                  ref={cancleRef}
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button  type="button" className="btn btn-primary" onClick={handleSaveNote}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {notes.map((note) => {
        return (
          <Noteitem
            key={note._id}
            updateNote={updateNote}
            note={note}
            showAlert={props.showAlert}
          ></Noteitem>
        );
      })}
    </div>
  );
};
