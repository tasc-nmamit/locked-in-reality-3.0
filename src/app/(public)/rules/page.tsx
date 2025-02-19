import React from "react";

export default function Rules() {
  return (
    <main className="text-white md:pt-48 pt-32 px-4 md:pb-20 pb-16">
      <div className="flex w-full flex-col items-center gap-10 mt-10">
        <div className="h-fit bg-gradient-to-b from-purple-800 via-purple-300 to-purple-900 bg-clip-text">
          <header className="text-center font-rosca md:text-8xl text-6xl font-bold text-transparent">
            Locked In <br /> Reality 3.0
          </header>
        </div>
        <div className="max-w-4xl w-full">
          <header className="md:text-5xl text-3xl font-semibold">About</header>
          <p className="text-left mt-4">
            Locked in Reality is a high-tech adventure where your wits are your
            only key. As you navigate through a maze of puzzles and clues, every
            step brings you closer to unlocking secrets hidden in plain sight.
            With every challenge, the line between the digital and the physical
            begins to blur, pushing you to think faster, act smarter, and
            uncover the treasure that awaits.
          </p>
        </div>
        <div className="max-w-4xl w-full grid lg:grid-cols-2 grid-cols-1">
          <div>
            <header className="md:text-3xl text-xl font-medium">Round 1 <span className="text-purple-500">Logged In</span></header>
            <ul className="list-disc pl-8 mt-2">
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
            <header className="md:text-3xl text-xl font-medium">
              Round 2 
              <span className="text-purple-500">{" "}Hunt begins in Reality</span>
            </header>
            <ul className="list-disc pl-8 mt-2">
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
        <div className="max-w-4xl w-full">
          <header className="md:text-5xl text-3xl font-medium">Rules</header>
          <ol className="list-decimal pl-8 mt-4">
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
        <div className="max-w-4xl w-full">
          <header className="md:text-5xl text-3xl font-medium">Judging Criteria</header>
          <div className="mt-4">
            <p>
              <span className="text-purple-500 font-semibold">Round 1</span> Completion of the
              quiz, the time taken to finish it, and the number of correct
              answers submitted by the team.
            </p>
            <p>
              <span className="text-purple-500 font-semibold">Round 2</span> Ability to
              identify the final destination, the time taken to complete the
              hunt, and the number of hints used during the hunt.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
