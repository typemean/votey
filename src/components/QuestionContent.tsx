import { trpc } from '@/utils/trpc';
import React from 'react';

function QuestionContent({ id }: { id: string }) {
  const { data, isLoading, error } = trpc.useQuery([
    'questions.get-by-id',
    { id },
  ]);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isLoading || !data) {
    return (
      <div>
        <p>Loading....</p>
      </div>
    );
  }

  const options = data.options as string[];

  return (
    <div className="flex flex-col p-2">
      <h1 className="text-lg font-bold">{data.question}</h1>
      <ul>
        {options.map((option) => (
          <li key={option}>{option}</li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionContent;
