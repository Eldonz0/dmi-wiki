import { listAccessoryCategories } from "@/lib/accessories";
import { AccessoryHub } from "@/components/accessory-hub";

export const dynamic = "force-dynamic";
export const metadata = { title: "Accessory" };

export default function AccessoryPage() {
  return <AccessoryHub categories={listAccessoryCategories()} />;
}
