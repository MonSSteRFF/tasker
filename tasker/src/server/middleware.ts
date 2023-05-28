import { NextApiRequest, NextApiResponse } from 'next';

const middleware = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.authorization !== process.env.NEXT_PUBLIC_AUTHENTICATION_TOKEN) {
    res.status(401).json({ message: 'AUTHENTICATION FAILED' });
  }

  return !(req.headers.token === '' || req.headers.token === undefined);
};

export default middleware;
