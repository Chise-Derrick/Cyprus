import React, { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import { auth } from "./Component/firebase";
import { useStateValue } from "./Component/StateProvider";
import "./Upload.css";
import { Input, TextareaAutosize } from "@material-ui/core";
import Select from "react-dropdown-select";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

function Upload(props) {
  const [state, dispatch] = useStateValue();
  const [value, setValue] = useState([{ label: "Larnaka", value: 1 }]);
  const [typeValue, setTypeValue] = useState([
    { label: "Underwater", value: 1 },
  ]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Underwater");
  const [location, setLocation] = useState("Larnaka");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);
  const techCompanies = [
    { label: "Larnaka", value: 1 },
    { label: "Pafos", value: 2 },
    { label: "Famagusta", value: 3 },
    { label: "Limassol", value: 4 },
    { label: "Akamas", value: 5 },
    { label: "Nicosia", value: 6 },
    { label: "Other", value: 7 },
  ];
  const categories = [
    { label: "Underwater", value: 1 },
    { label: "Landscape", value: 2 },
    { label: "Towns", value: 3 },
    { label: "Restaurants", value: 4 },
  ];

  const changeOption = (e, cat) => {
    console.log(e);
    console.log(cat);
    if (cat === "cat") {
      setCategory(e[0].label);
      console.log(category);
    }
    if (cat === "loc") {
      setLocation(e[0].label);
      console.log(location);
    }
  };

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        setUser({
          displayName: authUser.displayName,
        });
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        setUser({
          displayName: "Guest",
        });
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);
  return (
    <div className="upload main-width">
      <div className="upload__title">
        <h1>Image Upload</h1>
      </div>
      <div className="upload__form">
        <Link to="/home" className="nav__link upload__home">
          <HomeIcon />
        </Link>
        <form>
          <div className="upload__top">
            <h5 className="upload__label">Title</h5>
            <Input
              type="text"
              value={title}
              className="upload__input"
              onChange={(e) => setTitle(e.target.value)}
            />

            <h5 className="upload__label">Description</h5>
            <TextareaAutosize
              type="text"
              value={description}
              className="upload__textarea"
              onChange={(e) => setDescription(e.target.value)}
            />
            <h5 className="upload__label">Category</h5>
            <Select
              className="upload__catSearch"
              multi={false}
              values={typeValue}
              options={categories}
              onChange={(e) => {
                changeOption(e, "cat");
                console.log(category);
              }}
            />
            <h5 className="upload__label">Location</h5>
            <Select
              className="upload__locSearch"
              multi={false}
              values={value}
              options={techCompanies}
              onChange={(e) => {
                changeOption(e, "loc");
              }}
            />
          </div>
          <div className="upload__mid">
            <h4 className="upload__label">FILE ATTACHMENT</h4>
            <h5 className="upload__label">Add a new file</h5>

            <ImageUpload
              username={user?.displayName}
              title={title}
              description={description}
              category={category}
              location={location}
            />

            <h3>Sorry, you need to login to upload</h3>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Upload;
