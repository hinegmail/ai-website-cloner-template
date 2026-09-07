import type { Metadata } from "next";
import "./giada-archive.css";

export const metadata: Metadata = {
  title: "GIADA Archives | 品牌档案 | GIADA Official",
  description: "Explore GIADA's fashion collection archives spanning multiple seasons of Milan Fashion Week showcases.",
};

export default function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
