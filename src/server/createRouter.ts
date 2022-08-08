import { router } from '@trpc/server';
import superjson from 'superjson';
import { Context } from './createContext';

/**
 * ## trpc Router 생성 함수
 * superjson 모듈 추가로 Datetime, set, map등도 serialize 가능하게 처리
 */
export function createRouter() {
  return router<Context>().transformer(superjson);
}
