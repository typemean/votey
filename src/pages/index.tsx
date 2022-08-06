import QuestionCreator from '@/components/QuestionCreator';
import { GetServerSideProps } from 'next';
import { prisma } from '../db/client';
import { trpc } from './utils/trpc';

export default function Home() {
  const { data, isLoading } = trpc.useQuery(['questions.get-all']);

  if (isLoading || !data) {
    return <div>Loading....</div>;
  }

  return (
    <div className="flex flex-col p-6 bg-slate-300 min-h-screen">
      <div className="flex flex-col">
        <p className="text-2xl font-bold">Questions</p>
        {data.map((question) => (
          <div key={question.id} className="my-2">
            {question.question}
          </div>
        ))}
        <QuestionCreator />
      </div>
    </div>
  );
}
