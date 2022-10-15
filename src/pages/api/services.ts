import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'server/db/client';
import { getServerAuthSession } from 'server/common/get-server-auth-session';

export const services = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (session) {
    const servicesList = await prisma.service.findMany();

    res.status(200).json(servicesList);
  } else {
    res.send({
      error:
        'You must be signed in to view the protected content on this page.',
    });
  }
};
