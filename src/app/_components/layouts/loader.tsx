"use client";

import { FaSpinner } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const Loader = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true); // Start loading when route changes
    const timeout = setTimeout(() => setLoading(false), 500); // Fake delay for smooth effect

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [pathname]);

  return (
    <div className="flex items-center justify-center">
      {loading && <FaSpinner className="animate-spin" />}
    </div>
  );
};

export default Loader;
