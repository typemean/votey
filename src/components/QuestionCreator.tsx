import { trpc } from '@/utils/trpc';
import React, { useRef } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createQuestionSchema,
  CreateQustionInput,
} from '@/server/schemas/question.schema.';
import { useRouter } from 'next/router';
import FormError from './FormError';
import Head from 'next/head';

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
    control,
    watch,
    formState: { errors },
  } = useForm<CreateQustionInput>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      options: [{ text: '' }, { text: '' }],
    },
  });

  //? Dynamic Form을 만드는데 사용되는 Hook (예. 추가할 수 있는 옵션등)
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: 'options', // unique name for your Field Array
    }
  );

  const onSubmit: SubmitHandler<CreateQustionInput> = ({
    question,
    options,
  }) => {
    mutate({
      question,
      options,
    });
  };

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center antialiased">
        <p className="text-white/40">Loading...</p>
      </div>
    );

  return (
    <>
      <Head>
        <title>Create | OnAVote</title>
      </Head>
      <div className="mx-auto flex h-screen w-full max-w-3xl flex-col space-y-4 py-12 px-6">
        <h2 className="text-2xl font-bold">Create a New Poll</h2>
        <label className="label">
          <span className="label-text text-base font-semibold">
            Your Question
          </span>
        </label>

        <form className="form-control gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-span-2">
            <input
              type="text"
              {...register('question', { required: true })}
              className="input input-bordered block w-full rounded-md text-gray-300 focus:invalid:input-error"
              placeholder="How do magnets work?"
              minLength={5}
              required
            />
            {errors.question && <FormError error={errors.question} />}
          </div>

          <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
            {fields.map((field, index) => (
              <section key={field.id} className="relative">
                <input
                  {...register(`options.${index}.text`, {
                    required: true,
                  })}
                  type="text"
                  className="input input-bordered w-full font-medium text-gray-300"
                  placeholder="Type your option"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => remove(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </section>
            ))}
          </div>
          {errors.options && <FormError error={errors.options} />}

          <button
            type="button"
            onClick={() => append({ text: '' })}
            className="btn btn-ghost col-span-2"
          >
            Add Option
          </button>

          <button type="submit" className="btn col-span-2">
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default QuestionCreator;
