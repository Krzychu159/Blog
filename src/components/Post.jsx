import "./post.scss";
import user from "../assets/user_logo.svg";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";

export default function Post({ post }) {
  return (
    <div className="post-item">
      <header>
        <div className="left">
          <img src={user} alt="user img" />
          <div>{post.user_email}</div>
        </div>
        <div>
          {new Date(post.created_at).toLocaleString("pl-PL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </header>
      <main>
        <div>{post.body}</div>
        <img src={post.img_url} alt="image post" />
      </main>
      <footer>
        <div className="likes">
          <div>
            <AiFillLike size={20} color="blue" /> {post.likes}
          </div>
          <div>
            <FaComment size={20} color="black" /> {post.likes}
          </div>
        </div>
        <div className="buttons">
          <button>
            <AiFillLike size={20} color="blue" />
            Like It
          </button>
          <button>
            <FaComment size={20} color="black" />
            Comment
          </button>
          <button>Share</button>
        </div>
      </footer>
    </div>
  );
}
