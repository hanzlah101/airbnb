import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prisma";

interface IParams {
  listingId?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favouriteIds = [...(currentUser.favouriteIds || [])];

  if (currentUser?.favouriteIds?.includes(listingId)) {
    const user = await prisma?.user?.update({
      where: { id: currentUser.id },
      data: {
        favouriteIds: { set: favouriteIds.filter((id) => id !== listingId) },
      },
    });

    return NextResponse.json(user);
  } else {
    const user = await prisma?.user?.update({
      where: { id: currentUser.id },
      data: {
        favouriteIds: { push: listingId },
      },
    });

    return NextResponse.json(user);
  }
}
