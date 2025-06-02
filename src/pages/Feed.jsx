import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Post from "../components/Post";
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
      <h1>Posts</h1>
      {loading ? "loading" : null}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
