import { GetServerSideProps } from 'next';
import { prisma } from '../db/client';

export default function Home({ data }: any) {
  return (
    <div>
      <code>{data}</code>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const questions = await prisma.pollQuestion.findMany({});
  return {
    props: {
      data: JSON.stringify(questions),
    },
  };
};
