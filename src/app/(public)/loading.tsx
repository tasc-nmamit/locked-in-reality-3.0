import { FaSpinner } from "react-icons/fa6";

export default function GlobalLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <FaSpinner fill="white" className="h-[30rem] animate-spin" />
    </div>
  );
}
