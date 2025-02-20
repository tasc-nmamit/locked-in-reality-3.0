import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Edge } from "~/app/(public)/start/round1/page";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCoordinates(level: number, count: number) {
  const coordinates = [];
  const spacing = 200;

  for (let i = 0; i < count; i++) {
    const x = (i - (count - 1) / 2) * spacing;
    const y = (level * 150);
    coordinates.push({ x, y });
  }

  return coordinates;
}

export function createEdges(
  sourceNode: string,
  targetNodes: string[],
  animatedNodes: string[],
) {
  const edges = targetNodes.map((targetNode, index) => {
    const animated = animatedNodes.includes(targetNode);
    return {
      id: `e${sourceNode}-${targetNode}`,
      source: sourceNode,
      target: targetNode,
      animated: animated,
    } as Edge;
  });

  return edges;
}
