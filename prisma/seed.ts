import { PrismaClient } from "@prisma/client";
import { Round1Details } from "./seedData";
import { hashPassword } from "~/lib/hashing";

const db = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  await db.user.create({
    data: {
      email: "admin@incridea.lir.in",
      password: await hashPassword("admin@123"),
    },
  });

  const createdRound = await db.rounds.create({
    data: {
      name: `Round 1`,
      id: 1,
      questions: {
        create: Round1Details.map((question) => ({
          question: question.question,
          code: question.code,
          hint: question.hint,
          level: question.level,
          maxPoints: question.maxPoints,
          options: {
            create: question.options.map((option) => ({
              option: option.option,
              isCorrect: option.isCorrect,
              code: option.code as string | null,
            })),
          },
        })),
      },
    },
  });
  console.log(`Created round with id: ${createdRound.id}`);

  console.log("Seeding finished.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
