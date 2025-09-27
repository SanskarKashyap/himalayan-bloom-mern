import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw Object.assign(new Error('JWT_SECRET is not configured'), { statusCode: 500 });
  }
  return secret;
}

function resolveRole(email, existingRole) {
  if (existingRole === 'Admin') {
    return existingRole;
  }

  const adminEmails = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  if (adminEmails.includes(email.toLowerCase())) {
    return 'Admin';
  }

  return 'Consumer';
}

let oauthClient;

function getOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw Object.assign(new Error('Google client ID is not configured'), { statusCode: 500 });
  }

  if (!oauthClient) {
    oauthClient = new OAuth2Client(clientId);
  }

  return oauthClient;
}

export async function authenticateWithGoogle(req, res, next) {
  try {
    const { credential } = req.body ?? {};

    if (!credential) {
      return res.status(400).json({ message: 'Missing Google credential' });
    }

    const client = getOAuthClient();
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      return res.status(401).json({ message: 'Unable to verify Google account' });
    }

    const userData = {
      name: payload.name,
      email: payload.email,
      googleId: payload.sub,
      picture: payload.picture,
      authProvider: 'google',
    };

    const existingUser = await User.findOne({ email: userData.email }).lean();
    const role = resolveRole(userData.email, existingUser?.role);

    const user = await User.findOneAndUpdate(
      { email: userData.email },
      { $set: { ...userData, role } },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    ).lean();

    const token = jwt.sign(
      {
        sub: user._id.toString(),
        email: user.email,
        role: user.role,
      },
      getJwtSecret(),
      {
        expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
      }
    );

    return res.json({
      user,
      token,
      message: 'Google account verified',
    });
  } catch (error) {
    if (error?.name === 'Error' && error.message === 'Google client ID is not configured') {
      return res.status(500).json({ message: error.message });
    }

    if (error?.message === 'JWT_SECRET is not configured') {
      return res.status(500).json({ message: error.message });
    }

    if (error?.message?.toLowerCase().includes('invalid token')) {
      return res.status(401).json({ message: 'Invalid Google credential' });
    }

    return next(error);
  }
}
