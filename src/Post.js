import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import { db } from "./Component/firebase";
import firebase from "firebase/app";
import ImageUpload from "./ImageUpload";
import ReactPlayer from "react-player/lazy";

function Post({ postId, user, username, imageUrl, caption, type }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [extension, setExtension] = useState("jpeg");
  const imagesArray = [
    "jpeg",
    "apng",
    "avif",
    "gif",
    "apng",
    "avif",
    "jpg",
    "jfif",
    "pjpeg",
    "pjp",
    "png",
    "svg",
    "webp",
    "bmp",
    "ico",
    "cur",
    "tif",
    "tiff",
  ];

  const videosArray = [
    "webm",
    "mpg",
    "mp2",
    "mpeg",
    "mpe",
    "mpv",
    "ogg",
    "mp4",
    "m4p",
    "m4v",
    "avi",
    "wmv",
    "mov",
    "qt",
    "flv",
    "swf",
    "avchd",
  ];

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  // console.log(imageUrl.split(".").pop().split("?")[0]);
  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      {type === "image" ? (
        <img className="post__image" src={imageUrl} alt="" />
      ) : (
        <div className="post__image">
          <ReactPlayer
            url={imageUrl}
            light={false}
            playing={false}
            controls={false}
            width="100%"
            height="100%"
          />
        </div>
      )}

      <div className="post__comments">{caption}</div>
      {/*  <img className="post__image" src={imageUrl} alt="" /> <div className="poster__overlay">dfddfd</div>   <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}*/}
    </div>
  );
}

export default Post;
