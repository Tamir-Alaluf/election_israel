/** מאפיינים מבניים/קואליציוניים — לא עמדות מדיניות יומיומיות */
export const partyCategories = {
  attributes: {
    title: "מאפייני המפלגה",
    parameters: [
      {
        id: "type",
        label: "סוג מפלגה",
        options: ["חרדית", "ערבית", "חילונית"],
      },
      {
        id: "security",
        label: "גישה ביטחונית",
        options: ["ימין", "מרכז ימין", "מרכז שמאל", "שמאל"],
      },
      {
        id: "economy",
        label: "גישה כלכלית",
        options: ["ימין כלכלי", "שמאל כלכלי", "מרכז"],
      },
      {
        id: "harediGov",
        label: "שילוב חרדים בממשלה",
        options: ["כן", "לא", "חלקי"],
      },
      {
        id: "arabGov",
        label: "שילוב ערבים בממשלה",
        options: ["כן", "לא", "חלקי"],
      },
    ],
  },
  issues: {
    title: "עמדות בחוקים ספציפיים",
    parameters: [
      {
        id: "draftLaw",
        label: "חוק הגיוס",
        group: "דת ומדינה",
        options: ["בעד", "נגד", "חלקי"],
      },
      {
        id: "shabbatTransportPolicy",
        label: "תחבורה ציבורית בשבת",
        group: "דת ומדינה",
        options: ["בעד", "נגד", "חלקי"],
      },
      {
        id: "civilMarriageLaw",
        label: "חוק נישואין אזרחיים / ברית הזוגיות",
        group: "דת ומדינה",
        options: ["בעד", "נגד", "חלקי"],
      },
      {
        id: "chametzLaw",
        label: "חוק החמץ בבתי חולים",
        group: "דת ומדינה",
        options: ["בעד", "נגד", "חלקי"],
      },
      {
        id: "overrideClause",
        label: "פסקת ההתגברות",
        group: "משפט וממשל",
        options: ["בעד", "נגד", "חלקי"],
      },
      {
        id: "agSplitLaw",
        label: 'חוק פיצול תפקיד היועמ"ש',
        group: "משפט וממשל",
        options: ["בעד", "נגד", "חלקי"],
      },
      {
        id: "broadcastingLaw",
        label: "חוק השידורים",
        group: "משפט וממשל",
        options: ["בעד", "נגד", "חלקי"],
      },
      {
        id: "reasonablenessCancellation",
        label: "ביטול עילת הסבירות",
        group: "משפט וממשל",
        options: ["בעד", "נגד", "חלקי"],
      },
      {
        id: "freeEdu0to3",
        label: "חוק חינוך חינם מגיל 0-3",
        group: "חברה וכלכלה",
        options: ["בעד", "נגד", "חלקי"],
      },
      {
        id: "higherEduSubsidyLaw",
        label: "חוק סבסוד השכלה גבוהה / תואר ראשון חינם",
        group: "חברה וכלכלה",
        options: ["בעד", "נגד", "חלקי"],
      },
      {
        id: "rentControlLaw",
        label: "חוק פיקוח על שכר הדירה",
        group: "חברה וכלכלה",
        options: ["בעד", "נגד", "חלקי"],
      },
      {
        id: "minWage7000",
        label: 'העלאת שכר המינימום ל-7,000 ש"ח',
        group: "חברה וכלכלה",
        options: ["בעד", "נגד", "חלקי"],
      },
      {
        id: "deathPenaltyTerror",
        label: "חוק עונש מוות למחבלים",
        group: "ביטחון ומדיניות",
        options: ["בעד", "נגד", "חלקי"],
      },
      {
        id: "terrorFamiliesDeportation",
        label: "חוק גירוש משפחות מחבלים",
        group: "ביטחון ומדיניות",
        options: ["בעד", "נגד", "חלקי"],
      },
      {
        id: "sovereigntyJudeaSamaria",
        label: 'החלת ריבונות ביו"ש (סיפוח)',
        group: "ביטחון ומדיניות",
        options: ["בעד", "נגד", "חלקי"],
      },
      {
        id: "ngoForeignFundingLaw",
        label: "חוק העמותות",
        group: "ביטחון ומדיניות",
        options: ["בעד", "נגד", "חלקי"],
      },
    ],
  },
} as const;

export const allPartyComparisonParameters = [
  ...partyCategories.attributes.parameters,
  ...partyCategories.issues.parameters,
] as const;

export const leaderParameters = [
  { id: "securityBg", label: "רקע ביטחוני", type: "rating" },
];

