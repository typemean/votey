import QuestionCreator from '@/components/QuestionCreator';
import { trpc } from '@/utils/trpc';
import Link from 'next/link';

export default function Home() {
  const { data, isLoading } = trpc.useQuery(['questions.get-all-my-question']);

  if (isLoading || !data) {
    return <div>Loading....</div>;
  }

  return (
    <div className="flex min-h-screen flex-col p-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col">
        <header className="mb-8 flex items-center justify-between">
          <p className="text-2xl font-bold">My Poll</p>
          <Link href="/create">
            <a className="rounded-md bg-gray-300 p-2 font-bold text-gray-900">
              Create New Poll
            </a>
          </Link>
        </header>

        <ul className="flex flex-col space-y-4">
          {data.map((question) => (
            <li key={question.id} className="transition hover:text-violet-400">
              <Link href={`/question/${question.id}`}>
                <a>
                  <div className="my-2 text-lg font-bold">
                    {question.question}
                  </div>
                  <span className="text-sm">
                    Created on {question.createdAt.toDateString()}
                  </span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
