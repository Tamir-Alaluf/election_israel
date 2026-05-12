"use client";

import type { SVGProps } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Bus, Facebook, GraduationCap, Instagram, Linkedin, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import {
  buildPoliticalCardPageUrl,
  buildPoliticalCardShareBody,
  POLITICAL_CARD_INTRO_LINE,
} from "@/lib/utils/political-card";

export type PoliticalCardShareablePriority = {
  id: string;
  label: string;
};

const PRIORITY_ICONS: Record<string, LucideIcon> = {
  education: GraduationCap,
  "small-business": Store,
  transport: Bus,
};

function WhatsAppGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export type PoliticalCardShareableProps = {
  priorities: PoliticalCardShareablePriority[];
  /** שם מועמד לשיתוף (אופציונלי) — מוצג במרכאות בטקסט השיתוף */
  candidateLabel?: string;
};

export function PoliticalCardShareable({
  priorities,
  candidateLabel,
}: PoliticalCardShareableProps) {
  const [pageUrl, setPageUrl] = useState("");
  const [instagramCopied, setInstagramCopied] = useState(false);
  const igCopyResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    return buildPoliticalCardShareBody(pageUrl, joinedHeadline, candidateLabel);
  }, [pageUrl, joinedHeadline, candidateLabel]);

  const whatsappHref = useMemo(() => {
    if (!pageUrl || !shareBody) return "#";
    return `https://wa.me/?text=${encodeURIComponent(shareBody)}`;
  }, [pageUrl, shareBody]);

  const facebookHref = useMemo(() => {
    if (!pageUrl) return "#";
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
  }, [pageUrl]);

  const linkedinHref = useMemo(() => {
    if (!pageUrl) return "#";
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
  }, [pageUrl]);

  const handleInstagramCopy = useCallback(async () => {
    if (!shareBody) return;
    try {
      await navigator.clipboard.writeText(shareBody);
      setInstagramCopied(true);
      if (igCopyResetRef.current) clearTimeout(igCopyResetRef.current);
      igCopyResetRef.current = setTimeout(() => setInstagramCopied(false), 2000);
    } catch {
      setInstagramCopied(false);
    }
  }, [shareBody]);

  useEffect(() => {
    return () => {
      if (igCopyResetRef.current) clearTimeout(igCopyResetRef.current);
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
            {POLITICAL_CARD_INTRO_LINE}
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
        <Button
          variant="outline"
          size="icon-sm"
          className="rounded-xl shrink-0"
          asChild
          disabled={!pageUrl}
        >
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="שיתוף בווטסאפ עם הודעה מוכנה"
            title="ווטסאפ"
          >
            <WhatsAppGlyph className="size-4" />
          </a>
        </Button>

        <Button
          variant="outline"
          size="icon-sm"
          className="rounded-xl shrink-0"
          asChild
          disabled={!pageUrl}
        >
          <a
            href={facebookHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="שיתוף בפייסבוק"
            title="פייסבוק"
          >
            <Facebook className="size-4" aria-hidden />
          </a>
        </Button>

        <Button
          variant="outline"
          size="icon-sm"
          className="rounded-xl shrink-0"
          asChild
          disabled={!pageUrl}
        >
          <a
            href={linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="שיתוף בלינקדאין"
            title="לינקדאין"
          >
            <Linkedin className="size-4" aria-hidden />
          </a>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="rounded-xl shrink-0"
          onClick={handleInstagramCopy}
          disabled={!shareBody}
          aria-label={
            instagramCopied
              ? "הטקסט הועתק ללוח — ניתן להדביק באינסטגרם"
              : "העתקת הטקסט והקישור להדבקה באינסטגרם"
          }
          title="אינסטגרם — העתקת טקסט וקישור (אין שיתוף ישיר מהדפדפן)"
        >
          <Instagram
            className={cn("size-4", instagramCopied && "text-emerald-600 dark:text-emerald-500")}
            aria-hidden
          />
        </Button>
      </div>
    </div>
  );
}
