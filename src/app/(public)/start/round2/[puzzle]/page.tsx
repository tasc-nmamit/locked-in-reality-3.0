import { api } from "~/trpc/server";
import ColorMatcher from "~/app/_components/colorMatcher/colorMatcher";
import EncodedText from "~/app/_components/encoded-text/encoded-text";
import RepoSearch from "~/app/_components/repoSearch/repoSearch";
import SlidingPuzzle from "~/app/_components/slidingPuzzle/slidingPuzzle";

export default async function Page({
  params,
}: {
  params: Promise<{ puzzle: string }>;
}) {
  const puzzle = (await params).puzzle;
  const scanQRCode = await api.round2.scanQRCode(puzzle ?? "");
  console.log(scanQRCode);


  const renderComponent = () => {
    switch (puzzle) {
        case "cm7kott030000tzukbwgadewm":
        case "cm7kott040001tzuky071wxuc":
        case "cm7kott07000dtzukif3chhhd":
        case "cm7kott07000etzuktvsl7q6t":
        case "cm7kott08000gtzuk97n8hxzb":
            return <ColorMatcher puzzle={puzzle} trollUser={scanQRCode.status === "SUCCESS" && (scanQRCode.fake || !scanQRCode.path)} />;
        case "cm7kott040002tzuk7zg24kz5":
        case "cm7kott050005tzuk7u9za0dr":
        case "cm7kott060009tzukz9mt8jvu":
        case "cm7kott08000htzukfivzkcfd":
        case "cm7kott08000itzuk6x2axmwb":
            return <EncodedText puzzle={puzzle} trollUser={scanQRCode.status === "SUCCESS" && (scanQRCode.fake || !scanQRCode.path)} />;
        case "cm7kott040003tzuk4bk1ezp5":
        case "cm7kott060007tzuk6lcim0l6":
        case "cm7kott06000atzuksl01jt8a":
        case "cm7kott07000ctzuk6qn8sq9o":
        case "cm7kott09000jtzuk31m0zcq3":
            return <RepoSearch puzzle={puzzle} trollUser={scanQRCode.status === "SUCCESS" && (scanQRCode.fake || !scanQRCode.path)} />;
        case "cm7kott050004tzukv19qs4ql":
        case "cm7kott050006tzukumgdsf2y":
        case "cm7kott060008tzukk9qec5qm":
        case "cm7kott06000btzukjqthcggc":
        case "cm7kott08000ftzukb9hk023t":
            return <SlidingPuzzle puzzle={puzzle} trollUser={scanQRCode.status === "SUCCESS" && (scanQRCode.fake || !scanQRCode.path)} />;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {scanQRCode.status === "SUCCESS" && !scanQRCode.scanned && renderComponent()}
      {scanQRCode.status === "SUCCESS" && scanQRCode.scanned && (
        <div className="text-white bg-purple-500/30 backdrop-blur-sm p-2 rounded-lg">
        <p>Clue: {scanQRCode.hint}</p>
        <p>Code: {scanQRCode.code}</p>
      </div>
      )}
      {scanQRCode.status === "ERROR" && <div className="text-red-500 text-3xl text-center">{scanQRCode.message}</div>}
    </div>
  );
}
