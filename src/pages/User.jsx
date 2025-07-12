import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function User() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("postsv2")
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false });
      if (error) console.log("Posts error:", error.message);
      else setPosts(data);
    }
    fetchPosts();
  }, [id]);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase
        .from("usersv2")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.log("User error:", error.message);
      else setUser(data);
    }
    fetchUser();
  }, [id]);

  return (
    <div>
      <div>{user?.full_name}</div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.body}</li>
        ))}
      </ul>
    </div>
  );
}
