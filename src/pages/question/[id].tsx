import QuestionContent from '@/components/QuestionContent';
import { useRouter } from 'next/router';
import React from 'react';

function QuestionDetailPage() {
  const { query } = useRouter();
  const { id } = query;

  console.log('id: ', id);

  if (!id || typeof id !== 'string') {
    return (
      <div>
        <p>No ID...wwwwwwwwww</p>
      </div>
    );
  }

  return <QuestionContent id={id} />;
}

export default QuestionDetailPage;
