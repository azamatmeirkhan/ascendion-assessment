import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticator } from 'otplib';

const ATTEMPT_LIMIT = 3;
const mfaAttempts = new Map<string, number>();

const MFA_CODE = 'MFA_CODE';

const generateMfaCode = (secret: string) => {
  return authenticator.generate(secret);
};

export default function verifyMfa(req: NextApiRequest, res: NextApiResponse) {
  const { username, code } = req.body;
  console.log("MFA CODE SERVER: ", generateMfaCode(MFA_CODE))
  if (!username || !code) {
    return res.status(400).json({ message: 'Missing input' });
  }

  const attempts = mfaAttempts.get(username) || 0;

  if (attempts >= ATTEMPT_LIMIT) {
    return res.status(403).json({ message: 'The limits have expired' });
  }

  // const validCode = "123456";
  const validCode = generateMfaCode(MFA_CODE);
  if (code !== validCode) {
    mfaAttempts.set(username, attempts + 1);
    return res.status(401).json({ message: 'Invalid code' });
  }

  mfaAttempts.delete(username);
  res.status(200).json({ token: 'mock-jwt-token' });
}