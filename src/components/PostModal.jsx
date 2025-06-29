import "./PostModal.scss";
import { RxCross2 } from "react-icons/rx";
import user from "../assets/user_logo.svg";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import ImageUploader from "./ImageUploader";

export default function PostModal({ onClose }) {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [text, setText] = useState("");
  const [postUrl, setPostUrl] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from("usersv2").select("*");
      if (error) console.log("Users error:", error.message);
      else {
        setUsers(data);
      }
    }
    fetchUsers();
  }, []);

  const handleImageUpload = (url) => {
    console.log("Uploaded image URL:", url);
    setPostUrl(url);
  };

  async function addPost() {
    if (userId === "" || text === "" || postUrl === "") {
      console.log("empty fields");
    } else {
      console.log("no empty fields");
      const { error } = await supabase
        .from("postsv2")
        .insert({ img_url: postUrl, body: text, user_id: userId, likes: 0 });

      if (error) {
        console.error("likes error: ", error.message);
      }
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="post-modal" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <p>&nbsp;</p>
          <p>Create post</p>
          <RxCross2
            color="#b0b3b8"
            size={20}
            onClick={onClose}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="personal">
          <img
            src={users.find((u) => u.id === userId)?.image || user}
            alt="user"
          />
          <div>
            <p>Who is posting?</p>
            <select
              onChange={(e) => {
                setUserId(Number(e.target.value));
              }}
              name=""
              id=""
            >
              <option value="nyll">Choose user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.full_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="content">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something.."
          ></textarea>
          <ImageUploader onUpload={handleImageUpload} />
        </div>
        <div className="button">
          <button onClick={() => addPost()}>Post</button>
        </div>
      </div>
    </div>
  );
}
