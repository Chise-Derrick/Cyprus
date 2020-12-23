import React, { useState } from "react";
import { Button, Input } from "@material-ui/core/";
import { storage, db } from "./Component/firebase";
import firebase from "firebase/app";
import "./ImageUpload.css";

function ImageUpload(props) {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [imgType, setImgType] = useState("jpeg");
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

  const handleChange = (e) => {
    console.log(e.target);
    console.log(e.files);
    console.log(e);
    let img = e.target.files[0].name
      .toLowerCase()
      .split(".")
      .pop()
      .split("?")[0];
    console.log(img);
    if (videosArray.indexOf(img) !== -1) {
      console.log(videosArray[videosArray.indexOf(img)]);
      setImgType("video");
    } else if (imagesArray.indexOf(img) !== -1) {
      setImgType("image");
      console.log(imagesArray[imagesArray.indexOf(img)]);
    }
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Complete
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // Post image url to database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              title: props.title,
              category: props.category,
              location: props.location,
              description: props.description,
              imageUrl: url,
              username: props.username,
              type: imgType,
            });

            setProgress(0);
            setCaption("");
            setImage("");
          });
      }
    );
  };

  return (
    <div className="imageUpload">
      <Input type="file" onChange={handleChange} />
      <progress className="imageUpload__progress" value={progress} max="100" />

      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
