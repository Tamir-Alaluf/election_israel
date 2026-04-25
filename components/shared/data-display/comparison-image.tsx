"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const INTRINSIC = 256;

export function ComparisonImage({
  src,
  alt,
  sizeClassName,
  sizes = "(max-width: 768px) 64px, 64px",
}: {
  src: string;
  alt: string;
  sizeClassName: string;
  /** Max displayed width for next/image; default covers w-14–w-16 avatars. */
  sizes?: string;
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
        width={INTRINSIC}
        height={INTRINSIC}
        sizes={sizes}
        className={cn(
          "object-cover transition-opacity duration-200",
          isLoading && "opacity-0",
        )}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
