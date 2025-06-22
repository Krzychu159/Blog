import "./PostModal.scss";
import { RxCross2 } from "react-icons/rx";
import user from "../assets/user_logo.svg";

export default function PostModal({ onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="post-modal" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <p>&nbsp;</p>
          <p>Create post</p>
          <RxCross2
            color="#b0b3b8"
            size={20}
            onClick={onClose}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="personal">
          <img src={user} alt="user" />
          <div>
            <p>Who is posting?</p>
            <select name="" id="">
              <option value="test">test</option>
            </select>
          </div>
        </div>
        <div className="content">
          <textarea name="" id=""></textarea>
        </div>
        <div className="button">
          <button>Post</button>
        </div>
      </div>
    </div>
  );
}
