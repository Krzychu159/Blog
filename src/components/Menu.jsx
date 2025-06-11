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
        <div className="circle">
          <GoHomeFill />
        </div>
        <div className="circle">
          <FaUserFriends />
        </div>
        <div className="circle">
          <MdOutlineOndemandVideo />
        </div>
        <div className="circle">
          <BsShop />
        </div>
        <div className="circle">
          <IoPeopleCircleOutline />
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
