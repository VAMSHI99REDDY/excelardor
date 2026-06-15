import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Telescopic Mast Specifications | Excel Ardor",
  description: "Detailed technical specifications for pneumatic, hydraulic, electromechanical, and custom telescopic masts.",
};

export default function MastSpecificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
