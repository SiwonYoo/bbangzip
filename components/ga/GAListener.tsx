"use client";

import { pageview, track404 } from "@/lib/ga";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function GAListener() {
  const pathname = usePathname();

  useEffect(() => {
    pageview(pathname);

    if (pathname === "/404") {
      track404(pathname, document.referrer);
    }
  }, [pathname]);

  return null;
}

export default GAListener;
