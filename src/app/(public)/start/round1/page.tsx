"use client";
import { useEffect, useState } from "react";
import { ReactFlow } from "@xyflow/react";
import { api } from "~/trpc/react";
import type { Status, Question } from "@prisma/client";
import { createEdges, getCoordinates } from "~/lib/utils";
import "@xyflow/react/dist/style.css";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

export interface Node {
  id: string;
  data: { label: string | React.ReactNode; id: string };
  type: string;
  level: number;
  position: { x: number; y: number };
  style: { backgroundColor: string };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}

export default function Round1() {
  const [nodes, setNodes] = useState<Array<Node>>([]);
  const [edges, setEdges] = useState<Array<Edge>>([]);
  const session = useSession();
  const questionsQuery = api.round1.getQuestionsByCurrentLevel.useQuery(
    session.data?.user.round1 ?? 1,
  );
  const submissionsQuery = api.submission.getSubmissions.useQuery();

  useEffect(() => {
    // set level
    const level = session.data?.user.round1 ?? 1;

    if (questionsQuery.data && submissionsQuery.data) {
      const nodesWithoutCoordinates = questionsQuery.data
        .map((question: Question) => {
          return {
            id: question.id,
            level: question.level,
          };
        })
        .sort(
          (
            a: { id: string; level: number },
            b: { id: string; level: number },
          ) => a.level - b.level,
        );

      const filteredNodes: Array<Node> = [];

      for (let i = 1; i <= level; i++) {
        const currLevelNodes = nodesWithoutCoordinates.filter(
          (node: { id: string; level: number }) => node.level === i,
        );
        const coordinates = getCoordinates(i, currLevelNodes.length);

        for (let j = 0; j < currLevelNodes.length; j++) {
          filteredNodes.push({
            id: currLevelNodes[j]?.id ?? i.toString(),
            data: {
              label: (
                <NodeContents
                  id={currLevelNodes[j]?.id ?? i.toString()}
                  level={i}
                />
              ),
              id: currLevelNodes[j]?.id ?? i.toString(),
            },
            type: i === 1 ? "input" : i === level ? "output" : "default",
            level: i,
            position: coordinates[j] ?? { x: 0, y: 0 },
            style: { backgroundColor: "#1e3a8a" },
          });
        }
      }

      const newEdges: Array<Edge> = [];
      for (let i = 1; i < level; i++) {
        const sourceNodes = filteredNodes.filter((node) => node.level === i);

        sourceNodes.map((sourceNode) => {
          const targetNodes = filteredNodes.filter(
            (node) => node.level === i + 1,
          );
          if (targetNodes.length > 0) {
            const currEdges = createEdges(
              sourceNode?.id ?? i.toString(),
              targetNodes.map((node) => node.id),
              [],
            );
            newEdges.push(...currEdges);
          }
        });
      }
      setNodes(filteredNodes);
      setEdges(newEdges);
    }
  }, [questionsQuery.data, submissionsQuery.data, session.data?.user.round1]);

  return (
    <main className="h-screen w-screen">
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </main>
  );
}

function NodeContents({ id, level }: { id: string; level: number }) {
  const router = useRouter();
  const session = useSession();
  const submission = api.submission.checkSubmission.useQuery(id, {
    staleTime: 1000 * 3,
  });

  switch (submission.data?.status) {
    case "SKIPPED":
      return (
        <div>
          <Image
            alt="red door"
            src="/red-door.png"
            width={100}
            height={100}
            className="mx-auto w-20 opacity-70"
          />
          <p className="text-lg font-semibold text-white">{level}</p>
        </div>
      );
    case "SUBMITTED":
      return (
        <div>
          <Image
            alt="closed door"
            src="/closed.png"
            width={100}
            height={100}
            className="mx-auto w-20 opacity-70"
          />
          <p className="text-lg font-semibold text-white">{level}</p>
        </div>
      );
    case "PENDING":
      return (
        <button
          onClick={() => {
            router.push(`/start/round1/${id}`);
          }}
        >
          <Image
            alt="open door"
            src="/open.png"
            width={100}
            height={100}
            className="w-24"
          />
          <p className="text-lg font-semibold text-white">{level}</p>
        </button>
      );
    default:
      if (session.data?.user.round1 === level) {
        return (
          <button
            onClick={() => {
              router.push(`/start/round1/${id}`);
            }}
          >
            <Image
              alt="closed door"
              src="/closed.png"
              width={100}
              height={100}
              className="w-20"
            />
            <p className="text-lg font-semibold text-white">{level}</p>
          </button>
        );
      } else {
        return (
          <div>
            <Image
              alt="red door"
              src="/red-door.png"
              width={100}
              height={100}
              className="mx-auto w-20 opacity-70"
            />
            <p className="text-lg font-semibold text-white">{level}</p>
          </div>
        );
      }
  }
}
