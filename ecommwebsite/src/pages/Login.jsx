import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem('user'));
    if (stored?.username === form.username && stored?.password === form.password) {
      localStorage.setItem('loggedIn', 'true');
      toast.success('Login successful!');
      navigate('/');
    } else {
      toast.error('Invalid credentials. Try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4 rounded-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center text-success mb-4">Login Form</h3>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="btn btn-success w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
