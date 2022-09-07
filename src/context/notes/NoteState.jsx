import { response } from "express"
import { useState } from "react"
import NoteContext from "./noteContext"

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const [notes, setNotes] = useState([])

    // Fetching all notes via /api/notes/fetchnotes
    const fetchAllNotes = async() => {
        const url = `${host}/api/notes/fetchnotes`
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGU4NzQ0NGU3ODM3YmMxOWE1ZjdjNiIsImlhdCI6MTY2MTg5NjUxNn0.ZgtBgy0knc3jPdSy412thzlBZQoHvEsKeM-RbHLs_tk"
            },
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        const json = await response.json() // await
        // console.log(json)
        setNotes(json)
    }

    // adding note --> /api/notes/createnote
    const addNote = async(title, description, tag) => {
        // console.log("Adding new note", title, description)
        const url = `${host}/api/notes/createnote`
        const data = {title, description, tag}

        // eslint-disable-next-line
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGU4NzQ0NGU3ODM3YmMxOWE1ZjdjNiIsImlhdCI6MTY2MTg5NjUxNn0.ZgtBgy0knc3jPdSy412thzlBZQoHvEsKeM-RbHLs_tk"
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }
        );
        
        fetchAllNotes(); // Render added note
    }

    // delete note via /api/notes/deletenote/:id
    const deleteNote = async(id) => {
        const url = `${host}/api/notes/deletenote/${id}`

        // eslint-disable-next-line
        const response = await fetch(url, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGU4NzQ0NGU3ODM3YmMxOWE1ZjdjNiIsImlhdCI6MTY2MTg5NjUxNn0.ZgtBgy0knc3jPdSy412thzlBZQoHvEsKeM-RbHLs_tk"
            },
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
        }
        );
        
        fetchAllNotes(); // Stop rendering new note
    }

    // const updateNote = async(note) => {
    //     const { title, description, tag } = note;
    //     const url = `${host}/api/notes/updatenote/${note._id}`
    //     const data = {title, description, tag}

    //     // eslint-disable-next-line
    //     const response = await fetch(url, {
    //         method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGU4NzQ0NGU3ODM3YmMxOWE1ZjdjNiIsImlhdCI6MTY2MTg5NjUxNn0.ZgtBgy0knc3jPdSy412thzlBZQoHvEsKeM-RbHLs_tk"
    //         },
    //         body: JSON.stringify(data) // body data type must match "Content-Type" header
    //     }
        
    //     );
    //     // console.log(response.JSON())
        
    //     fetchAllNotes(); // Stop rendering new note
    // }

    return (
        // capital P in Provider
        <NoteContext.Provider value = {{ notes, setNotes, addNote, deleteNote, fetchAllNotes } } >
             { props.children } 
        </NoteContext.Provider>
    )
}

export default NoteState;