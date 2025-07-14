import { useEffect, useRef, useState } from "react";
import "./Menu.scss";
import { supabase } from "../supabaseClient";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [phrase, setPhrase] = useState("");
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

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

  const filteredUsers =
    phrase.length > 0
      ? users.filter((user) =>
          user.full_name.toLowerCase().includes(phrase.toLowerCase())
        )
      : users;

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
          {filteredUsers.map((user) => (
            <li key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
              <img src={user.image} alt="" />
              <div>{user.full_name}</div>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
