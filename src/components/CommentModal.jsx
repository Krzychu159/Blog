import { useEffect, useState } from "react";
import "./CommentModal.scss";
import { supabase } from "../supabaseClient";

export default function CommentModal({ postId, onClose }) {
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

  return (
    <div className="overlay">
      <div className="comment-modal">modal</div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>name: {comment.name}</p>
          <p>body: {comment.body}</p>
        </div>
      ))}
      <button onClick={() => onClose()}></button>
    </div>
  );
}
