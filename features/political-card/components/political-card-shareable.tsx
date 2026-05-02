"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Bus,
  Copy,
  Facebook,
  GraduationCap,
  MessageCircle,
  Share2,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildPoliticalCardPageUrl,
  buildPoliticalCardShareBody,
  buildPoliticalCardShareTitle,
} from "@/lib/share/political-card-share-text";

export type PoliticalCardShareablePriority = {
  id: string;
  label: string;
};

const PRIORITY_ICONS: Record<string, LucideIcon> = {
  education: GraduationCap,
  "small-business": Store,
  transport: Bus,
};

export type PoliticalCardShareableProps = {
  priorities: PoliticalCardShareablePriority[];
};

export function PoliticalCardShareable({ priorities }: PoliticalCardShareableProps) {
  const [pageUrl, setPageUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const copyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setPageUrl(buildPoliticalCardPageUrl(window.location.origin));
  }, []);

  const joinedHeadline = useMemo(
    () => priorities.map((p) => p.label).join(" | "),
    [priorities],
  );

  const shareBody = useMemo(() => {
    if (!pageUrl) return "";
    return buildPoliticalCardShareBody(pageUrl, joinedHeadline);
  }, [pageUrl, joinedHeadline]);

  const shareTitle = useMemo(() => buildPoliticalCardShareTitle(), []);

  const canUseNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  const handleNativeShare = useCallback(async () => {
    if (!pageUrl || !shareBody) return;
    try {
      await navigator.share({
        title: shareTitle,
        text: shareBody,
        url: pageUrl,
      });
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      console.error(err);
    }
  }, [pageUrl, shareBody, shareTitle]);

  const whatsappHref = useMemo(() => {
    if (!pageUrl || !shareBody) return "#";
    return `https://wa.me/?text=${encodeURIComponent(shareBody)}`;
  }, [pageUrl, shareBody]);

  const facebookHref = useMemo(() => {
    if (!pageUrl) return "#";
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
  }, [pageUrl]);

  const handleCopyLink = useCallback(async () => {
    if (!pageUrl) return;
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      if (copyResetRef.current) clearTimeout(copyResetRef.current);
      copyResetRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [pageUrl]);

  useEffect(() => {
    return () => {
      if (copyResetRef.current) clearTimeout(copyResetRef.current);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-primary/20 via-background to-muted/90 shadow-lg shadow-primary/5 ring-1 ring-primary/15 dark:from-primary/15 dark:via-background dark:to-muted/40">
        <div
          className="pointer-events-none absolute -start-24 -top-28 size-64 rounded-full bg-primary/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -end-24 size-56 rounded-full bg-accent/25 blur-3xl"
          aria-hidden
        />

        <div className="relative space-y-8 px-5 py-10 sm:px-8 sm:py-12">
          <p className="text-center text-sm font-medium leading-relaxed text-muted-foreground">
            בבחירות האלה, הקול שלי הולך ל...
          </p>

          <p
            className="text-center text-2xl sm:text-3xl font-semibold tracking-tight text-foreground leading-snug"
            lang="he"
          >
            {joinedHeadline}
          </p>

          <ul
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            aria-label="שלושת הנושאים המרכזיים"
          >
            {priorities.map((item) => {
              const Icon = PRIORITY_ICONS[item.id];
              if (!Icon) return null;
              return (
                <li key={item.id}>
                  <span
                    className="flex size-12 items-center justify-center rounded-2xl bg-background/80 text-primary shadow-sm ring-1 ring-primary/10 backdrop-blur-sm dark:bg-card/60"
                    title={item.label}
                  >
                    <Icon className="size-6" strokeWidth={1.5} aria-hidden />
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="text-center text-xs font-medium tracking-wide text-muted-foreground">
            בחירות 2026
          </p>
        </div>
      </div>

      <div
        className="flex flex-wrap items-center justify-center gap-2"
        role="group"
        aria-label="שיתוף הכרטיס"
      >
        {canUseNativeShare ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-xl gap-2"
            onClick={handleNativeShare}
            disabled={!pageUrl}
            aria-label="שיתוף דרך האפליקציה במכשיר"
            title="ניתן גם לצלם מסך ולשתף בסטורי"
          >
            <Share2 className="size-4" aria-hidden />
            שיתוף
          </Button>
        ) : null}

        <Button variant="outline" size="sm" className="rounded-xl gap-2" asChild disabled={!pageUrl}>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="שיתוף בווטסאפ"
          >
            <MessageCircle className="size-4" aria-hidden />
            ווטסאפ
          </a>
        </Button>

        <Button variant="outline" size="sm" className="rounded-xl gap-2" asChild disabled={!pageUrl}>
          <a
            href={facebookHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="שיתוף בפייסבוק"
          >
            <Facebook className="size-4" aria-hidden />
            פייסבוק
          </a>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-xl gap-2 min-w-[7.5rem]"
          onClick={handleCopyLink}
          disabled={!pageUrl}
          aria-label="העתקת קישור לעמוד"
        >
          <Copy className="size-4" aria-hidden />
          {copied ? "הועתק!" : "העתק קישור"}
        </Button>
      </div>

    </div>
  );
}
