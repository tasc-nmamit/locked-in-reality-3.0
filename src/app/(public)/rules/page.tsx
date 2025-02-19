import React from "react";

export default function Rules() {
  return (
    <main className="px-4 pb-16 pt-32 text-white md:pb-20 md:pt-48">
      <div className="mt-10 flex w-full flex-col items-center gap-10">
        <div className="h-fit bg-gradient-to-b from-purple-800 via-purple-300 to-purple-900 bg-clip-text">
          <header className="text-center font-rosca text-6xl font-bold text-transparent md:text-8xl">
            Locked In <br /> Reality 3.0
          </header>
        </div>
        <div className="w-full max-w-4xl">
          <header className="text-3xl font-semibold md:text-5xl">About</header>
          <p className="mt-4 text-left">
            Locked in Reality is a high-tech adventure where your wits are your
            only key. As you navigate through a maze of puzzles and clues, every
            step brings you closer to unlocking secrets hidden in plain sight.
            With every challenge, the line between the digital and the physical
            begins to blur, pushing you to think faster, act smarter, and
            uncover the treasure that awaits.
          </p>
        </div>
        <div className="grid w-full max-w-4xl grid-cols-1 lg:grid-cols-2">
          <div>
            <header className="text-xl font-medium md:text-3xl">
              Round 1 <span className="text-purple-500">Logged In</span>
            </header>
            <ul className="mt-2 list-disc pl-8">
              <li>
                It consists of a quiz based on aptitude questions, technical
                problems, and brainteasers.
              </li>
              <li>
                The questions are divided into levels of increasing difficulty,
                with higher-difficulty questions offering greater rewards.
              </li>
              <li>
                Teams can attempt as many questions within the given time limit
                to maximise their score.
              </li>
              <li>
                Bonus points will be awarded to teams for the fastest
                submissions of correct answers.
              </li>
              <li>
                Participants can choose to take hints for challenging questions,
                but points will be deducted for each hint used.
              </li>
              <li> Top 5 teams advance to the next round.</li>
            </ul>
          </div>
          <div>
            <header className="text-xl font-medium md:text-3xl">
              Round 2
              <span className="text-purple-500"> Hunt begins in Reality</span>
            </header>
            <ul className="mt-2 list-disc pl-8">
              <li>
                It consists of a quiz based on aptitude questions, technical
                problems, and brainteasers.
              </li>
              <li>
                The questions are divided into levels of increasing difficulty,
                with higher-difficulty questions offering greater rewards.
              </li>
              <li>
                Teams can attempt as many questions within the given time limit
                to maximise their score.
              </li>
              <li>
                Bonus points will be awarded to teams for the fastest
                submissions of correct answers.
              </li>
              <li>
                Participants can choose to take hints for challenging questions,
                but points will be deducted for each hint used.
              </li>
              <li> Top 5 teams advance to the next round.</li>
            </ul>
          </div>
        </div>
        <div className="w-full max-w-4xl">
          <header className="text-3xl font-medium md:text-5xl">Rules</header>
          <ol className="mt-4 list-decimal pl-8">
            <li>A team must consist of 3 members.</li>
            <li>All the team members must be from the same college.</li>
            <li>
              Participants must present a physical college ID card and PID to
              participate in the event.
            </li>
            <li>
              The decisions of the judges and the organisers are final and
              binding.
            </li>
          </ol>
        </div>
        <div className="w-full max-w-4xl">
          <header className="text-3xl font-medium md:text-5xl">
            Judging Criteria
          </header>
          <div className="mt-4">
            <p>
              <span className="font-semibold text-purple-500">Round 1</span>{" "}
              Completion of the quiz, the time taken to finish it, and the
              number of correct answers submitted by the team.
            </p>
            <p>
              <span className="font-semibold text-purple-500">Round 2</span>{" "}
              Ability to identify the final destination, the time taken to
              complete the hunt, and the number of hints used during the hunt.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
