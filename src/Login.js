import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./Component/firebase";
import logo from "./masonry/icon.png";
import { useStateValue } from "./Component/StateProvider";
import HomeIcon from "@material-ui/icons/Home";

function Login() {
  const [state, dispatch] = useStateValue();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const computedClassName = "";
  const signIn = (e) => {
    e.preventDefault();

    //some fancy login firebase shittt!!
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);

        history.push("/");
      })
      .catch((error) => {
        if (
          error.message ===
          "The password is invalid or the user does not have a password."
        ) {
          console.log(error);
        }
        alert(error.message);
      });
  };
  const register = (e) => {
    e.preventDefault();

    //some fancy register firebase shiittt!!
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <Link to="/">
        <div className="log__home">
          <HomeIcon />
        </div>
        <img className="login__logo" src={logo} alt="" />
      </Link>
      <div className="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="login__signInButton"
            onClick={signIn}
          >
            Sign In
          </button>
          <h2>- New User? -</h2>
          <button
            className="login__registerButton"
            onClick={() => {
              history.push("/register");
            }}
          >
            Create your Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
