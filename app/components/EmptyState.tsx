"use client";

import React, { FC } from "react";
import Heading from "./Heading";
import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />

      <div className="w-48 mt-4">
        {showReset && (
          <Link
            href={"/"}
            className="border-2 border-black px-6 hover:opacity-70 py-2 rounded-lg"
          >
            Remove all filters
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
