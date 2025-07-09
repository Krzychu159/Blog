import { useEffect, useRef, useState } from "react";
import "./Menu.scss";
import { supabase } from "../supabaseClient";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [phrase, setPhrase] = useState("");
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
      {/* Desktop */}
      <div className="search desktop-only" onClick={() => setOpen(true)}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaSearch />
        </div>
        <input
          type="text"
          placeholder="Search Facebook"
          onChange={(e) => setPhrase(e.target.value)}
          value={phrase}
        />
      </div>

      {/* Mobile */}
      <div
        className={`search circle mobile-only ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <FaSearch />
      </div>

      {/* Mobile input */}
      {open && (
        <div className=" search mobile-input mobile-only">
          <input
            type="text"
            placeholder="Search Facebook"
            onChange={(e) => setPhrase(e.target.value)}
            value={phrase}
          />
        </div>
      )}

      {/* Final */}
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
