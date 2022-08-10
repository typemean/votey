import { trpc } from '@/utils/trpc';
import React, { useRef } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
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

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col space-y-4 py-4 px-2">
      <h1 className="text-lg font-bold">Create Question</h1>
      <p>Type your Question</p>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-2">
          <input
            type="text"
            {...register('question')}
            className="w-full p-2 text-gray-800"
            placeholder="How do magnets work?"
          />
          {errors.question && (
            <p className="mt-2 text-red-400">{errors.question.message}</p>
          )}
        </div>

        <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
          {fields.map((field, index) => (
            <section key={field.id} className="">
              <input
                {...register(`options.${index}.text`, {
                  required: true,
                })}
                type="text"
                className=" w-full p-2 text-gray-800"
                placeholder="Type your option"
              />
              <button onClick={() => remove(index)}>Delete</button>
            </section>
          ))}
        </div>

        <button
          type="button"
          onClick={() => append({ text: '' })}
          className="col-span-2 cursor-pointer bg-slate-300 py-2 text-slate-900"
        >
          Add Option
        </button>

        <button
          type="submit"
          className="col-span-2 cursor-pointer bg-slate-300 py-2 text-slate-900"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default QuestionCreator;