/** קטגוריות לתגית בפריטי "מה עשו מאז הבחירות" — תואמות לקבוצות בעמדות בחוקים */
export const recentActionItemCategories = [
  "ביטחון ומדיניות",
  "חברה וכלכלה",
  "משפט וממשל",
  "דת ומדינה",
] as const;

export type RecentActionItemCategory =
  (typeof recentActionItemCategories)[number];

// Sample party data - can be expanded
export const parties = [
  {
    id: "likud",
    name: "הליכוד",
    leader: "בנימין נתניהו",
    color: "#0066cc",
    mandates: 26,
    image: "/parties/likud.png",
    members: ["ישראל כץ", "ניר ברקת", "יריב לוין", "מירי רגב", "יואב גלנט"],
    vision:
      "החזון: ישראל כמעצמה חזקה, חופשית ובטוחה.\n\n" +
      "המפלגה שואפת שבעוד 10 שנים ישראל תהיה המדינה הכי חזקה במזרח התיכון בזכות צבא חזק וכלכלה של שוק חופשי (פחות התערבות של הממשלה, יותר תחרות). הליכוד דוגל בשמירה על ארץ ישראל ועל ריבונות יהודית, בלי להקים מדינה פלסטינית, מתוך אמונה שרק כוח והרתעה יביאו שלום אמת וביטחון.",
    recentActions: "",
    recentActionsItems: [
      {
        category: "ביטחון ומדיניות",
        title: 'מלחמת "חרבות ברזל"',
        description:
          "הובלת המערכה הצבאית למיטוט חמאס בעזה והשבת החטופים בעקבות טבח ה-7 באוקטובר.",
      },
      {
        category: "ביטחון ומדיניות",
        title: "החזית הצפונית",
        description:
          "ניהול הלחימה מול חיזבאללה, פינוי תושבי הצפון וביצוע סיכולים ממוקדים בבכירי הארגון ואיראן.",
      },
      {
        category: "ביטחון ומדיניות",
        title: "תקיפות באיראן",
        description:
          "הובלת תקיפות ישירות וחסרות תקדים על אדמת איראן בתגובה למתקפות הכטב\"מים והטילים.",
      },
      {
        category: "משפט וממשל",
        title: "עילת הסבירות",
        description:
          'העברת תיקון לחוק היסוד שנועד להגביל את יכולת בג"ץ לבטל החלטות ממשלה (החוק בוטל בהמשך על ידי בג"ץ).',
      },
      {
        category: "משפט וממשל",
        title: "שינוי המערכת המשפטית",
        description:
          "קידום תוכנית רחבה לשינוי הרכב הוועדה לבחירת שופטים וסמכויות היועצים המשפטיים.",
      },
      {
        category: "חברה וכלכלה",
        title: "רפורמת היבוא",
        description:
          'קידום חקיקת "מה שטוב לאירופה טוב לישראל" להפחתת בירוקרטיה, הקלות בתקינה והורדת מחירי המזון והטואלטיקה.',
      },
      {
        category: "חברה וכלכלה",
        title: "נקודות זיכוי",
        description:
          "הרחבת נקודות הזיכוי להורים עובדים לילדים עד גיל 3 כדי להגדיל את ההכנסה הפנויה למשפחות צעירות.",
      },
      {
        category: "חברה וכלכלה",
        title: "תשתיות תחבורה",
        description:
          'המשך פיתוח הרכבת הקלה בגוש דן ותקצוב "רכבת הקליע" לחיבור קריית שמונה ואילת למרכז.',
      },
      {
        category: "ביטחון ומדיניות",
        title: "המשמר הלאומי",
        description:
          "הקמת גוף ביטחוני תחת המשטרה לחיזוק המשילות והביטחון האישי בערים המעורבות ובנגב.",
      },
      {
        category: "דת ומדינה",
        title: "חוק הגיוס",
        description:
          'ניסיונות להסדרת מעמד בני הישיבות תוך ניסיון לשמר את הקואליציה מול דרישות בג"ץ והצבא.',
      },
      {
        category: "חברה וכלכלה",
        title: "סבסוד מעונות יום",
        description:
          "הגדלת תקציבי הסבסוד למשפחות עובדות במטרה להקל על נטל ההוצאות החודשי.",
      },
    ],
    futurePromisesItems: [
      {
        title: "חיזוק המשילות והביטחון",
        description:
          "קידום צעדי אכיפה ומדיניות ביטחונית נוקשה לשיפור היציבות וההרתעה.",
      },
      {
        title: "צמצום הבירוקרטיה",
        description:
          "קיצור תהליכים מול משרדי הממשלה והפחתת חסמים רגולטוריים לעסקים ולאזרחים.",
      },
      {
        title: "השקעה בתשתיות לאומיות",
        description:
          "הרחבת השקעות בתחבורה, אנרגיה ותשתיות ציבוריות לטווח ארוך.",
      },
      {
        title: "חיזוק מעמד ישראל בעולם",
        description:
          "העמקת קשרים מדיניים וכלכליים עם שותפות אזוריות ובינלאומיות.",
      },
      {
        title: "הפחתת יוקר המחיה",
        description:
          "קידום תחרות בשוק המזון והיבוא לצורך הורדת מחירים לצרכנים.",
      },
      {
        title: "הרחבת פתרונות הדיור",
        description: "האצת שיווק קרקעות ותכנון מהיר יותר של שכונות חדשות.",
      },
      {
        title: "חיזוק הנגב והגליל",
        description: "השקעה בתעסוקה, תשתיות ושירותים ציבוריים בפריפריה.",
      },
      {
        title: "קידום חדשנות וטכנולוגיה",
        description: "תמרוץ תעשיות מתקדמות והרחבת השקעות במחקר ופיתוח.",
      },
      {
        title: "שיפור מערכת החינוך",
        description: "חיזוק לימודי ליבה והרחבת תוכניות מצוינות בפריסה ארצית.",
      },
      {
        title: "ייעול השירות הציבורי",
        description: "הרחבת שירותים דיגיטליים והקטנת עומסים בירוקרטיים לאזרח.",
      },
    ],
    promisesVsResultsLikud:
      "הבטחות מול תוצאות (הליכוד): חלק מההבטחות בנושאי ביטחון, הסכמי נורמליזציה ושוק חופשי תורגמו למדיניות בפועל, בעוד תחומים כמו יוקר מחיה, משבר הדיור והפחתת עומס ביורוקרטי נותרו שנויים במחלוקת מבחינת מימוש מלא.",
    values: {
      type: "חילונית",
      security: "ימין",
      economy: "ימין כלכלי",
      harediGov: "כן",
      arabGov: "לא",
      draftLaw: "נגד",
      shabbatTransportPolicy: "נגד",
      civilMarriageLaw: "נגד",
      chametzLaw: "בעד",
      overrideClause: "בעד",
      agSplitLaw: "בעד",
      broadcastingLaw: "בעד",
      reasonablenessCancellation: "בעד",
      freeEdu0to3: "נגד",
      higherEduSubsidyLaw: "נגד",
      rentControlLaw: "נגד",
      minWage7000: "נגד",
      deathPenaltyTerror: "בעד",
      terrorFamiliesDeportation: "בעד",
      sovereigntyJudeaSamaria: "בעד",
      ngoForeignFundingLaw: "בעד",
    },
  },
  {
    id: "yeshAtid",
    name: "יש עתיד",
    leader: "יאיר לפיד",
    color: "#00a0dc",
    mandates: 24,
    image: "/parties/yeshAtid.png",
    members: [
      "מאיר כהן",
      "קארין אלהרר",
      "רם בן ברק",
      "בועז טופורובסקי",
      "נעמה לזימי",
      "מאיר כהן",
      "קארין אלהרר",
      "רם בן ברק",
      "בועז טופורובסקי",
      "נעמה לזימי",
      "מאיר כהן",
      "קארין אלהרר",
      "רם בן ברק",
      "בועז טופורובסקי",
      "נעמה לזימי",
    ],
    vision:
      "החזון: ישראל כדמוקרטיה ליברלית, חילונית ומתקדמת.\n\n" +
      'המפלגה רוצה שבעוד עשור ישראל תהיה מדינה "נורמלית" ומודרנית, שבה יש שוויון בנטל (כולם מתגייסים או משרתים), הפרדה בין דת לפוליטיקה, ומערכת חינוך שמכינה את הצעירים לשוק העבודה העולמי. המטרה היא לשמור על ישראל יהודית ודמוקרטית דרך היפרדות מהפלסטינים וחיזוק המעמד של ישראל בעולם.',
    recentActions: "",
    recentActionsItems: [
      {
        category: "משפט וממשל",
        title: "ממשלות אחדות",
        description:
          "לקיחת חלק בממשלות אחדות לזמנים מוגבלים במטרה לייצב את המערכת ולקדם סדר יום ממלכתי.",
      },
      {
        category: "משפט וממשל",
        title: "מאבק נגד שינויי משטר",
        description:
          "הובלת ושותפות למאבק ציבורי ופרלמנטרי נגד מהלכים שנתפסו כפגיעה באיזונים בין הרשויות.",
      },
      {
        category: "דת ומדינה",
        title: "שוויון בנטל",
        description:
          "קידום עמדות בעד שוויון בנטל הגיוס והשירות הציבורי בין קבוצות באוכלוסייה.",
      },
      {
        category: "חברה וכלכלה",
        title: "שירותים אזרחיים",
        description:
          "דחיפה לשיפור איכות השירותים האזרחיים ולייעול הממשק בין האזרח למדינה.",
      },
    ],
    futurePromisesItems: [
      {
        title: "קידום חוקה אזרחית",
        description:
          "גיבוש מסגרת חוקתית שתגדיר איזונים ברורים בין רשויות המדינה.",
      },
      {
        title: "הפרדת דת ומדינה",
        description: "קידום צעדים אזרחיים לצמצום השפעה דתית במרחב הציבורי.",
      },
      {
        title: "השקעה בחינוך ובריאות",
        description:
          "הגדלת משאבים לשירותים אזרחיים ושיפור איכות השירות לציבור.",
      },
      {
        title: "העמקת הקשר עם המערב",
        description: "חיזוק הבריתות המדיניות והכלכליות עם מדינות המערב.",
      },
    ],
    values: {
      type: "חילונית",
      security: "מרכז שמאל",
      economy: "מרכז",
      harediGov: "לא",
      arabGov: "חלקי",
      draftLaw: "בעד",
      shabbatTransportPolicy: "בעד",
      civilMarriageLaw: "בעד",
      chametzLaw: "נגד",
      overrideClause: "נגד",
      agSplitLaw: "נגד",
      broadcastingLaw: "נגד",
      reasonablenessCancellation: "נגד",
      freeEdu0to3: "בעד",
      higherEduSubsidyLaw: "בעד",
      rentControlLaw: "בעד",
      minWage7000: "בעד",
      deathPenaltyTerror: "נגד",
      terrorFamiliesDeportation: "נגד",
      sovereigntyJudeaSamaria: "נגד",
      ngoForeignFundingLaw: "נגד",
    },
  },
  {
    id: "mahaneLevi",
    name: "המחנה הממלכתי",
    leader: "בני גנץ",
    color: "#1e3a5f",
    mandates: 20,
    image: "/parties/mahaneLevi.png",
    members: [
      "גדי איזנקוט",
      "חילי טרופר",
      "פנינה תמנו-שטה",
      "מיכאל בירנבאום",
      "עופר שלח",
    ],
    vision:
      "החזון: ישראל מאוחדת, יציבה וממלכתית.\n\n" +
      'המפלגה שמה דגש על ה"ביחד" הישראלי. החזון שלה לעשור הקרוב הוא לבנות מחדש את המוסדות של המדינה (המשטרה, בתי המשפט, הכנסת) כך שכולם יבטחו בהם שוב. הם שואפים לביטחון שמבוסס על הסכמות רחבות, חיזוק ההתיישבות בנקודות אסטרטגיות, וניהול המדינה בצורה רגועה שמרכזת את הרוב המתון בעם.',
    recentActions: "",
    recentActionsItems: [
      {
        category: "משפט וממשל",
        title: "ממשלות אחדות בזמני חירום",
        description:
          "כניסה לממשלות אחדות בתקופות חירום ומשבר, מתוך ניסיון לרכז הנהגה רחבה ויציבה.",
      },
      {
        category: "ביטחון ומדיניות",
        title: "החלטות ביטחוניות",
        description:
          "השתתפות בקבלת החלטות ביטחוניות מהותיות במסגרת תפקידים ממשלתיים ובכנסת.",
      },
      {
        category: "משפט וממשל",
        title: "כוח מאזן בין מחנות",
        description:
          "ניסיון למצב את הסיעה כגשר וככוח מתון בין מחנות פוליטיים סוערים.",
      },
    ],
    futurePromisesItems: [
      {
        title: "חיזוק הממלכתיות והאחדות",
        description: "קידום שיח מאחד והפחתת קיטוב בין קבוצות בחברה הישראלית.",
      },
      {
        title: "שיקום האמון במוסדות",
        description: "חיזוק תפקוד הגופים הציבוריים ושיפור אמון הציבור במערכת.",
      },
      {
        title: "מדיניות ביטחונית אחראית",
        description:
          "קבלת החלטות ביטחוניות על בסיס מקצועי והסכמות רחבות ככל האפשר.",
      },
    ],
    values: {
      type: "חילונית",
      security: "מרכז ימין",
      economy: "מרכז",
      harediGov: "חלקי",
      arabGov: "חלקי",
      draftLaw: "בעד",
      shabbatTransportPolicy: "בעד",
      civilMarriageLaw: "בעד",
      chametzLaw: "נגד",
      overrideClause: "נגד",
      agSplitLaw: "נגד",
      broadcastingLaw: "נגד",
      reasonablenessCancellation: "נגד",
      freeEdu0to3: "בעד",
      higherEduSubsidyLaw: "בעד",
      rentControlLaw: "בעד",
      minWage7000: "בעד",
      deathPenaltyTerror: "בעד",
      terrorFamiliesDeportation: "בעד",
      sovereigntyJudeaSamaria: "נגד",
      ngoForeignFundingLaw: "בעד",
    },
  },
  {
    id: "shas",
    name: "ש״ס",
    leader: "אריה דרעי",
    color: "#006400",
    mandates: 11,
    image: "/parties/shas.png",
    members: [
      "משה ארבל",
      "יצחק כהן",
      "מיכאל מלכיאלי",
      "חיים ביטון",
      "יעקב מרגי",
    ],
    vision:
      "החזון: ישראל חברתית עם נשמה יהודית-ספרדית.\n\n" +
      "המפלגה רוצה שבעוד 10 שנים ישראל תהיה מדינה שדואגת קודם כל למי שאין לו – צדק חלוקתי שבו המשאבים הולכים לפריפריה ולשכבות החלשות. במקביל, המטרה היא לחזק את הזהות היהודית-מסורתית של המדינה ולתת מקום של כבוד למורשת של יהדות המזרח בכל תחומי החיים.",
    recentActions: "",
    recentActionsItems: [
      {
        category: "משפט וממשל",
        title: "השתתפות בקואליציה",
        description:
          "שותפות בממשלות ימין וקידום סעיפים בתקציב ובחקיקה בהתאם לסדר העדיפויות של המפלגה.",
      },
      {
        category: "חברה וכלכלה",
        title: "תקציבי רווחה",
        description:
          "קידום תקציבים למערכות רווחה ולשכבות מצוקה במסגרת המשא ומתן הקואליציוני.",
      },
      {
        category: "דת ומדינה",
        title: "חינוך חרדי",
        description:
          "הגדלת משאבים ותמיכה במערכת החינוך החרדי והמוסדות הקשורים אליה.",
      },
      {
        category: "חברה וכלכלה",
        title: "יוקר מחיה",
        description:
          "פעולות ממוקדות להפחתת נטל יוקר המחיה בתחומים חברתיים שנבחרו כעדיפות.",
      },
    ],
    futurePromisesItems: [
      {
        title: "הגדלת התמיכה בשכבות החלשות",
        description: "הרחבת מענקים, סיוע כלכלי ותוכניות רווחה למשפחות במצוקה.",
      },
      {
        title: "שמירה על צביון יהודי-מסורתי",
        description:
          "קידום חקיקה ומדיניות ציבורית התואמות ערכים דתיים-מסורתיים.",
      },
      {
        title: "הרחבת השירותים החברתיים",
        description:
          "חיזוק מערכי חינוך, רווחה ושירותים קהילתיים בפריפריה ובמרכז.",
      },
    ],
    values: {
      type: "חרדית",
      security: "ימין",
      economy: "שמאל כלכלי",
      harediGov: "כן",
      arabGov: "לא",
      draftLaw: "נגד",
      shabbatTransportPolicy: "נגד",
      civilMarriageLaw: "נגד",
      chametzLaw: "בעד",
      overrideClause: "בעד",
      agSplitLaw: "בעד",
      broadcastingLaw: "בעד",
      reasonablenessCancellation: "בעד",
      freeEdu0to3: "בעד",
      higherEduSubsidyLaw: "בעד",
      rentControlLaw: "בעד",
      minWage7000: "בעד",
      deathPenaltyTerror: "בעד",
      terrorFamiliesDeportation: "בעד",
      sovereigntyJudeaSamaria: "בעד",
      ngoForeignFundingLaw: "בעד",
    },
  },
  {
    id: "avoda",
    name: "העבודה",
    leader: "יאיר גולן",
    color: "#e30613",
    mandates: 18,
    image: "/parties/avoda.png",
    members: [
      "נעמה לזימי",
      "גלעד קריב",
      "אפרת רייטן",
      "עמירם לוין",
      "אורן חזן",
    ],
    vision:
      "החזון: ישראל כמדינת רווחה דמוקרטית ורודפת שלום.\n\n" +
      "המפלגה שואפת לחזור לישראל של שוויון חברתי עמוק – שבה הממשלה דואגת לבריאות, דיור וחינוך איכותי לכולם. בעשור הקרוב הם רוצים לראות מהלך אקטיבי לסיום הסכסוך עם הפלסטינים (פתרון שתי המדינות) כדי להציל את הדמוקרטיה הישראלית, ולהפוך את ישראל למקום שבו זכויות אדם וזכויות עובדים הן הערך העליון.",
    recentActions: "",
    recentActionsItems: [
      {
        category: "משפט וממשל",
        title: "ייצוג בכנסת",
        description:
          "שמירה על נוכחות פרלמנטרית ועל קול שמאלי-חברתי בזירה הפוליטית למרות תנודות בקואליציה.",
      },
      {
        category: "משפט וממשל",
        title: "מחאה על דמוקרטיה",
        description:
          "שותפות במחאות ציבוריות רחבות נגד מהלכים שנתפסו כפגיעה בדמוקרטיה ובזכויות אזרח.",
      },
      {
        category: "חברה וכלכלה",
        title: "מחאה חברתית",
        description:
          "השתתפות במחאות ובפעילות ציבורית סביב רווחה, שכבות חלשות וזכויות עובדים.",
      },
      {
        category: "משפט וממשל",
        title: "יציבות פוליטית",
        description:
          "התמודדות עם אתגרי הישרדות פוליטיים תוך ניסיון לשמור על זהות סיעתית ברורה.",
      },
    ],
    futurePromisesItems: [
      {
        title: "חיזוק מערכת הרווחה",
        description:
          "הגדלת רשת הביטחון החברתית ושיפור נגישות לשירותים חברתיים.",
      },
      {
        title: "קידום זכויות עובדים",
        description: "חיזוק ההגנה על תנאי העסקה, שכר הוגן וביטחון תעסוקתי.",
      },
      {
        title: "מהלך מדיני לסיום הסכסוך",
        description:
          "קידום יוזמות מדיניות להפחתת הסכסוך ושימור אופק להסדר ארוך טווח.",
      },
    ],
    values: {
      type: "חילונית",
      security: "שמאל",
      economy: "שמאל כלכלי",
      harediGov: "חלקי",
      arabGov: "כן",
      draftLaw: "בעד",
      shabbatTransportPolicy: "בעד",
      civilMarriageLaw: "בעד",
      chametzLaw: "נגד",
      overrideClause: "נגד",
      agSplitLaw: "נגד",
      broadcastingLaw: "נגד",
      reasonablenessCancellation: "נגד",
      freeEdu0to3: "בעד",
      higherEduSubsidyLaw: "בעד",
      rentControlLaw: "בעד",
      minWage7000: "בעד",
      deathPenaltyTerror: "נגד",
      terrorFamiliesDeportation: "נגד",
      sovereigntyJudeaSamaria: "נגד",
      ngoForeignFundingLaw: "נגד",
    },
  },
  {
    id: "yahadut",
    name: "יהדות התורה",
    leader: "יצחק גולדקנופף",
    color: "#000080",
    mandates: 8,
    image: "/parties/yahadut.png",
    members: ["משה גפני", "מאיר פרוש", "יעקב אשר", "ישראל אייכלר", "אורי מקלב"],
    vision:
      "החזון: ישראל שבה התורה היא מרכז החיים והקיום.\n\n" +
      "המפלגה רוצה להבטיח שבעוד 10 שנים עולם הישיבות ימשיך לגדול ללא הפרעה. המטרה היא לשמור על הסטטוס-קוו בענייני דת (שבת, כשרות, נישואין), להגן על החינוך החרדי העצמאי, ולדאוג שלציבור החרדי יהיו פתרונות למגורים ולתעסוקה שמתאימים לאורח החיים הדתי המחמיר.",
    recentActions: "",
    recentActionsItems: [
      {
        category: "משפט וממשל",
        title: "קואליציות ימין",
        description:
          "השתתפות בקואליציות הימין וקידום הסכמים קואליציוניים בהתאם לעמדות המפלגה.",
      },
      {
        category: "חברה וכלכלה",
        title: "תקציב לחינוך חרדי",
        description:
          "קידום תקציבים והטבות למערכת החינוך החרדי ולמוסדות לימוד תורניים.",
      },
      {
        category: "דת ומדינה",
        title: "סטטוס-קוו וחקיקה דתית",
        description:
          "שמירה על קו שמרני בחקיקה ובמדיניות הציבורית בתחומי דת, שבת וסטטוס-קוו.",
      },
    ],
    futurePromisesItems: [
      {
        title: "הרחבת התמיכה בעולם הישיבות",
        description: "הגדלת תקצוב מוסדות תורניים ושמירה על יציבותם הכלכלית.",
      },
      {
        title: "שמירה על סטטוס-קוו דתי",
        description: "המשך קידום מדיניות מסורתית בתחומי דת ומדינה.",
      },
      {
        title: "הגנה על אוטונומיית החינוך החרדי",
        description: "שימור עצמאות מוסדות החינוך החרדיים בתכנים ובניהול.",
      },
    ],
    values: {
      type: "חרדית",
      security: "ימין",
      economy: "שמאל כלכלי",
      harediGov: "כן",
      arabGov: "לא",
      draftLaw: "נגד",
      shabbatTransportPolicy: "נגד",
      civilMarriageLaw: "נגד",
      chametzLaw: "בעד",
      overrideClause: "בעד",
      agSplitLaw: "בעד",
      broadcastingLaw: "בעד",
      reasonablenessCancellation: "בעד",
      freeEdu0to3: "נגד",
      higherEduSubsidyLaw: "בעד",
      rentControlLaw: "בעד",
      minWage7000: "בעד",
      deathPenaltyTerror: "בעד",
      terrorFamiliesDeportation: "בעד",
      sovereigntyJudeaSamaria: "בעד",
      ngoForeignFundingLaw: "בעד",
    },
  },
];

