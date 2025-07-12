import "./Post.scss";
import userIcon from "../assets/user_logo.svg";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { FaGlobeAmericas } from "react-icons/fa";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";
import { BiBorderBottom } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Post({
  post,
  user,
  onOpenComments,
  onClose,
  commentCount,
}) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [dots, setDots] = useState(false);
  const navigate = useNavigate();

  async function updateLikes() {
    if (liked) {
      setLiked(false);
      const newLikes = likes - 1;
      setLikes(newLikes);
      const { error } = await supabase
        .from("postsv2")
        .update({ likes: newLikes })
        .eq("id", post.id);

      if (error) {
        console.error("likes error: ", error.message);
        setLikes(likes);
      }
    } else {
      const newLikes = likes + 1;
      setLikes(newLikes);
      const { error } = await supabase
        .from("postsv2")
        .update({ likes: newLikes })
        .eq("id", post.id);

      if (error) {
        console.error("likes error: ", error.message);
        setLikes(likes);
      }
    }
  }

  const handleCopyLink = async () => {
    const link = `post${post.id}`;
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Post URL is copied...");
    } catch (err) {
      console.error("Błąd kopiowania:", err);
    }
  };

  return (
    <>
      {deleted ? (
        <div className="post-item-deleted">
          <p>
            Post <span style={{ color: "gray" }}> #{post.id}</span> Deleted{" "}
          </p>
          <div>
            <button onClick={() => setDeleted(false)}>Return</button>{" "}
            <button onClick={() => toast.success("Repot sent!")}>Report</button>
          </div>
        </div>
      ) : (
        <div className="post-item">
          <header>
            <div className="left">
              <img src={user?.image || userIcon} alt="User profile" />

              <div className="user-data">
                <div
                  className="username"
                  onClick={() => navigate(`/user/${user.id}`)}
                >
                  {user ? user.full_name : "Unkown user..."}
                </div>

                <div className="date">
                  {new Date(post.created_at).toLocaleString("pl-PL", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  <FaGlobeAmericas size={11} />
                </div>
              </div>
            </div>
            <div className="right">
              <div onClick={() => setDots((prev) => !prev)}>
                <BsThreeDots color="#b0b3b8" size={20} />
              </div>
              {dots && (
                <div className="dots-modal">
                  <div onClick={() => setDeleted(true)}>Hide post</div>
                  <div onClick={() => toast.success("Repot sent!")}>Report</div>
                </div>
              )}
              <div
                onClick={() => {
                  onClose();
                  setDeleted(true);
                }}
              >
                <RxCross2 color="#b0b3b8" size={20} />
              </div>
            </div>
          </header>
          <main onClick={() => onOpenComments(post.id)}>
            <div className="post-body">{post.body}</div>
            {post.img_url && <img src={post.img_url} alt="image post" />}
          </main>
          <footer>
            <div className="likes">
              <div className="like-icon">
                <BiLike color="#5AA7FF" />

                <div style={{ marginLeft: "3px" }}>{likes}</div>
              </div>
              <div
                className="like-icon"
                onClick={() => onOpenComments(post.id)}
              >
                <div style={{ marginRight: "6px" }}>{commentCount}</div>
                <FaComment size={20} color="#b0b3b8" />
              </div>
            </div>
            <div className="buttons">
              <button
                onClick={() => {
                  setLiked(true);
                  updateLikes();
                }}
              >
                <AiFillLike size={20} color={liked ? "#0866FF" : "#b0b3b8"} />
                Like
              </button>
              <button onClick={() => onOpenComments(post.id, commentCount)}>
                <FaComment size={20} color="#b0b3b8" />
                Comment
              </button>

              <button onClick={() => handleCopyLink()}>
                <FaShare size={20} color="#b0b3b8" />
                Share
              </button>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
