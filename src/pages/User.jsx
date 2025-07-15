import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./User.scss";
import Menu from "../components/Menu";
import Post from "../components/Post";
import CommentModal from "../components/CommentModal";

export default function User() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [commentCounts, setCommentCounts] = useState({});
  const [selectedPostId, setSelectedPostId] = useState(null);

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

  useEffect(() => {
    async function fetchCommentCounts() {
      const { data, error } = await supabase
        .from("commentsv2")
        .select("post_id");

      if (error) {
        console.error("Comment counts error:", error.message);
        return;
      }

      const map = {};
      data.forEach(({ post_id }) => {
        if (!map[post_id]) map[post_id] = 1;
        else map[post_id]++;
      });

      setCommentCounts(map);
    }

    fetchCommentCounts();
  }, []);

  const openComments = (postId) => {
    setSelectedPostId(postId);
  };
  const closeComments = () => {
    setSelectedPostId(null);
  };

  return (
    <>
      <Menu />
      <div className="user-page">
        <div className="back-photo">
          <img src={user?.bgc_photo} alt="back" />
        </div>
        <div className="main-line">
          <div className="left">
            <div className="photo">
              <img src={user?.image} alt="user" />
            </div>
            <div className="name">
              <p>{user?.full_name}</p>
              <p>{user?.email}</p>
            </div>
          </div>
          <div className="right">
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="message"> Message</button>
              <button className="more">WhatsApp</button>
            </div>
          </div>
        </div>
        <div className="tabs">
          <li>Posts</li>
          <li>About</li>
          <li>Friends</li>
          <li>Photos</li>
        </div>
        <main className="content">
          <div className="intro">
            <h2>Intro</h2>
            <span>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </span>
          </div>
          <div className="posts">
            <ul>
              {posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  user={user}
                  commentCount={commentCounts[post.id] || 0}
                  onOpenComments={openComments}
                  onClose={closeComments}
                />
              ))}
            </ul>
          </div>
        </main>
      </div>
      {selectedPostId && (
        <CommentModal
          postId={selectedPostId}
          post={posts.find((p) => p.id === selectedPostId)}
          onClose={closeComments}
          user={user}
        />
      )}
    </>
  );
}
