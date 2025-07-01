import { useState } from "react";
import { login } from "../api/auth";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./LoginForm.scss";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const { user } = await login(email, password);
      setUser(user);
      navigate("/feed");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="login-form">
      <div className="left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Facebook_Logo_%282019%29.svg/2560px-Facebook_Logo_%282019%29.svg.png"
          alt="fb"
        />
        <p>Connect with friends and the world around you on Facebook</p>
      </div>
      <div className="right">
        <form onSubmit={handleSubmit}>
          <h2>Log In</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Hasło"
          />
          <button type="submit" style={{ color: "white" }}>
            Login
          </button>
          {errorMsg && (
            <p
              onLoad={() => toast.error("Better not forget")}
              style={{ color: "red" }}
            >
              {errorMsg}
            </p>
          )}
        </form>
        <p onClick={() => toast.error("Better not forget")}>Forgot password?</p>
        <Link to="/register">
          <button className="create">Create new account</button>
        </Link>
      </div>
      <p>Create a Page for a celebrity, brand or business.</p>
      <p>Example account e-mail: dqh24342@jioso.com / password:password</p>
    </div>
  );
}
