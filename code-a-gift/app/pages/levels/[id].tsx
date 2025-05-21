"use client"
import RiddleLevel from "@/app/components/RiddleLevel";
import TerminalLayout from "@/app/components/TerminalLayout";
import { GetServerSideProps } from "next";

type Props = {
  level: number;
};

export default function LevelPage({ level }: Props) {
  return (
    <TerminalLayout>
      <h1 className="text-xl mb-2">Level {level}</h1>
      <RiddleLevel level={level} />
    </TerminalLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const level = parseInt(params?.id as string, 10);
  return {
    props: { level },
  };
};
