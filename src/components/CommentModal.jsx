import { useEffect, useState } from "react";
import "./CommentModal.scss";
import { supabase } from "../supabaseClient";
import Post from "../components/Post";
import userIcon from "../assets/user_logo.svg";

export default function CommentModal({ postId, post, onClose, user }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      const { data, error } = await supabase
        .from("comments")
        .select("id, created_at, name, body")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) console.error("Comments error:", error.message);
      else {
        setComments(data);
        console.log(data);
      }
    }

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
        <Post key={postId} post={post} user={user} onClose={onClose} />

        <div className="comments">
          {comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <div>
                {" "}
                <img src={userIcon} alt="" />
              </div>
              <div>
                <p> {comment.name}</p>
                <p> {comment.body}</p>
                <div style={{ display: "flex", gap: "5px", fontSize: "0.7em" }}>
                  <span>date</span>
                  <span>like</span>
                  <span>reply</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => onClose()}></button>
      </div>
    </div>
  );
}
