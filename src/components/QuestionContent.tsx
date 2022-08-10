import { trpc } from '@/utils/trpc';

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
    <div className="flex flex-col space-y-4  p-8">
      {data.isOwner && (
        <span className="rounded-md bg-red-700 p-3 text-white">
          You made this!
        </span>
      )}
      <p className="text-2xl font-bold">{data.question.question}</p>
      <ul>
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
                  <p className="font-bold">{option.text}</p>
                  {validIdx !== -1 && (
                    <p>
                      {getPercent(data?.votes?.[validIdx!]?._count)?.toFixed()}%
                    </p>
                  )}
                  {validIdx === -1 && <p>0%</p>}
                </div>
                <progress
                  className="progress progress-secondary w-full"
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
            <li
              key={option.text}
              onClick={() => handleVote(idx)}
              className="cursor-pointer"
            >
              {option.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default QuestionContent;
