import { GetServerSideProps } from 'next';
import { prisma } from '../db/client';
import { trpc } from './utils/trpc';

export default function Home({ questions }: any) {
  const { data, isLoading } = trpc.useQuery(['getAllQuestions']);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  console.log('data: ', data);

  return (
    <div>
      <code>{questions}</code>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const questions = await prisma.pollQuestion.findMany({});
  return {
    props: {
      questions: JSON.stringify(questions),
    },
  };
};
