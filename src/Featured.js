import React, { useEffect, useState } from "react";
import "./Featured.css";
import Post from "./Post";
import { db } from "./Component/firebase";

function Featured() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // will only run once when the app component loads...

    db.collection("posts")
      .orderBy("timestamp", "desc")
      .limit(3)
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <div className="featured">
      <h2>Featured</h2>
      <div className="featured__container">
        {posts.map(({ id, post }) => (
          <div className="featured__items" key={id}>
            <div className="featured__height">
              <Post
                key={id}
                postId={id}
                username={post.username}
                imageUrl={post.imageUrl}
                caption={post.title}
                category={post.category}
                type={post.type}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Featured;
