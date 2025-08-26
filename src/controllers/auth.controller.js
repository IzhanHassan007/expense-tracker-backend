const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signJwt } = require('../utils/jwt');
const asyncHandler = require('../utils/asyncHandler');

exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(409).json({ error: { code: 'CONFLICT', message: 'Email already registered' } });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  const token = signJwt(user);
  res.status(201).json({ message: 'User created', user: { id: user._id, name: user.name, email: user.email }, token });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' } });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' } });
  const token = signJwt(user);
  res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email }, token });
});








