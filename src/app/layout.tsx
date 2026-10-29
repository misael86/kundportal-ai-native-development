import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getThemePreference } from "@/shared/ui/theme-switcher/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kundportal – UI-grund",
  description: "Delade komponenter och temastöd för kundserviceportalen.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = getThemePreference((await cookies()).get("theme")?.value);

  return (
    <html lang="sv" data-theme={theme}>
      <body>{children}</body>
    </html>
  );
}
