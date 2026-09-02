import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allNames, artMap, evoTree, getForm, iconMap, listDigimon, rankIconMap } from "@/lib/catalog";
import { FormEditor } from "@/components/form-editor";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const form = getForm(slug);
  return { title: form ? `Edit ${form.name}` : "Edit" };
}

export default async function AdminFormPage({ params }: Props) {
  const { slug } = await params;
  const form = getForm(slug);
  if (!form) notFound();
  const tree = evoTree(slug);
  const names = allNames();
  const slugs = listDigimon().map((d) => ({ name: d.name, slug: d.slug }));
  return (
    <article className="mw-article">
      <FormEditor
        form={form}
        tree={tree}
        names={names}
        slugs={slugs}
        icons={iconMap()}
        art={artMap()}
        rankIcons={rankIconMap()}
      />
    </article>
  );
}
