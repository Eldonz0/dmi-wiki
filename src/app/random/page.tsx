import { redirect } from "next/navigation";
import { PAGES } from "@/lib/wiki";

export const dynamic = "force-dynamic";

export default function RandomPage() {
  const articles = PAGES.filter((page) => page.href !== "/");
  const pick = articles[Math.floor(Math.random() * articles.length)];
  redirect(pick?.href ?? "/");
}
