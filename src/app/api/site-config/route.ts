import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const configs = await prisma.siteConfig.findMany();
  const map: Record<string, string> = {};
  for (const c of configs) map[c.key] = c.value;
  return NextResponse.json(map);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  for (const [key, value] of Object.entries(body)) {
    await prisma.siteConfig.upsert({
      where: { key },
      update: { value: value as string },
      create: { key, value: value as string },
    });
  }
  return NextResponse.json({ success: true });
}
