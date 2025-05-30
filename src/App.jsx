import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Fetch error:", error);
      else setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Supabase Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>{post.likes} likes</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
