"use client";

import { ComparisonImage } from "@/components/shared/data-display/comparison-image";

export function ComparisonProfileCard({
  image,
  name,
  subtitle,
  onClick,
}: {
  image: string;
  name: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="aspect-square glass-card rounded-2xl flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
    >
      <ComparisonImage
        src={image}
        alt={`${name} icon`}
        sizeClassName="w-14 h-14"
      />
      <div className="text-center px-3">
        <h3 className="font-semibold text-sm text-foreground">{name}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
    </button>
  );
}
