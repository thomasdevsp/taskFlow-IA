import Layout from "@/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Flow IA ",
  description: "Task Flow Ia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
      {children}
    </Layout>
  );
}
