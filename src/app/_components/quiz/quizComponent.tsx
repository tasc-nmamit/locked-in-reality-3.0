"use client";
import type { inferRouterOutputs } from "@trpc/server";
import type { round1Router } from "~/server/api/routers";
import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import {
  CreateSubmissionZ,
  Round1HintZ,
  UpdateSubmissionZ,
} from "~/zod/schema";
import { useRouter } from "next/navigation";

import { CodeRenderBlock } from "../codeBlock/CodeRenderer";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function QuizComponent({
  question,
}: {
  question: inferRouterOutputs<typeof round1Router>["getQuestionById"];
}) {
  const [hintDialog, setHintDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selecetedOption, setSelectedOption] = useState<string | null>(null);
  const { refetch } = api.submission.getSubmissions.useQuery();
  const { update } = useSession();

  const router = useRouter();
  const hintQuery = api.hint.getRound1Hint.useQuery({
    questionId: question?.id ?? "",
  });
  const createSubmissionMutation = api.submission.createSubmission.useMutation({
    onSuccess: async() => {
      console.log("Submission created");
      await refetch()
    },
    onError(error) {
      console.log(error.message);
    },
  });
  const hintMutation = api.hint.useRound1Hint.useMutation({
    onSuccess: async(data) => {
      await hintQuery.refetch();
      toast.dismiss("hint")
      toast.success(data.message);
    },
    onError(error) {
      toast.error(error.message);
    },
    onMutate() {
      toast.loading("Loading Hint...",{
        id: "hint"
      })
      setHintDialog(false);
    },
  });
  const updateSubmissionMutation = api.submission.updateSubmission.useMutation({
    onSuccess: async() => {
      toast.success("Answer submitted successfully");
      await update({
        round1: (question?.level ?? 1 + 1).toString(),
      });
      await refetch();
      router.push("/start/round1");
    },
    onError(error) {
      if (error.data?.code === "BAD_REQUEST") {
        toast.error(error.message);
      } else {
        toast.error("Failed to submit answer");
      }
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (question === null) return;

    // create submission if not present
    createSubmissionMutation.mutate(
      CreateSubmissionZ.parse({ questionId: question.id }),
    );
  }, []);

  if (question === null) return;

  return (
    <section className="flex min-h-screen w-screen items-center justify-center">
      <div className="mt-16 flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col gap-4 rounded-lg bg-purple-500/40 p-8 text-2xl text-white backdrop-blur">
          <h1>{question.question}</h1>
          {question.code && (
            <CodeRenderBlock
              code={question.code.code}
              language={question.code.language}
            />
          )}
          {hintQuery.status === "success" && hintQuery.data.used && (
            <div className="text-lg opacity-80">
              <span className="font-bold">Hint: </span>
              {hintQuery.data.hint?.hint}
            </div>
          )}
          <div className="flex w-full justify-between">
            <Dialog open={hintDialog} onOpenChange={setHintDialog}>
              <DialogTrigger asChild disabled={hintQuery.data?.used}>
                <Button variant={"secondary"}>Hint</Button>
              </DialogTrigger>
              <DialogContent className="border-none bg-purple-700">
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription className="text-white">
                    You will be granted a hint at the cost of your score. Do you
                    want to proceed?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      hintMutation.mutate(
                        Round1HintZ.parse({ questionId: question.id }),
                      );
                    }}
                  >
                    Yes
                  </Button>
                  <DialogClose asChild>
                    <Button variant={"destructive"}>No</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              onClick={() => {
                if (selecetedOption === null) {
                  toast.warning("You didnt select an option to submit");
                  return;
                }

                setSubmitting(true);
                updateSubmissionMutation.mutate(
                  UpdateSubmissionZ.parse({
                    questionId: question.id,
                    // TODO: send correct option id
                    selectedOptionId: selecetedOption,
                  }),
                );
              }}
              disabled={submitting}
              className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 hover:from-purple-700 hover:to-purple-800"
            >
              Submit
            </Button>
          </div>
        </div>
        <div className="w-full rounded-lg bg-purple-500/40 p-6 text-2xl text-white backdrop-blur">
          {/* TODO: implement selecting correct option */}
          <RadioGroup
            onValueChange={(id) => {
              // Hint: here id refrers to the value of the radio item
              setSelectedOption(id);
            }}
          >
            {(
              question.options as {
                code: string | null;
                id: string;
                option: string;
              }[]
            ).map((option) => {
              return (
                <div key={option.id} className="flex items-center space-x-4">
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    className="border-white text-white"
                  />
                  <Label htmlFor={option.id} className="text-lg">
                    {option.code ? (
                      <CodeRenderBlock
                        code={option.option}
                        language={option.code}
                        className="my-2"
                      />
                    ) : (
                      option.option
                    )}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      </div>
    </section>
  );
}
