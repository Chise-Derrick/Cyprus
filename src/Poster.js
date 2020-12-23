import React, { useEffect, useState } from "react";
import Post from "./Post";
import ImageUpload from "./ImageUpload";
import { auth, db } from "./Component/firebase";
import { useStateValue } from "./Component/StateProvider";
import "./Poster.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Avatar from "@material-ui/core/Avatar";
import ZoomInTwoToneIcon from "@material-ui/icons/ZoomInTwoTone";
import ImageTwoTone from "@material-ui/icons/ImageTwoTone";
import OndemandVideoTwoToneIcon from "@material-ui/icons/OndemandVideoTwoTone";
import HomeIcon from "@material-ui/icons/Home";
import ReactPlayer from "react-player/lazy";
import Select from "react-dropdown-select";
import { Link } from "react-router-dom";
import Home from "./Home";
import SimpleTabs from "./Nav";

function Poster(props) {
  const [values, setValues] = useState([]);
  const techCompanies = [
    { label: "Larnaka", value: 1 },
    { label: "Pafos", value: 2 },
    { label: "Famagusta", value: 3 },
    { label: "Limassol", value: 4 },
    { label: "Akamas", value: 5 },
    { label: "Nicosia", value: 6 },
    { label: "All", value: 7 },
  ];
  const onChange = (value) => {
    localStorage.setItem("location", value[0].label);
    console.log(value);
  };
  const [posts, setPosts] = useState([]);
  const [state, dispatch] = useStateValue();

  const [user, setUser] = useState(null);
  const value = useState([
    techCompanies.find((element) => {
      return element.label === state.location;
    }),
  ])[0];
  console.log(state);
  console.log(value);
  // runs piece of code based on condition
  const handleClick = () => {
    console.log("clicked");
  };
  useEffect(() => {
    console.log(state);

    // will only run once when the app component loads...

    console.log(props.category);
    db.collection("posts")
      .where("category", "==", props.category)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs);
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
    console.log(props.category.toLowerCase());
  }, []);

  return (
    <div className="main__container main-width">
      <SimpleTabs />
      <div className="home__marginUp">
        <Link to="/home" className="nav__link">
          <HomeIcon />
        </Link>
      </div>
      <div className="header__searchBar">
        <Select
          className="app__search"
          multi={false}
          values={value}
          options={techCompanies}
          onChange={(e) => onChange(e)}
        />
      </div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 3, 750: 4, 900: 5 }}>
        <Masonry gutter="5px">
          {posts.map(({ id, post }) => (
            <div className="over-under" key={id}>
              <div>
                <Post
                  key={id}
                  postId={id}
                  user={user}
                  username={post.username}
                  imageUrl={post.imageUrl}
                  caption={post.title}
                  category={post.category}
                  type={post.type}
                />
              </div>
              <div className="overlay" onClick={handleClick}>
                <div className="post__header">
                  <Avatar
                    className="post__avatar"
                    alt={post.username.toUpperCase()}
                    src="/static/images/avatar/1.jpg"
                  />
                  <h3>{post.username}</h3>
                </div>

                <div className="post__magnifier">
                  {post.type === "image" ? (
                    <ImageTwoTone fontSize="large" />
                  ) : (
                    <OndemandVideoTwoToneIcon fontSize="large" />
                  )}

                  <ZoomInTwoToneIcon fontSize="large" />
                </div>
                <div className="post__view">
                  <p>Comments...</p>
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default Poster;
