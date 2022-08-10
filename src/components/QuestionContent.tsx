import { trpc } from '@/utils/trpc';

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

  const options = data.question.options as { text: string }[];

  return (
    <div className="flex flex-col p-8">
      {data.isOwner && (
        <span className="rounded-md bg-red-700 p-3 text-white">
          You made this!
        </span>
      )}
      <p className="text-lg font-bold">{data.question.question}</p>
      <ul>
        {options.map((option) => (
          <li key={option.text}>{option.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionContent;
