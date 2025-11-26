import Layout from "@/components/layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "Dashboard",
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
