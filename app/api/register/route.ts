import { hash } from "bcrypt";
import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  const hashedPassord = await hash(password, 12);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassord },
  });

  return NextResponse.json(user, { status: 201 });
}
