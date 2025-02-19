import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCoordinates(level: number, multiple = false) {
  if (!multiple) {
    return [
      {
        x: 0,
        y: level * 100,
      },
    ];
  } else {
    return [
      { x: -100, y: level * 100 },
      { x: 100, y: level * 100 },
    ];
  }
}
