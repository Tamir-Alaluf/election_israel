"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils/utils";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  normalize,
  sortGlossaryTermsForDisplay,
} from "@/lib/utils/glossary2";
import type { ElectionGlossaryViewProps } from "@/lib/types/items";

export function ElectionGlossaryView({
  categories,
  terms,
}: ElectionGlossaryViewProps) {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<string | "all">("all");

  const categoryOrder = useMemo(
    () => categories.map((c) => c.id),
    [categories],
  );

  const filtered = useMemo(() => {
    const q = normalize(query);
    let list = terms;

    if (categoryId !== "all") {
      list = list.filter((t) => t.categoryId === categoryId);
    }

    if (q.length > 0) {
      list = list.filter((t) => {
        const hay = normalize(`${t.term} ${t.definition}`);
        return hay.includes(q);
      });
    }

    return sortGlossaryTermsForDisplay(list, categoryOrder);
  }, [query, categoryId, terms, categoryOrder]);

  const total = terms.length;

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="glossary-search" className="text-muted-foreground">
          חיפוש במילון
        </Label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            id="glossary-search"
            type="search"
            enterKeyHint="search"
            placeholder="למשל: מנדט, קואליציה, קלפי…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={cn(
              "h-11 rounded-xl border-border/80 bg-card/80 pe-10 ps-3 shadow-none",
              "placeholder:text-muted-foreground/80",
            )}
            autoComplete="off"
          />
        </div>
      </div>

      <div>
        <p className="text-xs text-muted-foreground mb-2">קטגוריה</p>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="סינון לפי קטגוריה"
        >
          <button
            type="button"
            onClick={() => setCategoryId("all")}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
              categoryId === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            הכל
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategoryId(c.id)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                categoryId === c.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground" aria-live="polite">
        מציג {filtered.length} מתוך {total} מונחים
      </p>

      {filtered.length === 0 ? (
        <Empty className="glass-card rounded-xl border border-border/50 py-10">
          <EmptyHeader>
            <EmptyTitle>לא נמצאו מונחים</EmptyTitle>
            <EmptyDescription>
              נסו מילה אחרת או בחרו קטגוריה אחרת.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <Accordion type="multiple" className="glass-card rounded-xl px-1">
          {filtered.map((item) => {
            const cat = categories.find((c) => c.id === item.categoryId);
            return (
              <AccordionItem key={item.id} value={item.id} className="px-3">
                <AccordionTrigger className="text-start hover:no-underline py-4">
                  <span className="flex flex-col items-start gap-1 pe-2">
                    <span className="font-semibold text-foreground">
                      {item.term}
                    </span>
                    {cat ? (
                      <span className="text-[11px] font-normal text-muted-foreground">
                        {cat.label}
                      </span>
                    ) : null}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pb-1 text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {item.definition}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
}
