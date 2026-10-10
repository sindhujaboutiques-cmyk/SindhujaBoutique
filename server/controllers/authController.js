const crypto = require('crypto');

// Secret for HMAC token signing
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'sinduja-boutique-super-secret-key-2025';

// Default Admin State (can be updated during runtime or via environment variables)
let adminAccount = {
  id: 'admin-1',
  name: 'Sinduja (Atelier Owner)',
  email: process.env.ADMIN_EMAIL || 'admin@sindujaboutique.com',
  username: process.env.ADMIN_USERNAME || 'admin',
  // Default password: sinduja@admin2025
  password: process.env.ADMIN_PASSWORD || 'sinduja@admin2025',
  role: 'Store Owner & Administrator',
};

// Simple secure token generation helper
const generateToken = (payload) => {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
};

// Token verification helper
const verifyToken = (token) => {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  if (signature !== expectedSig) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Date.now()) return null;
    return payload;
  } catch (e) {
    return null;
  }
};

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both your Username/Email and Password'
      });
    }

    const cleanId = identifier.trim().toLowerCase();
    const isEmailMatch = cleanId === adminAccount.email.toLowerCase();
    const isUserMatch = cleanId === adminAccount.username.toLowerCase();

    if ((isEmailMatch || isUserMatch) && password === adminAccount.password) {
      const token = generateToken({
        id: adminAccount.id,
        email: adminAccount.email,
        name: adminAccount.name,
        role: adminAccount.role
      });

      return res.json({
        success: true,
        message: 'Login successful! Welcome to Sinduja Boutique Management Portal.',
        token,
        admin: {
          id: adminAccount.id,
          name: adminAccount.name,
          email: adminAccount.email,
          username: adminAccount.username,
          role: adminAccount.role,
          avatar: adminAccount.avatar
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid credentials. Please verify your username/email and password.'
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// Verify Admin Token (session validation)
const verifyAdminSession = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.query.token;

    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ success: false, message: 'Session expired or invalid. Please login again.' });
    }

    return res.json({
      success: true,
      valid: true,
      admin: {
        id: adminAccount.id,
        name: adminAccount.name,
        email: adminAccount.email,
        username: adminAccount.username,
        role: adminAccount.role,
        avatar: adminAccount.avatar
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error verifying session' });
  }
};

// Update Admin Password or Profile
const updateAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, newEmail, newName } = req.body;

    if (currentPassword !== adminAccount.password) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect current password. Please enter your existing password to confirm changes.'
      });
    }

    if (newPassword) {
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters long.'
        });
      }
      adminAccount.password = newPassword;
    }

    if (newEmail) adminAccount.email = newEmail.trim();
    if (newName) adminAccount.name = newName.trim();

    return res.json({
      success: true,
      message: 'Admin account settings updated successfully!',
      admin: {
        id: adminAccount.id,
        name: adminAccount.name,
        email: adminAccount.email,
        username: adminAccount.username,
        role: adminAccount.role
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error updating admin credentials' });
  }
};

module.exports = {
  adminLogin,
  verifyAdminSession,
  updateAdminPassword
};
