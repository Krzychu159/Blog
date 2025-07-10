import { useEffect, useRef, useState } from "react";
import "./Menu.scss";
import { PiBellRingingFill } from "react-icons/pi";
import {
  FaCommentDots,
  FaHeart,
  FaUserPlus,
  FaReply,
  FaEnvelope,
} from "react-icons/fa";

export default function Alert() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="alert-element" ref={wrapperRef}>
      <div
        className={opened ? "circle " : "circle not"}
        onClick={() => {
          setOpen(true);
          setOpened(true);
        }}
      >
        <PiBellRingingFill />
      </div>

      {open && (
        <div className="alert-open">
          <li>
            <FaCommentDots style={{ marginRight: "0.5em" }} /> Emily Johnson
            commented on your post
          </li>
          <li>
            <FaHeart style={{ marginRight: "0.5em" }} /> Jack Smith liked your
            post
          </li>
          <li>
            <FaUserPlus style={{ marginRight: "0.5em" }} /> Michael Brown
            started following you
          </li>
          <li>
            <FaReply style={{ marginRight: "0.5em" }} /> Sarah Davis replied to
            your comment
          </li>
          <li>
            <FaEnvelope style={{ marginRight: "0.5em" }} /> You have a new
            message from James
          </li>
        </div>
      )}
    </div>
  );
}
