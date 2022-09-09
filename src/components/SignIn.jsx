import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export const SignIn = (props) => {
  const [user, setUser] = useState({ email: "", password: "", name: "", confirmPassword: "" });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const history = useHistory();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = user;
    const url = "http://localhost:5000/api/auth/createuser";
    const res = await fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    });
    const json = await res.json(); // await
    console.log(json);

    if (json.success){
        // Redirect and save authtoken in localstorage
        localStorage.setItem("token", json.token)
        history.push("/")
        window.location.reload();
        props.showAlert("Signed In", "success")
    }

    else{
        props.showAlert("Something is fishy you can't continue", "danger")
    }
  };
  return (
    <>
      <div className="container col-4" style={{marginTop:"150px"}}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
          <input
              type="text"
              onChange={onChange}
              className="form-control my-3"
              id="name"
              name="name"
              aria-describedby="emailHelp"
              placeholder="Username"
              value={user.name}
            />
          </div>
          <div>
            <input
              type="email"
              onChange={onChange}
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Email"
              value={user.email}
            />
          </div>
          <div className="form-group my-3">
            <input
              type="password"
              onChange={onChange}
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              value={user.password}
            />
          </div>
          <div className="form-group my-3">
            <input
              type="password"
              onChange={onChange}
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={user.confirmPassword}
            />
          </div>
          <button type="submit" className="btn btn-primary my-2">
            Submit
          </button>
        </form>
        </div>
    </>
  );
};