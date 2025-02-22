"use client";
import { useEffect, useState } from "react";
import { ReactFlow } from "@xyflow/react";
import { api } from "~/trpc/react";
import { type Question } from "@prisma/client";
import { createEdges, getCoordinates } from "~/lib/utils";
import "@xyflow/react/dist/style.css";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

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
  const [level, setLevel] = useState(1);
  const questionsQuery = api.round1.getQuestionsByCurrentLevel.useQuery(level);

  useEffect(() => {
    if (typeof window !== undefined) {
      const currentLevel = window.localStorage.getItem("Round1Level");
      if (currentLevel) {
        setLevel(parseInt(currentLevel));
      }
      void questionsQuery.refetch();
    }
  }, []);

  useEffect(() => {
    if (questionsQuery.data) {
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
              // label: `Level ${i.toString()}`,
              // label: <Button>Hello world</Button>,
              label: (
                <NodeContents
                  status={"unanswered"}
                  id={currLevelNodes[j]?.id ?? i.toString()}
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
  }, [questionsQuery.data]);

  return (
    <main className="h-screen w-screen">
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </main>
  );
}

function NodeContents({
  status,
  id,
}: {
  status: "correct" | "incorrect" | "unanswered";
  id: string;
}) {
  const router = useRouter();

  switch (status) {
    case "correct":
      return <Button disabled>Correct</Button>;
    case "incorrect":
      return <Button>Incorrect</Button>;
    case "unanswered":
      return (
        <Button
          onClick={() => {
            router.push(`/start/round1/${id}`);
          }}
          className="bg-yellow-700 hover:bg-yellow-600"
        >
          Unanswered
        </Button>
      );
  }
}
