import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import {
  createForm,
  readCatalog,
  upsertForm,
  type CatalogForm,
  type EvoTree,
} from "@/lib/catalog";
import type { RankCode } from "@/lib/ranks";

export async function GET() {
  const catalog = readCatalog();
  return NextResponse.json({
    forms: catalog.forms.map((f) => ({
      slug: f.slug,
      name: f.name,
      icon: f.icon,
      art: f.art,
      rank: f.rank,
      role: f.role,
    })),
  });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  }
  const body = (await request.json()) as {
    create?: {
      name?: string;
      rank?: RankCode;
      role?: CatalogForm["role"];
      hp?: number;
      at?: number;
      de?: number;
      as?: number;
    };
  };
  const name = body.create?.name?.trim() ?? "";
  if (!name) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }
  try {
    const form = createForm({
      name,
      rank: body.create?.rank,
      role: body.create?.role,
      hp: body.create?.hp,
      at: body.create?.at,
      de: body.create?.de,
      as: body.create?.as,
    });
    return NextResponse.json({ form });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not add" },
      { status: 400 },
    );
  }
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
