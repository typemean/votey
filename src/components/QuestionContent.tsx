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

  return <div>{data.question}</div>;
}

export default QuestionContent;
