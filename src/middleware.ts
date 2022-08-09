// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { nanoid } from 'nanoid';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log('Request: ', request.cookies);

  if (request.cookies.get('poll-token')) {
    console.log('쿠키 "poll-token"가 존재해요.... ');
    return;
  }

  const response = NextResponse.next();

  const random = nanoid();

  response.cookies.set('poll-token', random, { sameSite: 'strict' });

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
};
