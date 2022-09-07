import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

export const CreateNote = () => {
    const contextData = useContext(noteContext);
    const { addNote } = contextData;
    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    const onClick = async(e) => {
        console.log(e.target)
        e.preventDefault();
        await addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        
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
                minLength={3}
                value={note.title}
                required
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
                minLength={3}
                required
                value={note.description}
                onChange={onChange}
                placeholder="Note content"
              ></textarea>
            </div>
            <button type='submit' className="btn btn-dark" onClick={onClick}>Save</button>
          </form>
          </div>
    </>
  )
}
