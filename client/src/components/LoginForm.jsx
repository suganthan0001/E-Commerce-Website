
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import profiles from '../profiles.json';

export default function LoginForm({loginSuccess}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const user = profiles.find((profile) => profile.username === username && profile.password === password);
    if (user) {
      loginSuccess();
      window.localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } else {
      alert('Incorrect username or password');
    }
  };

  return (
    <div className="login-body">
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={handleLogin}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <button type="submit">Login</button>
            <p className="message">
              Not registered? <Link to="/signup">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div> 
  );
}
