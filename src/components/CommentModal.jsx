import { useEffect, useState } from "react";
import "./CommentModal.scss";
import { supabase } from "../supabaseClient";
import Post from "../components/Post";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";

import { IoSendSharp } from "react-icons/io5";

export default function CommentModal({ postId, post, onClose, user }) {
  const [comments, setComments] = useState([]);
  const [likedMap, setLikedMap] = useState({});
  const [text, setText] = useState("");

  useEffect(() => {
    async function fetchComments() {
      const { data, error } = await supabase
        .from("commentsv2")
        .select(
          "id, created_at, body, user_id, usersv2(full_name, image), likes"
        )
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) console.error("Comments error:", error.message);
      else setComments(data);
    }

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleLike = async (commentId, currentLikes) => {
    const isLiked = likedMap[commentId];

    const newLikes = isLiked ? currentLikes - 1 : currentLikes + 1;

    const { error } = await supabase
      .from("commentsv2")
      .update({ likes: newLikes })
      .eq("id", commentId);

    if (!error) {
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, likes: newLikes } : c))
      );
      setLikedMap((prev) => ({ ...prev, [commentId]: !isLiked }));
    } else {
      console.error("Like update error:", error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  async function addComment() {
    if (text.trim().length < 5) {
      toast.error("Comment too short!");
      return;
    }

    const { error } = await supabase
      .from("commentsv2")
      .insert({ post_id: postId, body: text, user_id: 12, likes: 0 });
    toast.success("Comment added corectly!");
    setText("");

    if (error) {
      console.error("likes error: ", error.message);
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
        <Post key={postId} post={post} user={user} onClose={onClose} />

        <div className="comments">
          <div className="comment">
            <div>
              {!comments && <div> Not comment yet</div>}
              <img
                src="https://randomuser.me/api/portraits/women/16.jpg"
                alt=""
              />
            </div>
            <div className="content">
              <div className="add-comment-form">
                <input
                  className="body"
                  placeholder="Comment as Daniel Miller"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />
                <div style={{ cursor: "pointer" }} onClick={() => addComment()}>
                  <IoSendSharp />
                </div>
              </div>
            </div>
            <div></div>
          </div>
          {comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <div>
                <img src={comment.usersv2.image} alt="avatar" />
              </div>
              <div>
                <div className="content">
                  <p className="name">{comment.usersv2.full_name}</p>
                  <p className="body">{comment.body}</p>
                </div>
                <div className="under-comment">
                  <div className="left">
                    <span>
                      {formatDistanceToNow(new Date(comment.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                    <span
                      className="like-btn"
                      onClick={() => handleLike(comment.id, comment.likes)}
                    >
                      {likedMap[comment.id] ? "Unlike" : "Like"}
                    </span>
                    <span
                      onClick={() =>
                        toast.error("This option is not available...")
                      }
                    >
                      Reply
                    </span>
                  </div>
                  <div className="right">
                    {comment.likes}{" "}
                    <img
                      src="https://scontent-waw2-1.xx.fbcdn.net/m1/v/t6/An8xkEVooUCo5SJedJYOC_iN5OmR2RJo8c1g_Cn96AzPhQ25HQCvCZzyKnk8f2-P-HPtb5ZU1xBQXIOFR6XnrQOf5BUfZ0lFsPt0FaUBAp99uRULbyFl9GuStTxoWbM.png?_nc_gid=H_EN0yB6aWOHbw_r16E4tQ&_nc_oc=AdkP9-KMm3TKiHDKLuZoA_t46-6w4PEL_axR-KiBrA-hRRQ89PAl9gwTKLKPrFLXRew&ccb=10-5&oh=00_AfIrV4lWgOIn9YjM9cyeTnNhaxp9gOeVeCAVlT2LMXCOHQ&oe=68653388&_nc_sid=7da55a"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
