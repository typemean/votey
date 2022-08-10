import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import { AppRouter } from '@/server/routers/app.router';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import superjson from 'superjson';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

function getBaseUrl() {
  if (process.browser) return ''; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    //? Debug에 유용한 Link들을 추가
    const links = [
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === 'development' ||
          (opts.direction === 'down' && opts.result instanceof Error),
      }),
      httpBatchLink({
        maxBatchSize: 10,
        url: `${getBaseUrl()}/api/trpc`,
      }),
    ];

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
            refetchOnWindowFocus: false,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          console.log(
            '&&&&&&&&&&&&&&&&&&&&& 헤 더 &&&&&&&&&&&&&&&&&&&&&: ',
            ctx.req.headers
          );

          return {
            ...ctx.req.headers,
            'x-ssr': '1',
          };
        }
        return {
          // cookie: ctx?.req?.headers.cookie //? 헤더의 쿠키만 전달하기
        };
      },
      links,
      transformer: superjson,
    };
  },
  ssr: true,
})(MyApp);
