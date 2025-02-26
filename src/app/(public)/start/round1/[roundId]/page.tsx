import Link from "next/link";
import React from "react";
import QuizComponent from "~/app/_components/quiz/quizComponent";
// import { env } from "~/env";
import { api, HydrateClient } from "~/trpc/server";

// export async function generateStaticParams() {
//   const req = await fetch(`${env.BASE_URL}/api/ssr/round1`, { method: "GET" });
//   const rawData = (await req.json()) as { data: { id: string }[] };
//   const data: { id: string }[] = rawData.data;

//   return data.map((question: { id: string }) => ({
//     roundId: question.id,
//   }));
// }

export default async function RoundQuiz({
  params,
}: {
  params: Promise<{ roundId: string }>;
}) {
  const roundId = (await params).roundId;
  const question = await api.round1.getQuestionById(roundId);
  const checkSubmission = await api.submission.checkSubmission(
    question?.id ?? "",
  );

  if (question === null) {
    return (
      <main className="flex h-[calc(100vh)] w-full items-center justify-center">
        <div>
          <div className="bg-gradient-to-b from-red-900 via-red-500 to-red-800 bg-clip-text">
            <h1 className="w-full text-center text-5xl font-bold text-transparent md:text-7xl lg:text-9xl">
              Oops!
            </h1>
          </div>
          <p className="mt-4 text-center text-xs text-white/80 md:text-xl">
            We were not able to fetch your Question. Go{" "}
            <Link href={`/start/round1`} className="text-blue-600 underline">
              Back
            </Link>
          </p>
        </div>
      </main>
    );
  }

  if (checkSubmission?.status === "SUBMITTED") {
    return (
      <main className="flex h-[calc(100vh)] w-full items-center justify-center">
        <div>
          <div className="bg-gradient-to-b from-red-900 via-red-500 to-red-800 bg-clip-text">
            <h1 className="w-full text-center text-5xl font-bold text-transparent md:text-7xl lg:text-9xl">
              Oops!
            </h1>
          </div>
          <p className="mt-4 text-center text-xs text-white/80 md:text-xl">
            You have already submitted your answer for this question. Go{" "}
            <Link href={`/start/round1`} className="text-blue-600 underline">
              Back
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <HydrateClient>
      <main className="min-h-screen w-screen">
        <QuizComponent question={question} submission={checkSubmission} />
      </main>
    </HydrateClient>
  );
}
