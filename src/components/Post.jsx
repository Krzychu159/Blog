import "./Post.scss";
import user from "../assets/user_logo.svg";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { FaGlobeAmericas } from "react-icons/fa";
import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Post({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const [deleted, setDeleted] = useState(false);

  async function updateLikes() {
    if (liked) {
      setLiked(false);
      const newLikes = likes - 1;
      setLikes(newLikes);
      const { error } = await supabase
        .from("posts")
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
        .from("posts")
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
      alert("Link został skopiowany do schowka!");
    } catch (err) {
      console.error("Błąd kopiowania:", err);
    }
  };

  return (
    <>
      {deleted ? (
        <div className="post-item-deleted">
          <p>Post Deleted </p>
          <div>
            <button onClick={() => setDeleted(false)}>Back</button>{" "}
            <button onClick={() => alert("Report Sent!")}>Report</button>
          </div>
        </div>
      ) : (
        <div className="post-item">
          <header>
            <div className="left">
              <img src={user} alt="user img" />
              <div className="user-data">
                <div className="username">{post.user_email.split("@")[0]}</div>
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
              <div>
                <BsThreeDots color="#b0b3b8;" size={20} />
              </div>
              <div onClick={() => setDeleted(true)}>
                <RxCross2 color="#b0b3b8;" size={20} />
              </div>
            </div>
          </header>
          <main>
            <div className="post-body">{post.body}</div>
            <img src={post.img_url} alt="image post" />
          </main>
          <footer>
            <div className="likes">
              <div className="like-icon">
                <img
                  src="https://scontent-waw2-1.xx.fbcdn.net/m1/v/t6/An8xkEVooUCo5SJedJYOC_iN5OmR2RJo8c1g_Cn96AzPhQ25HQCvCZzyKnk8f2-P-HPtb5ZU1xBQXIOFR6XnrQOf5BUfZ0lFsPt0FaUBAp99uRULbyFl9GuStTxoWbM.png?_nc_gid=H_EN0yB6aWOHbw_r16E4tQ&_nc_oc=AdkP9-KMm3TKiHDKLuZoA_t46-6w4PEL_axR-KiBrA-hRRQ89PAl9gwTKLKPrFLXRew&ccb=10-5&oh=00_AfIrV4lWgOIn9YjM9cyeTnNhaxp9gOeVeCAVlT2LMXCOHQ&oe=68653388&_nc_sid=7da55a"
                  alt=""
                />{" "}
                <div style={{ marginLeft: "3px" }}>{likes}</div>
              </div>
              <div className="like-icon">
                <div style={{ marginRight: "6px" }}>XX</div>

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
              <button>
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
