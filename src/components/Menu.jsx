import "./Menu.scss";
import user from "../assets/user_logo.svg";
import { FaSearch } from "react-icons/fa";
import { RiGridFill } from "react-icons/ri";
import { FaFacebookMessenger } from "react-icons/fa";
import { PiBellRingingFill } from "react-icons/pi";
import { GoHomeFill } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function Menu() {
  return (
    <div className="menu">
      <div className="left">
        <div className="circle">
          <a href="/feed">
            <img src={user} alt="user" />
          </a>
        </div>
        <>
          <div className="search desktop-only">
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaSearch />
            </div>
            <input type="text" placeholder="Search Facebook" />
          </div>

          <div className="circle mobile-only">
            <FaSearch />
          </div>
        </>
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
        <div className="circle not">
          <FaFacebookMessenger />
        </div>
        <div className="circle not">
          <PiBellRingingFill />
        </div>
        <div className="circle arrow">
          <img src={user} alt="user" />
          <ul className="dropdown"></ul>
        </div>
      </div>
    </div>
  );
}