export const leaders = [
  {
    id: "netanyahu",
    name: "בנימין נתניהו",
    party: "הליכוד",
    image: "/leaders/netanyahu.png",
    color: "#0066cc",
    vision:
      "חזון: שמירה על ישראל כמעצמה ביטחונית וכלכלית עם דגש על הרתעה, צמיחה וטיפוח בריתות אזוריות ובינלאומיות.",
    professionalBackground:
      'רקע מקצועי: שנים רבות בזירה המדינית והביטחונית, כולל כהונות רה"מ, שר אוצר, שגריר באו"ם ותפקידים בכירים בזירה הציבורית.',
    recentActions:
      "מה עשה בשנים האחרונות: הוביל ממשלות בתקופות של מתיחות ביטחונית, עימותים סביב מערכת המשפט, וניהול המשבר הכלכלי-חברתי שלאחר הקורונה והמלחמות האחרונות.",
    likudPromisesComparison:
      "הבטחות מול תוצאות (הליכוד): חלק מההבטחות התממשו (כמו הסכמי נורמליזציה וחיזוק יחסים בינלאומיים), אחרות נותרו במחלוקת ציבורית או לא יושמו במלואן, במיוחד בתחומי יוקר המחיה, משילות ומשבר הדיור.",
    values: {
      securityBg: 3,
      economicBg: 4,
      pressure: 5,
      brokenPromises: 4,
      consistency: 2,
      authority: 5,
      communication: 5,
      worldRelations: 4,
      criminal: "כתבי אישום פעילים",
      lifestyle: "יוקרתי",
    },
  },
  {
    id: "yair",
    name: "יאיר לפיד",
    party: "יש עתיד",
    image: "/leaders/yair.png",
    color: "#00a0dc",
    vision:
      "חזון: ישראל כדמוקרטיה ליברלית, חזקה ונקייה משחיתות, עם דגש על שוויון בנטל, שירות אזרחי או צבאי לכולם והפרדה חדה יותר בין דת למדינה.",
    professionalBackground:
      'רקע מקצועי: קריירה תקשורתית ארוכה, כיהן כשר אוצר וראש ממשלה לזמן מוגבל, ושימש כח"כ ויו"ר סיעה לאורך שנים.',
    recentActions:
      "מה עשה בשנים האחרונות: הנהיג את יש עתיד כאופוזיציה לממשלות שונות, עמד במרכז מחאות אזרחיות נגד שינויי משטר, והוביל ממשלת רוטציה קצרה שהתמקדה בעיקר בייצוב המערכת הפוליטית.",
    values: {
      securityBg: 1,
      economicBg: 2,
      pressure: 3,
      brokenPromises: 3,
      consistency: 3,
      authority: 2,
      communication: 5,
      worldRelations: 4,
      criminal: "ללא",
      lifestyle: "בינוני-גבוה",
    },
  },
  {
    id: "beni",
    name: "בני גנץ",
    party: "המחנה הממלכתי",
    image: "/leaders/beni.png",
    color: "#1e3a5f",
    vision:
      "חזון: ישראל מאוחדת ובטוחה עם הנהגה ממלכתית, שקטה ואחראית, המדגישה שיקום אמון הציבור במוסדות המדינה.",
    professionalBackground:
      'רקע מקצועי: רמטכ"ל לשעבר, תפקידים רבים בפיקוד הצבאי הבכיר, ובהמשך שר ביטחון וחבר קבינט מדיני-ביטחוני.',
    recentActions:
      "מה עשה בשנים האחרונות: הצטרף לממשלות אחדות בזמן משברים ביטחוניים, הוביל קו ממלכתי שניסה לגשר בין מחנות פוליטיים, והיה שחקן מרכזי בהחלטות ביטחוניות רגישות.",
    values: {
      securityBg: 5,
      economicBg: 2,
      pressure: 4,
      brokenPromises: 3,
      consistency: 3,
      authority: 3,
      communication: 3,
      worldRelations: 3,
      criminal: "ללא",
      lifestyle: "צנוע",
    },
  },
  {
    id: "arie",
    name: "אריה דרעי",
    party: "ש״ס",
    image: "/leaders/arie.png",
    color: "#006400",
    vision:
      "חזון: חיזוק הזהות המסורתית-ספרדית בישראל, הרחבת ההגנה החברתית לשכבות החלשות ושמירה על כוחו של הציבור החרדי במרחב הציבורי.",
    professionalBackground:
      'רקע מקצועי: שנים רבות בפוליטיקה כמנהיג ש"ס, כיהן במספר תפקידי שר, בהם שר הפנים ושר הכלכלה, לצד מעורבות ציבורית ארוכת שנים.',
    recentActions:
      'מה עשה בשנים האחרונות: הנהיג את ש"ס בתוך קואליציות ימין, קידם תקציבים וחקיקה המיטיבים עם הציבור החרדי והפריפריה, ופעל לשימור הסטטוס-קוו בענייני דת ומדינה.',
    values: {
      securityBg: 1,
      economicBg: 3,
      pressure: 4,
      brokenPromises: 4,
      consistency: 4,
      authority: 4,
      communication: 3,
      worldRelations: 2,
      criminal: "הרשעות קודמות",
      lifestyle: "יוקרתי",
    },
  },
  {
    id: "golan",
    name: "יאיר גולן",
    party: "העבודה",
    image: "/leaders/golan.png",
    color: "#e30613",
    vision:
      "חזון: ישראל דמוקרטית ושוויונית המבקשת פתרון מדיני לסכסוך, תוך חיזוק מוסדות המדינה והגנה על זכויות אדם ואזרח.",
    professionalBackground:
      'רקע מקצועי: קצין בכיר לשעבר בצה"ל, כולל תפקידים בדרג הפיקודי הבכיר, ובהמשך ח"כ ושר במערכת הפוליטית.',
    recentActions:
      "מה עשה בשנים האחרונות: בלט כקול ביטחוני-שמאלי, לקח חלק במחאה האזרחית ובשיח הציבורי סביב דמוקרטיה, והוביל את מפלגת העבודה לניסיון התחדשות.",
    values: {
      securityBg: 5,
      economicBg: 2,
      pressure: 4,
      brokenPromises: 1,
      consistency: 4,
      authority: 3,
      communication: 4,
      worldRelations: 3,
      criminal: "ללא",
      lifestyle: "צנוע",
    },
  },
  {
    id: "itshak",
    name: "יצחק גולדקנופף",
    party: "יהדות התורה",
    image: "/leaders/itshak.png",
    color: "#000080",
    vision:
      "חזון: שימור וחיזוק אורח החיים החרדי ומתן עדיפות לעולם התורה בתכנון מדיניות המדינה.",
    professionalBackground:
      "רקע מקצועי: הנהגה במוסדות חינוך ועמדות ניהול בציבור החרדי, ובהמשך כניסה לפוליטיקה הארצית והנהגת המפלגה.",
    recentActions:
      "מה עשה בשנים האחרונות: הוביל את יהדות התורה בשותפות לקואליציות ימין, קידם חקיקה ותקציבים למוסדות חרדיים ופעל לשמירה על הסטטוס-קוו בענייני דת.",
    values: {
      securityBg: 1,
      economicBg: 2,
      pressure: 3,
      brokenPromises: 2,
      consistency: 4,
      authority: 3,
      communication: 2,
      worldRelations: 1,
      criminal: "ללא",
      lifestyle: "צנוע",
    },
  },
];
