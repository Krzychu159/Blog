import "./Menu.scss";
import user from "../assets/user_logo.svg";
import { RiGridFill } from "react-icons/ri";
import { FaFacebookMessenger } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import Search from "./Search";
import Alerts from "./Alerts";

export default function Menu() {
  return (
    <div className="menu">
      <div className="left">
        <div className="circle">
          <a href="/feed">
            <img src={user} alt="user" />
          </a>
        </div>
        <Search />
      </div>
      <div className="middle">
        <a href="/feed">
          <div>
            <GoHomeFill />
          </div>
        </a>
        <div onClick={() => toast.error("This option is not available...")}>
          <FaUserFriends />
        </div>
        <div onClick={() => toast.error("This option is not available...")}>
          <MdOutlineOndemandVideo />
        </div>
        <div onClick={() => toast.error("This option is not available...")}>
          <BsShop />
        </div>
        <div onClick={() => toast.error("This option is not available...")}>
          <IoPeopleCircleOutline />
        </div>
      </div>
      <div className="right">
        <div
          className="circle"
          onClick={() => toast.error("This option is not available...")}
        >
          <RiGridFill />
        </div>
        <div
          className="circle "
          onClick={() => toast.error("This option is not available...")}
        >
          <FaFacebookMessenger />
        </div>
        <Alerts />
        <div className="circle ">
          <img src={user} alt="user" />
          <ul className="dropdown"></ul>
        </div>
      </div>
    </div>
  );
}
