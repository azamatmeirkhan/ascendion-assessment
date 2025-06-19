import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { secureWordStore } from '@/lib/store';

const JWT_TOKEN = 'mock_token';

export default function login(req: NextApiRequest, res: NextApiResponse) {
  const { username, hashedPassword, secureWord } = req.body;

  if (!username || !hashedPassword) {
    return res.status(400).json({ message: 'Missing credentials' });
  }

  const session = secureWordStore.get(username);
  if (!session || !secureWord) {
    return res.status(401).json({ message: 'Secure word invalid or missing' });
  }

  const isExpired = Date.now() - session.issuedAt > 60_000;
  if (isExpired) {
    secureWordStore.delete(username);
    return res.status(401).json({ message: 'Secure word expired' });
  }
  
  const token = jwt.sign({ username }, JWT_TOKEN, { expiresIn: '5m' });

  res.status(200).json({ token });
}