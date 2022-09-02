import { useState } from "react"
import NoteContext from "./noteContext"

const NoteState = (props) => {
    const obj = {"name": "light", "age": 20}
    const [state, setObj] = useState(obj)
    
    const update = () =>{
        setTimeout(() => {
            setObj({"name": "Kira", "age": 20})
        }, 1000);
    }
    return (
        <NoteContext.Provider value = {{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
