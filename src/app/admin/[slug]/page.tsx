import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allNames, evoTree, getForm, listDigimon } from "@/lib/catalog";
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
  const stored = evoTree(slug);
  const fallbackLine = [
    ...form.lines.filter((n) => n && n !== "?" && n !== form.name),
    form.name,
  ];
  const tree = stored ?? { rows: [fallbackLine], branches: [] };
  const names = allNames();
  const slugs = listDigimon().map((d) => ({ name: d.name, slug: d.slug }));
  return (
    <article className="mw-article">
      <div className="mw-pre-title">Tamer · catalog</div>
      <h1 className="mw-firstHeading">Edit {form.name}</h1>
      <FormEditor
        form={form}
        tree={tree}
        names={names}
        slugs={slugs}
      />
    </article>
  );
}
