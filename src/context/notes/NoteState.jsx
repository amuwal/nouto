import { useState } from "react"
import NoteContext from "./noteContext"

const NoteState = (props) => {
    const notes = [{
            "_id": "6313c4b791dc790fsc81c381b1",
            "user": "630e87444e7837bc19a5f7c6",
            "title": "Wow nice title",
            "description": "This is dexcription",
            "tag": "General",
            "date": "2022-09-03T21:18:47.639Z",
            "__v": 0
        },
        {
            "_id": "6313c4b791fsddc790c81c381b1",
            "user": "630e87444e7837bc19a5f7c6",
            "title": "Wow nice title",
            "description": "This is dexcription",
            "tag": "General",
            "date": "2022-09-03T21:18:47.639Z",
            "__v": 0
        },
        {
            "_id": "6313c4b791dc79fsd0c81c381b1",
            "user": "630e874fs44e7837bc19a5f7c6",
            "title": "Wow nice title",
            "description": "This is dexcription",
            "tag": "General",
            "date": "2022-09-03T21:18:47.639Z",
            "__v": 0
        },
        {
            "_id": "6313c4b79fs1dc790c81c381b1",
            "user": "630e87444e7837bc19a5f7c6",
            "title": "Wow nice title",
            "description": "This is dexcription",
            "tag": "General",
            "date": "2022-09-03T21:18:47.639Z",
            "__v": 0
        },
        {
            "_id": "6313c4b791dc790c81fsc381b1",
            "user": "630e87444e7837bc19a5f7c6",
            "title": "Wow nice title",
            "description": "This is dexcription",
            "tag": "General",
            "date": "2022-09-03T21:18:47.639Z",
            "__v": 0
        },
        {
            "_id": "6313c4b7sdf91dc790c81c381b1",
            "user": "630e87444e7837bc19a5f7c6",
            "title": "Wow nice title",
            "description": "This is dexcription",
            "tag": "General",
            "date": "2022-09-03T21:18:47.639Z",
            "__v": 0
        },
    ]
    const [note, setNote] = useState(notes)
    return (
        // capital P in Provider
        <NoteContext.Provider value = {{ note } } >
             { props.children } 
        </NoteContext.Provider>
    )
}

export default NoteState;