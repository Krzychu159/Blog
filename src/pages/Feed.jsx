import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import Story from "../components/Story";
import Menu from "../components/Menu";
import "./Feed.scss";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("Error: ", error.message);
      } else {
        setPosts(data);
      }

      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <Menu />
      <div className="container">
        <div className="side-bar"></div>
        <div className="feed">
          <PostForm />
          <Story />
          <div className="post-list">
            {loading ? "loading" : null}
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="group-chat"></div>
      </div>
    </div>
  );
}
