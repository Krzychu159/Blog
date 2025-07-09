import { useEffect, useRef, useState } from "react";
import "./Menu.scss";
import { PiBellRingingFill } from "react-icons/pi";

export default function Alert() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

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
      <div className="circle not" onClick={() => setOpen(true)}>
        <PiBellRingingFill />
      </div>

      {open && (
        <div className="alert-open">
          <li>Emily Johnson commented on your post</li>
          <li>Jack Smith liked your post</li>
          <li>Michael Brown started following you</li>
          <li>Sarah Davis replied to your comment</li>
          <li>You have a new message from James </li>
        </div>
      )}
    </div>
  );
}
