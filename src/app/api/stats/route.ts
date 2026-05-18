import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const stats = await prisma.stat.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(stats);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const stat = await prisma.stat.create({ data: body });
  return NextResponse.json(stat, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { id, ...data } = body;
  const stat = await prisma.stat.update({ where: { id }, data });
  return NextResponse.json(stat);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  await prisma.stat.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
