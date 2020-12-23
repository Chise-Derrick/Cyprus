import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "./masonry/icon.png";
import { auth } from "./Component/firebase";
import PhoneInput from "react-phone-input-2";
import { useStateValue } from "./Component/StateProvider";
import "react-phone-input-2/lib/style.css";
import HomeIcon from "@material-ui/icons/Home";

function Signup() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [state, dispatch] = useStateValue();
  const signIn = (e) => {
    e.preventDefault();

    //some fancy login firebase shittt!!
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
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
        dispatch({
          type: "REGISTER_USER",
          payload: {
            firstName: firstName || "user",
            lastName: lastName || "user",
            username: username || "user",
          },
        });
        history.push("/");
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
        <h1>Signup</h1>
        <form>
          <h5>First Name</h5>
          <input
            type="text"
            value={firstName}
            autoCapitalize="none"
            onChange={(e) => {
              let val = e.target.value;
              setFirstName(
                val.slice(0, 1).toUpperCase() + val.slice(1, val.length)
              );
            }}
          />
          <h5>Last Name</h5>
          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              let val = e.target.value;
              setLastName(
                val.slice(0, 1).toUpperCase() + val.slice(1, val.length)
              );
            }}
          />
          <h5>Username</h5>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              let val = e.target.value;
              setUsername(
                val.slice(0, 1).toUpperCase() + val.slice(1, val.length)
              );
            }}
          />
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="login__signInButton"
            onClick={register}
          >
            Register
          </button>
          <h2>- Already Registered? -</h2>
          <button
            className="login__registerButton"
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
