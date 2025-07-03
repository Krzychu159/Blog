import { useEffect, useRef, useState } from "react";
import "./Menu.scss";
import { supabase } from "../supabaseClient";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from("usersv2").select("*");

      if (error) console.error("Comments error:", error.message);
      else {
        setUsers(data);
      }
    }
    fetchUsers();
  }, []);

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
    <div className="search-element" ref={wrapperRef}>
      <div className="search desktop-only" onClick={() => setOpen(true)}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaSearch />
        </div>
        <input type="text" placeholder="Search Facebook" />
      </div>

      <div className="search circle mobile-only" onClick={() => setOpen(true)}>
        <FaSearch />
      </div>

      {open && (
        <div className="search-result">
          {users.map((user) => (
            <li key={user.id}>{user.full_name}</li>
          ))}
        </div>
      )}
    </div>
  );
}
