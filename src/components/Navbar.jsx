import { React, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    const location = useLocation();
    const token = localStorage.getItem("token");
    const history = useHistory();
    const loginRef = useRef();
    const signInRef = useRef();
    const logoutRef = useRef();

    const active = (path) => {
        if (location.pathname === `/${path}`){ return "active" }
        else { return ""}
    }
    useEffect(() => {
        if (token){
            logoutRef.current.className = "bth btn-dark"
            signInRef.current.className = "d-none"
            loginRef.current.className = "d-none"
            console.log("token is availabel")
        }
        else{
            logoutRef.current.className = "d-none"
            signInRef.current.className = "nav-item"
            loginRef.current.className = "nav-item"
            console.log("no token is")
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        history.push("/login")
        window.location.reload();
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
      <li ref={loginRef} className="nav-item">
        <Link className={`nav-link ${active("login")}`} to="/login">Login</Link>
      </li>
      <li ref={signInRef} className="nav-item">
        <Link className={`nav-link ${active("signin")}`} to="/signin">Signin</Link>
      </li>
      <li ref={logoutRef} className="btn btn-dark">
        <Link to="/" className={`btn btn-dark ${active("logout")}`} onClick={handleLogout} >Logout</Link>
      </li>
    </ul>
  </div>
</nav>
</>
  )
}
