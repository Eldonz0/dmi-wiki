import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DigimonArticle } from "@/components/digimon-article";
import { FormEditor } from "@/components/form-editor";
import { EditorSwitch } from "@/components/editor-switch";
import {
  allNames,
  artMap,
  evoTree,
  getDigimon,
  getForm,
  iconMap,
  listDigimon,
  rankIconMap,
} from "@/lib/catalog";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...listDigimon().map((d) => ({ slug: d.slug })),
    { slug: "agumon" },
    { slug: "omegamon-x-extreme" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const digimon = getDigimon(slug);
  return { title: digimon?.name ?? "Digimon" };
}

export default async function DigimonPage({ params }: Props) {
  const { slug } = await params;
  const digimon = getDigimon(slug);
  const form = getForm(slug);
  if (!digimon || !form) notFound();
  const tree = evoTree(slug);
  const names = allNames();
  const slugs = listDigimon().map((d) => ({ name: d.name, slug: d.slug }));
  return (
    <EditorSwitch
      editor={
        <FormEditor
          form={form}
          tree={tree}
          names={names}
          slugs={slugs}
          icons={iconMap()}
          art={artMap()}
          rankIcons={rankIconMap()}
        />
      }
    >
      <DigimonArticle digimon={digimon} />
    </EditorSwitch>
  );
}
