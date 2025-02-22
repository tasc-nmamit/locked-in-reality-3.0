export interface Round1 {
  question: string;
  code: { code: string; language: string } | null;
  hint: string;
  level: number;
  roundId: number;
  maxPoints: number;
  options: {
    option: string;
    isCorrect: boolean;
    code: boolean | null;
    questionId: number;
  }[];
  tags: string[];
}

export const Round1Details: Round1[] = [
  {
    question: "What does the code do?",
    code: { code: "print('Hello World!')", language: "python" },
    hint: "Prints a message to the console",
    level: 2,
    roundId: 1,
    maxPoints: 10,
    options: [
      {
        option: "Prints a message to the console",
        isCorrect: true,
        code: null,
        questionId: 1,
      },
    ],
    tags: ["Python", "Basics"],
  },
  {
    question:
      "What is the output of the following code?\n\nconsole.log(2 + '2');",
    code: { code: "console.log(2 + '2');", language: "js" },
    hint: "JavaScript type coercion",
    level: 1,
    roundId: 1,
    maxPoints: 5,
    options: [
      {
        option: "22",
        isCorrect: true,
        code: null,
        questionId: 2,
      },
      {
        option: "4",
        isCorrect: false,
        code: null,
        questionId: 2,
      },
      {
        option: "NaN",
        isCorrect: false,
        code: null,
        questionId: 2,
      },
    ],
    tags: ["JavaScript", "Type Coercion"],
  },
  {
    question: "What is the next number in the sequence: 2, 3, 5, 7, 11, ?",
    code: null,
    hint: "Prime numbers",
    level: 3,
    roundId: 1,
    maxPoints: 15,
    options: [
      {
        option: "13",
        isCorrect: true,
        code: null,
        questionId: 3,
      },
      {
        option: "14",
        isCorrect: false,
        code: null,
        questionId: 3,
      },
      {
        option: "15",
        isCorrect: false,
        code: null,
        questionId: 3,
      },
    ],
    tags: ["Math", "Prime Numbers"],
  },
  {
    question: "Decrypt the following cipher: Uifsf jt b tfdsfu nfttbhf",
    code: null,
    hint: "Caesar cipher with a shift of 1",
    level: 3,
    roundId: 1,
    maxPoints: 10,
    options: [
      {
        option: "There is a secret message",
        isCorrect: true,
        code: null,
        questionId: 4,
      },
      {
        option: "This is a secret message",
        isCorrect: false,
        code: null,
        questionId: 4,
      },
      {
        option: "There is no secret message",
        isCorrect: false,
        code: null,
        questionId: 4,
      },
    ],
    tags: ["Cryptography", "Caesar Cipher"],
  },
  {
    question:
      "If a train travels 60 miles in 1 hour, how far will it travel in 3 hours?",
    code: null,
    hint: "Simple multiplication",
    level: 4,
    roundId: 1,
    maxPoints: 5,
    options: [
      {
        option: "180 miles",
        isCorrect: true,
        code: null,
        questionId: 5,
      },
      {
        option: "120 miles",
        isCorrect: false,
        code: null,
        questionId: 5,
      },
      {
        option: "200 miles",
        isCorrect: false,
        code: null,
        questionId: 5,
      },
    ],
    tags: ["Math", "Multiplication"],
  },
  {
    question:
      "You have a 3-gallon jug and a 5-gallon jug. How do you measure out exactly 4 gallons?",
    code: null,
    hint: "Use both jugs to measure",
    level: 5,
    roundId: 1,
    maxPoints: 15,
    options: [
      {
        option:
          "Fill the 5-gallon jug and pour into the 3-gallon jug until it is full. You have 2 gallons left in the 5-gallon jug. Empty the 3-gallon jug and pour the 2 gallons into it. Fill the 5-gallon jug again and pour into the 3-gallon jug until it is full. You now have exactly 4 gallons in the 5-gallon jug.",
        isCorrect: true,
        code: null,
        questionId: 6,
      },
      {
        option: "Fill the 3-gallon jug twice and pour into the 5-gallon jug.",
        isCorrect: false,
        code: null,
        questionId: 6,
      },
      {
        option:
          "Fill the 5-gallon jug and pour into the 3-gallon jug until it is full. You have 2 gallons left in the 5-gallon jug.",
        isCorrect: false,
        code: null,
        questionId: 6,
      },
    ],
    tags: ["Logic", "Puzzle"],
  },
  {
    question: "What is the time complexity of binary search?",
    code: null,
    hint: "Consider the number of comparisons",
    level: 5,
    roundId: 1,
    maxPoints: 10,
    options: [
      {
        option: "O(log n)",
        isCorrect: true,
        code: null,
        questionId: 7,
      },
      {
        option: "O(n)",
        isCorrect: false,
        code: null,
        questionId: 7,
      },
      {
        option: "O(n log n)",
        isCorrect: false,
        code: null,
        questionId: 7,
      },
    ],
    tags: ["Algorithms", "Binary Search"],
  },
  {
    question: "Solve the puzzle: What has keys but can't open locks?",
    code: null,
    hint: "Think about a common object",
    level: 6,
    roundId: 1,
    maxPoints: 5,
    options: [
      {
        option: "A piano",
        isCorrect: true,
        code: null,
        questionId: 8,
      },
      {
        option: "A map",
        isCorrect: false,
        code: null,
        questionId: 8,
      },
      {
        option: "A book",
        isCorrect: false,
        code: null,
        questionId: 8,
      },
    ],
    tags: ["Riddles", "Puzzles"],
  },
  {
    question: "What is the result of the following expression?\n\n5 + 3 * 2",
    code: null,
    hint: "Order of operations",
    level: 7,
    roundId: 1,
    maxPoints: 15,
    options: [
      {
        option: "11",
        isCorrect: true,
        code: null,
        questionId: 9,
      },
      {
        option: "16",
        isCorrect: false,
        code: null,
        questionId: 9,
      },
      {
        option: "13",
        isCorrect: false,
        code: null,
        questionId: 9,
      },
    ],
    tags: ["Math", "Order of Operations"],
  },
  {
    question: "What is the missing number in the series: 1, 4, 9, 16, ?",
    code: null,
    hint: "Perfect squares",
    level: 7,
    roundId: 1,
    maxPoints: 10,
    options: [
      {
        option: "25",
        isCorrect: true,
        code: null,
        questionId: 10,
      },
      {
        option: "20",
        isCorrect: false,
        code: null,
        questionId: 10,
      },
      {
        option: "30",
        isCorrect: false,
        code: null,
        questionId: 10,
      },
    ],
    tags: ["Math", "Perfect Squares"],
  },
  {
    question:
      "What is the output of the following code?\n\nlet x = 10;\nconsole.log(x++);",
    code: { code: "let x = 10;\nconsole.log(x++);", language: "js" },
    hint: "Post-increment operator",
    level: 8,
    roundId: 1,
    maxPoints: 5,
    options: [
      {
        option: "10",
        isCorrect: true,
        code: null,
        questionId: 11,
      },
      {
        option: "11",
        isCorrect: false,
        code: null,
        questionId: 11,
      },
      {
        option: "9",
        isCorrect: false,
        code: null,
        questionId: 11,
      },
    ],
    tags: ["JavaScript", "Post-Increment"],
  },
  {
    question:
      "What is the next number in the Fibonacci sequence: 0, 1, 1, 2, 3, 5, ?",
    code: null,
    hint: "Sum of the previous two numbers",
    level: 9,
    roundId: 1,
    maxPoints: 15,
    options: [
      {
        option: "8",
        isCorrect: true,
        code: null,
        questionId: 12,
      },
      {
        option: "7",
        isCorrect: false,
        code: null,
        questionId: 12,
      },
      {
        option: "6",
        isCorrect: false,
        code: null,
        questionId: 12,
      },
    ],
    tags: ["Math", "Fibonacci Sequence"],
  },
  {
    question:
      "What is the output of the following code?\n\nconsole.log(typeof null);",
    code: { code: "console.log(typeof null);", language: "js" },
    hint: "JavaScript type",
    level: 9,
    roundId: 1,
    maxPoints: 5,
    options: [
      {
        option: "object",
        isCorrect: true,
        code: null,
        questionId: 13,
      },
      {
        option: "null",
        isCorrect: false,
        code: null,
        questionId: 13,
      },
      {
        option: "undefined",
        isCorrect: false,
        code: null,
        questionId: 13,
      },
    ],
    tags: ["JavaScript", "Type"],
  },
  {
    question:
      "What is the value of x after the following code executes?\n\nlet x = 5;\nx += 3;",
    code: { code: "let x = 5;\nx += 3;", language: "js" },
    hint: "Addition assignment operator",
    level: 10,
    roundId: 1,
    maxPoints: 15,
    options: [
      {
        option: "8",
        isCorrect: true,
        code: null,
        questionId: 14,
      },
      {
        option: "5",
        isCorrect: false,
        code: null,
        questionId: 14,
      },
      {
        option: "3",
        isCorrect: false,
        code: null,
        questionId: 14,
      },
    ],
    tags: ["JavaScript", "Operators"],
  },
  {
    question:
      "What is the output of the following code?\n\nconsole.log(0.1 + 0.2 === 0.3);",
    code: { code: "console.log(0.1 + 0.2 === 0.3);", language: "js" },
    hint: "Floating-point precision",
    level: 3,
    roundId: 1,
    maxPoints: 10,
    options: [
      {
        option: "false",
        isCorrect: true,
        code: null,
        questionId: 15,
      },
      {
        option: "true",
        isCorrect: false,
        code: null,
        questionId: 15,
      },
      {
        option: "undefined",
        isCorrect: false,
        code: null,
        questionId: 15,
      },
    ],
    tags: ["JavaScript", "Floating-Point Precision"],
  },
  {
    question:
      "What is the output of the following code?\n\nconsole.log('5' - 3);",
    code: { code: "console.log('5' - 3);", language: "js" },
    hint: "JavaScript type coercion",
    level: 5,
    roundId: 1,
    maxPoints: 5,
    options: [
      {
        option: "2",
        isCorrect: true,
        code: null,
        questionId: 16,
      },
      {
        option: "8",
        isCorrect: false,
        code: null,
        questionId: 16,
      },
      {
        option: "NaN",
        isCorrect: false,
        code: null,
        questionId: 16,
      },
    ],
    tags: ["JavaScript", "Type Coercion"],
  },
  {
    question:
      "What is the output of the following code?\n\nconsole.log('5' + 3);",
    code: { code: "console.log('5' + 3);", language: "js" },
    hint: "JavaScript type coercion",
    level: 5,
    roundId: 1,
    maxPoints: 15,
    options: [
      {
        option: "53",
        isCorrect: true,
        code: null,
        questionId: 17,
      },
      {
        option: "8",
        isCorrect: false,
        code: null,
        questionId: 17,
      },
      {
        option: "nan",
        isCorrect: false,
        code: null,
        questionId: 17,
      },
    ],
    tags: ["JavaScript", "Type Coercion"],
  },
];
