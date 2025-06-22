import user from "../assets/user_logo.svg";
import "./PostForm.scss";
import { RiLiveFill } from "react-icons/ri";
import { IoMdPhotos } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { toast } from "react-toastify";
export default function PostForm({ onOpenForm }) {
  return (
    <div className="post-form">
      <div className="sentence">
        <img src={user} alt="user" />
        <input
          onClick={onOpenForm}
          type="text"
          placeholder="What's on your mind, XXX"
        />
      </div>
      <div className="post-type">
        <div
          className="ob"
          onClick={() => toast.error("This option is not available...")}
        >
          <RiLiveFill size={23} color="#DD2334" />
          Live video
        </div>
        <div className="ob" onClick={onOpenForm}>
          <IoMdPhotos size={23} color="#00A400" />
          Photo/video
        </div>
        <div className="ob" onClick={onOpenForm}>
          <MdEmojiEmotions size={23} color="#F9CF00" />
          Feeling/activity
        </div>
      </div>
    </div>
  );
}
