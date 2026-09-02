import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import {
  allNames,
  artMap,
  evoTree,
  getForm,
  iconMap,
  listForms,
  rankIconMap,
} from "@/lib/catalog";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, ctx: Ctx) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const { slug } = await ctx.params;
  const form = getForm(slug);
  if (!form) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    form,
    tree: evoTree(slug),
    names: allNames(),
    slugs: listForms().map((d) => ({ name: d.name, slug: d.slug })),
    icons: iconMap(),
    art: artMap(),
    rankIcons: rankIconMap(),
  });
}
