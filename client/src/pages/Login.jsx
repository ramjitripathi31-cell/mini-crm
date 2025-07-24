import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../App';

const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL_PROD;


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/login`,
        { email, password }
      );
      login(data.token);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-80 space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Sign in
        </button>
        <p
          className="text-sm text-center cursor-pointer text-blue-600"
          onClick={() => nav('/register')}
        >
          No account? Register
        </p>
      </form>
    </div>
  );
}
