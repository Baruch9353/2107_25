import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export function createAuthToken(user) {
  const payload = { username: user.username, userType: user.userType || 'user' };
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, JWT_SECRET, options);
}
export function setAuthCookie(res, token) {
  res.cookie('auth_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  });
}
function verifyAuthToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
// Middleware for route protection
export function authMiddleware(allowedTypes = []) {
  return (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({ error: 'Missing auth token' });
    }
    try {
      const payload = verifyAuthToken(token);
      if (allowedTypes.length > 0 && !allowedTypes.includes(payload.userType)) {
        return res.status(403).json({ error: 'Permission denied' });
      }
      req.user = payload;
      next();
    } catch {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
}
