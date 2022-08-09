import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { prisma } from '../db/client';

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  console.log('######## 투표 토큰 쿠키 : ', opts?.req.cookies['poll-token']);

  /**
   *? 매번 import하는 대신  ctx에서 Prisma instance를 꺼내올 수 있다.
   *? 요청한 유저의 정보도 ctx에 넣어서 활용할 수 있다.
   */
  return { prisma, token: opts?.req.cookies['poll-token'] };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
