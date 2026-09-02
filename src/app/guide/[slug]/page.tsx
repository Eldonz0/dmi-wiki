import { notFound } from "next/navigation";
import { getGuide } from "@/lib/guides";
import { GuideThread } from "@/components/guide-pages";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const post = getGuide((await params).slug);
  return { title: post?.title ?? "Guide" };
}

export default async function GuideThreadPage({ params }: Props) {
  const post = getGuide((await params).slug);
  if (!post) notFound();
  return <GuideThread post={post} />;
}
