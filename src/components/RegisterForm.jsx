import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";
import "./LoginForm.scss";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setInfo("Check your e-mail adres.");
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
        <form onSubmit={handleRegister}>
          <h2>Sign Up</h2>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={{ color: "white" }}>
            Sign Up!
          </button>

          {info && <p style={{ color: "green" }}>{info}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        <p onClick={() => alert("Better not forget :)")}>Forgot password?</p>
        <Link to="/login">
          <button className="create"> Log In!</button>
        </Link>
      </div>
      <p>Create a Page for a celebrity, brand or business.</p>
    </div>
  );
}
