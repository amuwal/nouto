import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

export const CreateNote = () => {
    const contextData = useContext(noteContext);
    const { addNote } = contextData;
    const [note, setNote] = useState({title: "", description: "", tag: "default"})
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    const onClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        
    }

  return (
    <>
    <div className="container mb-3">
    <h2>Add a note</h2>
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Title"
                onChange={onChange}
              />
            </div>

            <div className="form-group my-3">
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                onChange={onChange}
                placeholder="Note content"
              ></textarea>
            </div>
            <button className="btn btn-dark" onClick={onClick}>Save</button>
          </form>
          </div>
    </>
  )
}
