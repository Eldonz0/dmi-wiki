import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getGuide } from "@/lib/guides";
import { GuideComposer } from "@/components/guide-composer";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const post = getGuide((await params).slug);
  return { title: post ? `Edit ${post.title}` : "Edit topic" };
}

export default async function EditGuidePage({ params }: Props) {
  if (!(await isAdmin())) {
    redirect("/guide");
  }
  const post = getGuide((await params).slug);
  if (!post) notFound();
  return <GuideComposer post={post} />;
}
