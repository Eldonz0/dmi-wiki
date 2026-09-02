import { listGuides } from "@/lib/guides";
import { GuideTopicList } from "@/components/guide-pages";

export const dynamic = "force-dynamic";
export const metadata = { title: "Guide" };

export default function GuidePage() {
  return <GuideTopicList posts={listGuides()} />;
}
