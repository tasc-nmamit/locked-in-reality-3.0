export interface Round1 {
  question: string;
  code: string;
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
}

export const Round1Details: Round1[] = [
  {
    question: "What does the code do?",
    code: "print('Hello World!')",
    hint: "Prints a message to the console",
    level: 1,
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
  },
  {
    question:
      "What is the output of the following code?\n\nconsole.log(2 + '2');",
    code: "console.log(2 + '2');",
    hint: "JavaScript type coercion",
    level: 2,
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
  },
  {
    question: "What is the next number in the sequence: 2, 3, 5, 7, 11, ?",
    code: "",
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
  },
  {
    question: "Decrypt the following cipher: Uifsf jt b tfdsfu nfttbhf",
    code: "",
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
  },
  {
    question:
      "If a train travels 60 miles in 1 hour, how far will it travel in 3 hours?",
    code: "",
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
  },
  {
    question:
      "You have a 3-gallon jug and a 5-gallon jug. How do you measure out exactly 4 gallons?",
    code: "",
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
  },
  {
    question: "What is the time complexity of binary search?",
    code: "",
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
  },
  {
    question: "Solve the puzzle: What has keys but can't open locks?",
    code: "",
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
  },
  {
    question: "What is the result of the following expression?\n\n5 + 3 * 2",
    code: "",
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
  },
  {
    question: "What is the missing number in the series: 1, 4, 9, 16, ?",
    code: "",
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
  },
  {
    question:
      "What is the output of the following code?\n\nlet x = 10;\nconsole.log(x++);",
    code: "let x = 10;\nconsole.log(x++);",
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
  },
  {
    question:
      "What is the next number in the Fibonacci sequence: 0, 1, 1, 2, 3, 5, ?",
    code: "",
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
  },
  {
    question:
      "What is the output of the following code?\n\nconsole.log(typeof null);",
    code: "console.log(typeof null);",
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
  },
  {
    question:
      "What is the value of x after the following code executes?\n\nlet x = 5;\nx += 3;",
    code: "let x = 5;\nx += 3;",
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
  },
  //   {
  //     question: "What is the output of the following code?\n\nconsole.log(0.1 + 0.2 === 0.3);",
  //     code: "console.log(0.1 + 0.2 === 0.3);",
  //     hint: "Floating-point precision",
  //     level: 6,
  //     roundId: 1,
  //     options: [
  //       {
  //         option: "false",
  //         isCorrect: true,
  //         code: null,
  //         questionId: 15,
  //       },
  //       {
  //         option: "true",
  //         isCorrect: false,
  //         code: null,
  //         questionId: 15,
  //       },
  //       {
  //         option: "undefined",
  //         isCorrect: false,
  //         code: null,
  //         questionId: 15,
  //       },
  //     ],
  //   },
  //   {
  //     question: "What is the output of the following code?\n\nconsole.log('5' - 3);",
  //     code: "console.log('5' - 3);",
  //     hint: "JavaScript type coercion",
  //     level: 7,
  //     roundId: 1,
  //     options: [
  //       {
  //         option: "2",
  //         isCorrect: true,
  //         code: null,
  //         questionId: 16,
  //       },
  //       {
  //         option: "8",
  //         isCorrect: false,
  //         code: null,
  //         questionId: 16,
  //       },
  //       {
  //         option: "NaN",
  //         isCorrect: false,
  //         code: null,
  //         questionId: 16,
  //       },
  //     ],
  //   },
  //   {
  //     question: "What is the output of the following code?\n\nconsole.log('5' + 3);",
  //     code: "console.log('5' + 3);",
  //     hint: "JavaScript type coercion",
  //     level: 8,
  //     roundId: 1,
  //     options: [
  //       {
  //         option: "53",
  //         isCorrect: true,
  //         code: null,
  //         questionId: 17,
  //       },
  //       {
  //         option: "8",
  //         isCorrect: false,
  //         code: null,
  //         questionId: 17,
  //       },
  //       {
  //         option: "NaN",
  //         isCorrect: false,
  //         code: null,
  //         questionId: 17,
  //       },
  //     ],
  //   },
];
