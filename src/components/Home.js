import React from 'react'
import { useContext } from 'react'
import noteContext from "../context/notes/noteContext"

export const Home = () => {
    const obj = useContext(noteContext)
    obj.update()
  return (
    <div className='text-danger'>Oo Kairi Oni san {obj.state.name}</div>
  )
}
