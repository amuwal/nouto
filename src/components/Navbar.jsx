import { React, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    const location = useLocation();
    const active = (path) => {
        if (location.pathname === `/${path}`){ return "active" }
        else { return ""}
    }
    
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand mx-2" to="/">Nouto</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link className={`nav-link ${active("")}`} to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${active("about")}`} to="/about">About</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${active("login")}`} to="/login">Login</Link>
      </li>
      <li className="nav-item">
        <Link className={`nav-link ${active("signin")}`} to="/signin">Signin</Link>
      </li>
    </ul>
  </div>
</nav>
</>
  )
}
