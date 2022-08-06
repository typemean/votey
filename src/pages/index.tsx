import { GetServerSideProps } from 'next';
import { prisma } from '../db/client';
import { trpc } from './utils/trpc';

export default function Home({ questions }: any) {
  const { data, isLoading } = trpc.useQuery(['questions.get-all']);

  if (isLoading || !data) {
    return <div>Loading....</div>;
  }

  return <div>{data[0]?.question}</div>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const questions = await prisma.pollQuestion.findMany({});
  return {
    props: {
      questions: JSON.stringify(questions),
    },
  };
};
