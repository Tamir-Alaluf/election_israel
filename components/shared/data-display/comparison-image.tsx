"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function ComparisonImage({
  src,
  alt,
  sizeClassName,
}: {
  src: string;
  alt: string;
  sizeClassName: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden flex items-center justify-center",
        sizeClassName,
      )}
    >
      {isLoading && <Skeleton className="absolute inset-0 rounded-full" />}
      <Image
        src={src}
        alt={alt}
        width={2048}
        height={2048}
        sizes="128px"
        className={cn(
          "object-cover transition-opacity duration-200",
          isLoading && "opacity-0",
        )}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
