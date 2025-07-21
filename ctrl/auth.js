import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// create auth token
export function createAuthToken(user) {
  const payload = {
    username: user.username,
    userType: user.userType || 'user',
  };
  const options = {
    expiresIn: '1h',
  };
  return jwt.sign(payload, JWT_SECRET, options);
}
// set auth cookie
export function setAuthCookie(res, token) {
  res.cookie('auth_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  });
}
