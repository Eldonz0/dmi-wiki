import { getGuideHub, listGuides } from "@/lib/guides";
import { GuideHub } from "@/components/guide-hub";

export const dynamic = "force-dynamic";
export const metadata = { title: "Guide" };

export default function GuidePage() {
  return <GuideHub posts={listGuides()} hub={getGuideHub()} />;
}
