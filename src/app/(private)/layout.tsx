import type { ReactNode } from "react";
import PrivateLayout from "@/custom-layout/private-layout";

export default function PrivateRouteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
