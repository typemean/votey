import { trpc } from '@/pages/utils/trpc';
import React, { useRef } from 'react';

function QuestionCreator() {
  const inputRef = useRef<HTMLInputElement>(null);
  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation('questions.create', {
    onSuccess: (data) => {
      console.log('성공: ', data);
      client.invalidateQueries(['questions.get-all']);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      mutate({ question: e.target.value });
    }
  };

  return (
    <input
      type="text"
      ref={inputRef}
      disabled={isLoading}
      onKeyDown={handleKeyDown}
      className="disabled:bg-red-300"
    />
  );
}

export default QuestionCreator;
