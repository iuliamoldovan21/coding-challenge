"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export function RootNavigationEvent() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/") {
      router.push("/home");
    }
  }, [pathname, router]);

  return null;
}
