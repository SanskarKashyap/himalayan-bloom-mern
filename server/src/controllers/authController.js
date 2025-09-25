import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';

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

    const user = await User.findOneAndUpdate(
      { email: userData.email },
      { $set: userData },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    ).lean();

    return res.json({
      user,
      message: 'Google account verified',
    });
  } catch (error) {
    if (error?.name === 'Error' && error.message === 'Google client ID is not configured') {
      return res.status(500).json({ message: error.message });
    }

    if (error?.message?.toLowerCase().includes('invalid token')) {
      return res.status(401).json({ message: 'Invalid Google credential' });
    }

    return next(error);
  }
}
