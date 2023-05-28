import type { NextApiRequest, NextApiResponse } from 'next';

import middleware from '@/server/middleware';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authJwt = middleware(req, res);

  res.status(200).json({ name: 'John Doe' });
}
