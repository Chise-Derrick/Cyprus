import React, { useEffect, useState } from "react";
import { auth } from "./Component/firebase";
import { useStateValue } from "./Component/StateProvider";
import { Link } from "react-router-dom";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import ExitToApp from "@material-ui/icons/ExitToApp";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import "./Header.css";
import icmap from "./masonry/icon.png";

function Header() {
  const [state, dispatch] = useStateValue();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [displayName, setDisplayName] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const setOpen = (state) => {
    if (state) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const toggleGodMode = () => {
    if (state.godMode === "Off") {
      dispatch({
        type: "SET_GODMODE",
        payload: "On",
      });
    } else {
      dispatch({
        type: "SET_GODMODE",
        payload: "Off",
      });
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser !== null) {
        console.log(state);
        console.log(authUser.displayName);
        if (authUser.displayName === "Guest") {
          console.log(authUser.displayName);
          setDisplayName(authUser.displayName);
          authUser
            .updateProfile({
              firstName: state.registered.firstName,
              lastName: state.registered.lastName,
              displayName: state.registered.username,
            })
            .then(function () {
              localStorage.setItem("user", JSON.stringify(authUser));

              // Update successful.
            })
            .catch(function (error) {
              // An error happened.
            });
        } else {
          setDisplayName(authUser.displayName);
        }

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(authUser));
      } else {
        setDisplayName("");
        dispatch({
          type: "SET_USER",
          user: null,
        });
        setIsLoggedIn(false);
        localStorage.setItem("user", null);
      }
    });
  }, [dispatch]);

  if (!localStorage.getItem("user") && auth.currentUser) {
    console.log(auth);
  }

  const handleAuthentication = () => {
    auth.signOut();
  };

  return (
    <div className="header">
      <div className="header__top main-width">
        <span className="header__godmode" onClick={toggleGodMode}>
          Admin: {state.godMode}
        </span>
        <div
          className="header__mouseContain"
          onMouseLeave={() => setOpen(false)}
        >
          <div className="header__login">
            {/*          <p className="header__icon">
            <AccountCircleTwoToneIcon onClick={() => setOpen("icon")} />
          </p>*/}
            <span
              className="header__user"
              onMouseEnter={() => {
                setOpen(true);
              }}
            >
              <span className="header__correction">{displayName}</span>

              {isLoggedIn && <span className="header__downCaret">&#9660;</span>}
            </span>
            {!isLoggedIn && (
              <div className="header__loginLinks">
                <Link to="/login">
                  <span className="header__loginLink">Login</span>
                </Link>{" "}
                or{" "}
                <Link to="/signup">
                  <span className="header__loginLink">Signup</span>
                </Link>
              </div>
            )}

            <div
              className={isOpen ? "open" : "closed"}
              onClick={() => {
                setOpen(false);
              }}
            >
              <div className="header__loginOptions">
                <Link to="/upload">
                  <div className="header__upload">
                    <span className="header__btnText">Upload</span>
                  </div>
                </Link>
                <div onClick={handleAuthentication}>
                  {isLoggedIn && (
                    <div className="header__upload">
                      <span className="header__btnText">Sign out</span>
                    </div>
                  )}
                  {!isLoggedIn && (
                    <Link to="/login">
                      <div className="header__upload">
                        <ExitToApp className="header__iconLog" />

                        <span className="header__btnText">Sign In</span>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header__title">
          <Link to="/home">
            <img className="header__image" src={icmap} alt="" />
          </Link>
          <div className="header__search">
            <h1>UNDERWATER PHOTOGRAPHY AROUND CYPRUS</h1>
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <div className="header__option">
          {/*          <span className="header__optionLineTwo">
            HOME | <span className="clicked">UNDERWATER</span> | LANDSCAPES |
            TOWNS | RESTAURANTS | SERVICES |{" "}
          </span>*/}
        </div>
      </div>
    </div>
  );
}

export default Header;
