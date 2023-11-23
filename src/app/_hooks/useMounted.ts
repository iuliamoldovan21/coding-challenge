import { useEffect, useState } from "react";

//used to fix error for isBookInList undefined in ActionButton
export const useMounted = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);
  return mounted;
};
