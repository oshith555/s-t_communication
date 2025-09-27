import jwt from 'jsonwebtoken';
import User from '../models/User.js';

function signToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already in use' });
    const user = await User.create({ name, email, password, role: role || 'employee' });
    const token = signToken(user);
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
    return res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    return res.status(400).json({ message: 'Registration failed', error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    user.lastLoginAt = new Date();
    await user.save();
    const token = signToken(user);
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
    return res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    return res.status(400).json({ message: 'Login failed', error: err.message });
  }
}

export async function me(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Not found' });
    return res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(400).json({ message: 'Failed', error: err.message });
  }
}

export function logout(req, res) {
  res.clearCookie('token');
  return res.json({ message: 'Logged out' });
}


