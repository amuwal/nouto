import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export const Login = (props) => {
  const { showAlert } = props;
  const [user, setUser] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = user;
    const url = "http://localhost:5000/api/auth/login";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json(); // await
    // console.log(json);

    if (json.success) {
      // Redirect and save authtoken in localstorage
      localStorage.setItem("token", json.token);
      history.push("/");      
      window.location.reload();
      showAlert("Successfull", "success");
    } else {
      showAlert("Error: Very BAd", "danger");
    }
  };
  return (
    <>
      <div className="container col-4" style={{ marginTop: "150px" }}>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              onChange={onChange}
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
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
          <button type="submit" className="btn btn-primary my-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
