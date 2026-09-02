import { notFound, redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import { getGuide } from "@/lib/guides";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function EditGuidePage({ params }: Props) {
  if (!(await isAdmin())) redirect("/guide");
  const post = getGuide((await params).slug);
  if (!post) notFound();
  redirect(`/guide/${post.slug}`);
}
