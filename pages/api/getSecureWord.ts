import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import { secureWordStore, rateLimitMap } from '@/lib/store';


export default function getSecureWord(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Invalid username' });
  }

  const now = Date.now();
  const last = rateLimitMap.get(username);
  if (last && now - last < 10_000) {
    return res.status(429).json({ message: 'Try again in a few seconds' });
  }

  const secureWord = crypto
    .createHash('sha256')
    .update(username + now)
    .digest('hex')
    .slice(0, 6);

  secureWordStore.set(username, {
      secureWord,
      issuedAt: now,
  });

  rateLimitMap.set(username, now);

  res.status(200).json({ secureWord });
}