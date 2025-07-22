import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const makeToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg: 'User exists' });

  const user = await User.create({ name, email, password });
  res.json({ token: makeToken(user._id) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ msg: 'Invalid credentials' });

  res.json({ token: makeToken(user._id) });
};
