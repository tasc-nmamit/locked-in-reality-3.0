"use client";
import type { inferRouterOutputs } from "@trpc/server";
import type { round1Router } from "~/server/api/routers";
import React from "react";
import { CodeRenderBlock } from "../codeBlock/CodeRenderer";

export default function QuizComponent({
  question,
}: {
  question: inferRouterOutputs<typeof round1Router>["getQuestionById"];
}) {
  if (question === null) return;

  return (
    <section className="flex min-h-screen w-screen items-center justify-center">
      <div className="mt-16 flex flex-col items-center justify-center gap-4">
        <div className="rounded-lg bg-purple-500/40 p-8 text-2xl text-white backdrop-blur">
          <h1>{question.question}</h1>
          {question.code && (
            <CodeRenderBlock
              code={question.code.code}
              language={question.code.language}
              className="mt-4"
            />
          )}
        </div>
        <div className="rounded-lg bg-purple-500/40 p-6 text-2xl text-white backdrop-blur">
          {(
            question.options as {
              code: string | null;
              id: string;
              option: string;
            }[]
          ).map((option, index) => {
            return <div key={index}>{option.option}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
