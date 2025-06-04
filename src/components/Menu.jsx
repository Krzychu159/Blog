import "./Menu.scss";
import user from "../assets/user_logo.svg";
import { FaSearch } from "react-icons/fa";
import { RiGridFill } from "react-icons/ri";
import { FaFacebookMessenger } from "react-icons/fa";
import { PiBellRingingFill } from "react-icons/pi";

export default function Menu() {
  return (
    <div className="menu">
      <div className="left">
        <div className="circle">
          <img src={user} alt="user" />
        </div>
        <div className="circle">
          <FaSearch />
        </div>
      </div>
      <div className="right">
        <div className="circle">
          <RiGridFill />
        </div>
        <div className="circle">
          <FaFacebookMessenger />
        </div>
        <div className="circle">
          <PiBellRingingFill />
        </div>
        <div className="circle">
          <img src={user} alt="user" />
        </div>
      </div>
    </div>
  );
}
