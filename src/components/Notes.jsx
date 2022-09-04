import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext";
import { Noteitem } from './Noteitem';

export const Notes = () => {
    const contextData = useContext(noteContext);
    const notes = contextData.note;
  return (
    <div className='row'>
        {notes.map((note) =>{
                return <Noteitem key={note._id} note={note}></Noteitem>

            })}
    </div>
  )
}
