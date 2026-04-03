/**
 * Election glossary — add entries here to grow the dictionary.
 * Keep wording neutral and easy to read; avoid invented numbers.
 */

export type GlossaryCategoryId =
  | "general"
  | "voting"
  | "knesset"
  | "parties"
  | "laws";

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
  { id: "laws", label: "חוקים" },
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
  {
    id: "conscription-law",
    term: "חוק הגיוס",
    categoryId: "laws",
    definition: "מכסות וסנקציות מול פטור גורף.",
  },
  {
    id: "public-transport-shabbat",
    term: "תחבורה ציבורית בשבת",
    categoryId: "laws",
    definition: "החלטה מוניציפלית מול איסור ארצי.",
  },
  {
    id: "civil-marriage-law",
    term: "חוק נישואין אזרחיים / ברית הזוגיות",
    categoryId: "laws",
    definition:
      "הסדרה של נישואין אזרחיים או מסלול ברית זוגיות לצד המצב הקיים.",
  },
  {
    id: "chametz-hospitals-law",
    term: "חוק החמץ בבתי חולים",
    categoryId: "laws",
    definition: "קובע את המדיניות לגבי הכנסת חמץ לבתי חולים בפסח.",
  },
  {
    id: "override-clause",
    term: "פסקת ההתגברות",
    categoryId: "laws",
    definition: "יכולת הכנסת לחוקק מחדש חוק שפסל בג\"ץ.",
  },
  {
    id: "ag-split-law",
    term: "חוק פיצול תפקיד היועמ\"ש",
    categoryId: "laws",
    definition:
      "פיצול בין תפקיד היועץ המשפטי לממשלה לבין תפקיד התביעה הכללית.",
  },
  {
    id: "broadcasting-law",
    term: "חוק השידורים",
    categoryId: "laws",
    definition: "הקמת גוף פיקוח פוליטי על התקשורת.",
  },
  {
    id: "reasonableness-standard-cancel",
    term: "ביטול עילת הסבירות",
    categoryId: "laws",
    definition:
      "צמצום או ביטול היכולת של בית המשפט לבטל החלטות מנהליות בעילת סבירות.",
  },
  {
    id: "free-education-0-3",
    term: "חוק חינוך חינם מגיל 0-3",
    categoryId: "laws",
    definition: "הרחבת החינוך הציבורי חינם לגילאי לידה עד שלוש.",
  },
  {
    id: "higher-education-subsidy",
    term: "חוק סבסוד השכלה גבוהה / תואר ראשון חינם",
    categoryId: "laws",
    definition: "הפחתה משמעותית או ביטול שכר לימוד לתואר ראשון.",
  },
  {
    id: "rent-control-law",
    term: "חוק פיקוח על שכר הדירה",
    categoryId: "laws",
    definition: "הסדרת חוזים והגבלת העלאות חדות בשכר הדירה.",
  },
  {
    id: "minimum-wage-7000",
    term: "העלאת שכר המינימום ל-7,000 ש\"ח",
    categoryId: "laws",
    definition: "קביעת יעד העלאה לשכר המינימום במשק.",
  },
  {
    id: "death-penalty-terrorists",
    term: "חוק עונש מוות למחבלים",
    categoryId: "laws",
    definition: "עיגון אפשרות לענישה זו בעבירות טרור מסוימות.",
  },
  {
    id: "deport-terror-families",
    term: "חוק גירוש משפחות מחבלים",
    categoryId: "laws",
    definition: "קביעת סמכות לגירוש או הרחקה של בני משפחה במקרים מוגדרים.",
  },
  {
    id: "judea-samaria-sovereignty",
    term: "החלת ריבונות ביו\"ש",
    categoryId: "laws",
    definition: "סיפוח והחלה פורמלית של החוק הישראלי על שטחים ביהודה ושומרון.",
  },
  {
    id: "ngo-law-foreign-funding",
    term: "חוק העמותות",
    categoryId: "laws",
    definition: "הגבלת מימון זר לעמותות פוליטיות.",
  },
];

const categoryOrder = new Map(
  glossaryCategories.map((c, i) => [c.id, i] as const),
);

const lawTermOrder = new Map(
  [
    "conscription-law",
    "public-transport-shabbat",
    "civil-marriage-law",
    "chametz-hospitals-law",
    "override-clause",
    "ag-split-law",
    "broadcasting-law",
    "reasonableness-standard-cancel",
    "free-education-0-3",
    "higher-education-subsidy",
    "rent-control-law",
    "minimum-wage-7000",
    "death-penalty-terrorists",
    "deport-terror-families",
    "judea-samaria-sovereignty",
    "ngo-law-foreign-funding",
  ].map((id, index) => [id, index] as const),
);

/** Stable sort: category order, then term (locale-aware) */
export function sortGlossaryTerms(terms: GlossaryTerm[]): GlossaryTerm[] {
  return [...terms].sort((a, b) => {
    const ca = categoryOrder.get(a.categoryId) ?? 99;
    const cb = categoryOrder.get(b.categoryId) ?? 99;
    if (ca !== cb) return ca - cb;

    if (a.categoryId === "laws" && b.categoryId === "laws") {
      const la = lawTermOrder.get(a.id) ?? Number.MAX_SAFE_INTEGER;
      const lb = lawTermOrder.get(b.id) ?? Number.MAX_SAFE_INTEGER;
      if (la !== lb) return la - lb;
    }

    return a.term.localeCompare(b.term, "he");
  });
}
