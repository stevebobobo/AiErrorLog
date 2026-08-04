import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 翻車與盲點實錄 — AI 不是神，盲信要警醒",
  description: "記錄資深工程師與 AI 對話寫 Code 時，AI 犯下的幻覺杜撰、路徑混淆、過度自信與邏輯漏洞案例。",
  keywords: ["AI錯誤紀錄", "AI幻覺", "AI盲點", "AI開發避坑指南", "AI工程實錄"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
