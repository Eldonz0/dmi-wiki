import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import {
  readCatalog,
  upsertForm,
  type CatalogForm,
  type EvoTree,
} from "@/lib/catalog";

export async function GET() {
  const catalog = readCatalog();
  return NextResponse.json({
    forms: catalog.forms,
    trees: catalog.trees,
  });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const body = (await request.json()) as {
    form: CatalogForm;
    tree?: EvoTree;
  };
  if (!body?.form?.slug) {
    return NextResponse.json({ error: "Missing form" }, { status: 400 });
  }
  const saved = upsertForm(body.form.slug, body.form, body.tree);
  return NextResponse.json({ form: saved, tree: body.tree });
}

export async function PATCH(request: Request) {
  return PUT(request);
}
