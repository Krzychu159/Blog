import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import Story from "../components/Story";
import Menu from "../components/Menu";
import CommentModal from "../components/CommentModal";
import "./Feed.scss";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) console.log("Posts error:", error.message);
      else {
        setPosts(data);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from("users").select("*");
      if (error) console.log("Users error:", error.message);
      else setUsers(data);
    }
    fetchUsers();
  }, []);

  const openComments = (postId) => {
    setSelectedPostId(postId);
  };
  const closeComments = () => {
    setSelectedPostId(null);
  };

  return (
    <div>
      <Menu />
      <div className="container">
        <div className="feed">
          <PostForm />
          <Story />
          <div className="post-list">
            {loading ? "loading" : null}
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                user={users.find((u) => u.id === post.user_id)}
                onOpenComments={openComments}
                onClose={closeComments}
              />
            ))}
            {selectedPostId && (
              <CommentModal
                postId={selectedPostId}
                post={posts.find((p) => p.id === selectedPostId)}
                onClose={closeComments}
                user={users.find(
                  (u) =>
                    u.id === posts.find((p) => p.id === selectedPostId).user_id
                )}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
