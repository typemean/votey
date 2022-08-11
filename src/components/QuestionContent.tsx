import { trpc } from '@/utils/trpc';
import Head from 'next/head';
import Link from 'next/link';

function QuestionContent({ id }: { id: string }) {
  let totalVotes = 0;

  const { data, isLoading, error } = trpc.useQuery([
    'questions.get-by-id',
    { id },
  ]);

  const { mutate, data: voteResponse } = trpc.useMutation(
    ['questions.vote-on-question'],
    {
      onSuccess: () => {
        voteResponse?.map((choice: { _count: number }) => {
          totalVotes += choice._count;
        });
        window.location.reload();
      },
    }
  );

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

  const handleVote = (idx: number) => {
    console.log('투표: ', id, idx);
    mutate({
      questionId: id,
      option: idx,
    });
  };

  const getTotalVotes = (votes: any) => {
    votes?.map((choice: { _count: number }) => {
      totalVotes += choice._count;
    });
  };

  const getPercent = (voteCount: any) => {
    if (voteCount !== undefined && totalVotes > 0)
      return (voteCount / totalVotes) * 100;
    else if (voteCount == undefined) return 0;
  };

  if (data && data != undefined) getTotalVotes(data.votes);

  const options = data.question.options as { text: string }[];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col p-6">
      <Head>
        <title>Question | OnAVote</title>
      </Head>

      <header className="mb-10 flex w-full items-center justify-between">
        <Link href={'/'}>
          <h1 className="cursor-pointer text-4xl font-bold">OnAVote</h1>
        </Link>
        {data?.isOwner && (
          <div className="rounded-md bg-gray-700 p-3 text-violet-300">
            You made this!
          </div>
        )}
      </header>

      <p className="label-text mb-10 text-center text-2xl font-bold">
        {data.question.question}
      </p>

      <ul className="flex flex-col gap-4">
        {options.map((option, idx) => {
          //? 투표한 사람에게 보여짐
          if (data.isOwner || data.vote) {
            //? 득표가 0인 항목의 데이터를 필터링하기 위해서
            const validIdx = data.votes?.findIndex(
              (vote) => vote.choice === idx
            );

            return (
              <li key={option.text}>
                <div className="flex justify-between">
                  <p className="label label-text font-bold">{option.text}</p>
                  {validIdx !== -1 && (
                    <p>
                      {getPercent(data?.votes?.[validIdx!]?._count)?.toFixed()}%
                    </p>
                  )}
                  {validIdx === -1 && <p>0%</p>}
                </div>
                <progress
                  className="progress progress-primary w-full"
                  value={
                    validIdx !== -1 ? data?.votes?.[validIdx!]?._count ?? 0 : 0
                  }
                  max={totalVotes}
                ></progress>
              </li>
            );
          }

          //? 투표 안한 사람에 보여짐
          return (
            <button
              key={option.text}
              onClick={() => handleVote(idx)}
              className="btn btn-outline text-lg"
            >
              {option.text}
            </button>
          );
        })}
      </ul>
    </div>
  );
}

export default QuestionContent;
