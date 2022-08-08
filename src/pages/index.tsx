import QuestionCreator from '@/components/QuestionCreator';
import { trpc } from '@/utils/trpc';
import Link from 'next/link';

export default function Home() {
  const { data, isLoading } = trpc.useQuery(['questions.get-all']);

  if (isLoading || !data) {
    return <div>Loading....</div>;
  }

  return (
    <div className="flex flex-col p-6 bg-slate-200 min-h-screen">
      <div className="flex flex-col">
        <p className="text-2xl font-bold">Questions</p>
        {data.map((question) => (
          <Link href={`/question/${question.id}`} key={question.id}>
            <a>
              <div className="my-2">{question.question}</div>
            </a>
          </Link>
        ))}
        <QuestionCreator />
      </div>
    </div>
  );
}
