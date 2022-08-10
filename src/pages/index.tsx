import QuestionCreator from '@/components/QuestionCreator';
import { trpc } from '@/utils/trpc';
import Link from 'next/link';

export default function Home() {
  const { data, isLoading } = trpc.useQuery(['questions.get-all-my-question']);

  if (isLoading || !data) {
    return <div>Loading....</div>;
  }

  return (
    <div className="flex flex-col p-6 min-h-screen">
      <div className="flex flex-col max-w-4xl mx-auto w-full">
        <header className="flex mb-8 items-center justify-between">
          <p className="text-2xl font-bold">Questions</p>
          <Link href="/create">
            <a className="bg-gray-300 text-gray-900 p-2 rounded-md font-bold">
              Create New Question
            </a>
          </Link>
        </header>

        <ul className="flex flex-col space-y-4">
          {data.map((question) => (
            <li key={question.id}>
              <Link href={`/question/${question.id}`}>
                <a>
                  <div className="my-2 text-lg font-bold">
                    {question.question}
                  </div>
                  <span className="text-sm">
                    Created on {question.createdAt.toLocaleString()}
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
