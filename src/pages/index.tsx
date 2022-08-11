import QuestionCreator from '@/components/QuestionCreator';
import { trpc } from '@/utils/trpc';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const { data, isLoading } = trpc.useQuery(['questions.get-all-my-question']);

  if (isLoading || !data) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <Head>
        <title>Home | OnAVote</title>
      </Head>

      <div className="flex min-h-screen flex-col p-6">
        <div className="mx-auto flex w-full max-w-4xl flex-col">
          <header className="mb-8 flex items-center justify-between">
            <p className="text-4xl font-bold">My Poll</p>
            <Link href="/create">
              <a className="btn btn-circle w-24">Create</a>
            </Link>
          </header>

          <ul className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-2 md:grid-cols-3 md:gap-x-5">
            {data.map((question) => (
              <li
                key={question.id}
                className="group card bg-base-100 shadow-xl"
              >
                <Link href={`/question/${question.id}`}>
                  <a className="card-body ">
                    <div className="card-title group-hover:text-violet-500">
                      {question.question}
                    </div>

                    <div className="card-actions mt-5 items-center justify-between">
                      <span className="text-sm text-white/50">
                        Created on {question.createdAt.toDateString()}
                      </span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                      </span>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
