import { PrismaClient } from "@prisma/client";
import { Round1Details } from "./seedData";
import { hashPassword } from "~/lib/hashing";

const db = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  await db.$transaction(async (tx) => {
    const user = await tx.user.findFirst({
      where: {
        email: "admin@incridea.lir.in",
      },
    });
    if (!user) {
      await tx.user.create({
        data: {
          email: "admin@incridea.lir.in",
          password: await hashPassword("admin@123"),
        },
      });
    }
  });

  await db.$transaction(async (tx) => {
    const appSettings = await tx.appSettings.findFirst();
    if (appSettings?.id) {
      return;
    } else {
      await tx.appSettings.create({
        data: {
          round1: true,
          round2: false,
        },
      });
    }
  });

  const createdRound = await db.rounds.create({
    data: {
      name: `Round 1`,
      id: 1,
      questions: {
        create: Round1Details.map((question) => ({
          question: question.question,
          hint: question.hint,
          level: question.level,
          maxPoints: question.maxPoints,
          tags: question.tags,
          code: question.code
            ? {
                create: {
                  code: question.code.code,
                  language: question.code.language,
                },
              }
            : undefined,
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

await main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .then(async () => {
    await db.$disconnect();
  });
