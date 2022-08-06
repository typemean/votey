import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../db/client';

export function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  /**
   *? 매번 import하는 대신  ctx에서 Prisma instance를 꺼내올 수 있다.
   *? 요청한 유저의 정보도 ctx에 넣어서 활용할 수 있다.
   */
  return { req, res, prisma };
}

export type Context = ReturnType<typeof createContext>;
