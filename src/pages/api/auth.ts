import type { NextApiRequest, NextApiResponse } from 'next';

import login from '@/server/authModule/login';
import register from '@/server/authModule/register';
import middleware from '@/server/middleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authJwt = middleware(req, res);

  const q = req.query;
  const m = req.method;
  const b = req.body;

  if (q.login === '' && m === 'POST') {
    await login(b, res);
  } else if (q.register === '' && m === 'POST') {
    await register(b, res);
  } else if (q.refresh === '' && m === 'POST') {
    res.status(404).json({ message: 'CURREN DOSENT WORK' });
  } else {
    res.status(404).json({ message: 'METHOD OR QUERY ERROR' });
  }
}
