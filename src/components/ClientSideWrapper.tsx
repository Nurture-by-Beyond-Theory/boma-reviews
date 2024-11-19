"use client";

import { usePathname } from "next/navigation";
import MainLayout from "@/components/MainLayout";

interface ClientSideWrapperProps {
  children: React.ReactNode;
}

export default function ClientSideWrapper({
  children,
}: ClientSideWrapperProps) {
  const pathname = usePathname();

  // Debugging logs
  console.log("Current Pathname:", pathname);

  // Define excluded routes
  const excludeLayoutRoutes = ["/login", "/signup", "/forgot-password"];
  const isExcluded = excludeLayoutRoutes.includes(pathname);

  return isExcluded ? <>{children}</> : <MainLayout>{children}</MainLayout>;
}
