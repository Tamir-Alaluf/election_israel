/**
 * Election glossary — add entries here to grow the dictionary.
 * Keep wording neutral and easy to read; avoid invented numbers.
 */

export type GlossaryCategoryId =
  | "general"
  | "voting"
  | "knesset"
  | "parties";

export type GlossaryCategory = {
  id: GlossaryCategoryId;
  label: string;
};

export type GlossaryTerm = {
  /** Stable id for keys and anchors */
  id: string;
  /** Headword as shown in the UI */
  term: string;
  /** Plain-language explanation (can use \n\n for short paragraphs) */
  definition: string;
  categoryId: GlossaryCategoryId;
};

export const glossaryCategories: GlossaryCategory[] = [
  { id: "general", label: "כללי" },
  { id: "voting", label: "בחירות והצבעה" },
  { id: "knesset", label: "הכנסת והממשלה" },
  { id: "parties", label: "מפלגות ובריתות" },
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "knesset",
    term: "הכנסת",
    categoryId: "knesset",
    definition:
      "בית הנבחרים של ישראל. חברי הכנסת מחוקקים חוקים, מאשרים תקציב ופוקחים על הממשלה.",
  },
  {
    id: "mandate",
    term: "מנדט",
    categoryId: "general",
    definition:
      "מושב אחד בכנסת. מספר המנדטים שמפלגה מקבלת נקבע לפי קולות הבוחרים (אחרי חישובים כמו אחוז החסימה והקצאת עודפים).",
  },
  {
    id: "threshold",
    term: "אחוז החסימה",
    categoryId: "voting",
    definition:
      "מינימום קולות שרשימה צריכה כדי להיכנס לכנסת. רשימות שמתחתיו לא מקבלות מנדטים.",
  },
  {
    id: "coalition",
    term: "קואליציה",
    categoryId: "knesset",
    definition:
      "קשר של מפלגות שמסכימות לתמוך בממשלה. בדרך כלל צריך רוב בכנסת כדי להקים ממשלה.",
  },
  {
    id: "opposition",
    term: "אופוזיציה",
    categoryId: "knesset",
    definition:
      "מפלגות שלא בשלטון — אלו שמתנגדות לממשלה או לא יושבות בה.",
  },
  {
    id: "pm",
    term: "ראש הממשלה",
    categoryId: "knesset",
    definition:
      "ראש הרשות המבצעת בישראל. נבחר מתוך חברי הכנסת ומוביל את הממשלה.",
  },
  {
    id: "ballot-slip",
    term: "פזקל",
    categoryId: "voting",
    definition:
      "נייר ההצבעה בקלפי. בוחרים רשימה אחת (או פתק לבן / פסול לפי ההנחיות).",
  },
  {
    id: "white-slip-invalid",
    term: "שקל לבן / פתק פסול",
    categoryId: "voting",
    definition:
      "הצבעה שלא נספרת לטובת רשימה — למשל פתק ריק או שלא לפי ההוראות. לא \"מבזבזים\" קול לרשימה.",
  },
  {
    id: "party-list",
    term: "רשימה מסודרת",
    categoryId: "parties",
    definition:
      "רשימת המועמדים של מפלגה לכנסת, לפי סדר. הסדר משפיע מי נכנס אם למפלגה יש מנדטים.",
  },
  {
    id: "surplus-agreement",
    term: "הסכם עודפים",
    categoryId: "parties",
    definition:
      "הסכם בין שתי רשימות לחלוקת קולות עודפים אחרי החישוב — כדי לא לפספס מנדטים קטנים.",
  },
  {
    id: "polling-station",
    term: "קלפי",
    categoryId: "voting",
    definition:
      "מקום ההצבעה ביום הבחירות. מגיעים עם תעודה מזהה לפי ההנחיות.",
  },
  {
    id: "exit-poll",
    term: "סקר יציאה מקלפי",
    categoryId: "general",
    definition:
      "סקר שנערך מחוץ לקלפי ביום הבחירות. נותן הערכה לפני ספירה רשמית — לא תוצאה סופית.",
  },
  {
    id: "pre-election-poll",
    term: "סקר לפני בחירות",
    categoryId: "general",
    definition:
      "סקר שמעריך כוונות הצבעה לפני יום הבחירות. תוצאות משתנות ותלויות בשיטה ובמדגם.",
  },
  {
    id: "president-tasked",
    term: "הטלת הרכבת הממשלה",
    categoryId: "knesset",
    definition:
      "הנשיא מטיל על חבר כנסת לנסות להרכיב ממשלה שזוכה לאמון הכנסת.",
  },
];

const categoryOrder = new Map(
  glossaryCategories.map((c, i) => [c.id, i] as const),
);

/** Stable sort: category order, then term (locale-aware) */
export function sortGlossaryTerms(terms: GlossaryTerm[]): GlossaryTerm[] {
  return [...terms].sort((a, b) => {
    const ca = categoryOrder.get(a.categoryId) ?? 99;
    const cb = categoryOrder.get(b.categoryId) ?? 99;
    if (ca !== cb) return ca - cb;
    return a.term.localeCompare(b.term, "he");
  });
}
