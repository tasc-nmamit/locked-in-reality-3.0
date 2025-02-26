import { api } from "~/trpc/server";

export default async function Page({
  params,
}: {
  params: Promise<{ puzzle: string }>;
}) {
  const puzzle = (await params).puzzle;

  const scanQRCode = await api.round2.scanQRCode(puzzle ?? "");
  console.log(scanQRCode);

  return (
    <div>
      <h1>Puzzle</h1>
    </div>
  );
}
