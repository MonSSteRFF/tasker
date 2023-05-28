import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

import middleware from '@/server/middleware';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authJwt = middleware(req, res);

  const lang = req.query.ru === '' ? 'ru' : 'en';

  const data = fs.readFileSync(`data/lang/${lang}.json`, 'utf8');

  res.status(200).json(data);
}
