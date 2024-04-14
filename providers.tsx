"use client"
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "./components/theme-provider";

export const Providers = ({ children }: any) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <RecoilRoot>{children}</RecoilRoot>
    </ThemeProvider>
  );
};
