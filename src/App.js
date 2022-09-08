import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { Home } from "./components/Home";
import NoteState from "./context/notes/NoteState";
import { Login } from "./components/Login";
import { SignIn } from "./components/SignIn"
import { Alert } from "./components/Alert";
import { useState } from "react";

function App() {
    const [alert, setAlert] = useState({msg: null, type: null});

    const showAlert = (msg, type) => {
        setAlert({ msg, type });
        setTimeout(() => {
        setAlert({msg: null, type: null});
        }, 1500);
    };
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home showAlert={showAlert}/>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login showAlert={showAlert} />
            </Route>
            <Route exact path="/signin">
              <SignIn showAlert={showAlert} />
            </Route>
          </Switch>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
