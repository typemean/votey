import { trpc } from '@/utils/trpc';
import React, { useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createQuestionSchema,
  CreateQustionInput,
} from '@/server/schemas/question.schema.';
import { useRouter } from 'next/router';

/**
 * 질문 생성 컴포넌트
 */
function QuestionCreator() {
  const router = useRouter();

  const { mutate, isLoading } = trpc.useMutation('questions.create', {
    onSuccess: (data) => {
      router.push(`/question/${data.id}`);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateQustionInput>({
    resolver: zodResolver(createQuestionSchema),
  });

  const onSubmit: SubmitHandler<CreateQustionInput> = ({ question }) => {
    mutate({
      question,
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col space-y-4 py-4 px-2">
      <h1 className="text-lg font-bold">Question Create Page</h1>
      <p>Type your Question</p>

      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('question')}
          className="p-2 text-gray-800"
        />
        {errors.question && (
          <p className="text-red-400">{errors.question.message}</p>
        )}
        <button
          type="submit"
          className="cursor-pointer bg-slate-300 py-2 text-slate-900"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default QuestionCreator;
