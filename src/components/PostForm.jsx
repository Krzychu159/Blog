import user from "../assets/user_logo.svg";
import "./PostForm.scss";
import { RiLiveFill } from "react-icons/ri";
import { IoMdPhotos } from "react-icons/io";

export default function PostForm() {
  return (
    <div className="post-form">
      <div className="sentence">
        <img src={user} alt="user" />
        <input type="text" placeholder="What's on your mind, XXX" />
      </div>
      <div className="post-type">
        <div
          className="ob"
          onClick={() =>
            alert(
              "This option is not available and is unlikely to be offered in the future."
            )
          }
        >
          <RiLiveFill size={27} color="#DD2334" />
          Live video
        </div>
        <div className="ob">
          <IoMdPhotos size={27} color="#00A400" />
          Photo/video
        </div>
      </div>
    </div>
  );
}
