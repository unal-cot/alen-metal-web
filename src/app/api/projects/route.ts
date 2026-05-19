import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  const where = session ? {} : { active: true };
  const projects = await prisma.project.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { images, ...projectData } = body;
  if (projectData.completedAt) {
    projectData.completedAt = new Date(projectData.completedAt).toISOString();
  }
  const project = await prisma.project.create({
    data: {
      ...projectData,
      images: images?.length
        ? { create: images.map((img: { url: string; order?: number }, i: number) => ({ url: img.url || img, order: img.order ?? i })) }
        : undefined,
    },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json(project, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { id, images, ...data } = body;
  if (data.completedAt) {
    data.completedAt = new Date(data.completedAt).toISOString();
  }
  // Replace images: delete all, create new
  if (images !== undefined) {
    await prisma.projectImage.deleteMany({ where: { projectId: id } });
  }
  const project = await prisma.project.update({
    where: { id },
    data: {
      ...data,
      ...(images !== undefined && {
        images: {
          create: images.map((img: { url: string; order?: number }, i: number) => ({ url: img.url || img, order: img.order ?? i })),
        },
      }),
    },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json(project);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
