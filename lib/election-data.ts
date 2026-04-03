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
    title: "עמדות בנושאים ספציפיים",
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
    recentActions:
      "מה עשו בשנים האחרונות: הובילו ממשלות ימין ברצף, קידמו רפורמות במערכת המשפט והחקיקה, ניהלו סבבי לחימה מול ארגוני טרור, וכן טיפלו במשברים כלכליים ובחוסן האזרחי-ביטחוני.",
    futurePromises:
      "הבטחות לשנים הקרובות: חיזוק המשילות והביטחון, צמצום הבירוקרטיה, השקעה בתשתיות לאומיות והמשך חיזוק מעמד ישראל בזירה הבינלאומית.",
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
    ],
    vision:
      "החזון: ישראל כדמוקרטיה ליברלית, חילונית ומתקדמת.\n\n" +
      'המפלגה רוצה שבעוד עשור ישראל תהיה מדינה "נורמלית" ומודרנית, שבה יש שוויון בנטל (כולם מתגייסים או משרתים), הפרדה בין דת לפוליטיקה, ומערכת חינוך שמכינה את הצעירים לשוק העבודה העולמי. המטרה היא לשמור על ישראל יהודית ודמוקרטית דרך היפרדות מהפלסטינים וחיזוק המעמד של ישראל בעולם.',
    recentActions:
      "מה עשו בשנים האחרונות: לקחו חלק בממשלות אחדות קצרות, הובילו מאבק נגד שינויי משטר, ודחפו לקידום שוויון בנטל ושיפור השירותים האזרחיים.",
    futurePromises:
      "הבטחות לשנים הקרובות: קידום חוקה אזרחית, עיגון הפרדת דת ומדינה, השקעה במערכת החינוך והבריאות, והעמקת הקשר עם המערב.",
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
    recentActions:
      "מה עשו בשנים האחרונות: נכנסו לממשלות אחדות בזמני חירום, השתתפו בקבלת החלטות ביטחוניות משמעותיות, וניסו למצב את עצמם ככוח מאזן בין המחנות.",
    futurePromises:
      "הבטחות לשנים הקרובות: חיזוק הממלכתיות והאחדות, שיקום האמון במוסדות, ומדיניות ביטחונית אחראית על בסיס קונצנזוס רחב.",
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
    recentActions:
      "מה עשו בשנים האחרונות: השתתפו בממשלות ימין, קידמו תקציבים למערכות רווחה, חינוך חרדי והפחתת יוקר המחיה במוקדים חברתיים מסוימים.",
    futurePromises:
      "הבטחות לשנים הקרובות: הגדלת התמיכה בשכבות החלשות, שמירה על צביון יהודי-מסורתי בחקיקה ובמרחב הציבורי, והמשך הרחבת השירותים החברתיים.",
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
    recentActions:
      "מה עשו בשנים האחרונות: התמודדו עם אתגרי הישרדות פוליטיים, שמרו על ייצוג חברתי-שמאלי בכנסת, והיו שותפים למחאות ציבוריות רחבות על סוגיות דמוקרטיה ורווחה.",
    futurePromises:
      "הבטחות לשנים הקרובות: חיזוק מערכת הרווחה, קידום זכויות עובדים, והובלת מהלך מדיני לסיום הסכסוך.",
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
    recentActions:
      "מה עשו בשנים האחרונות: השתתפו בקואליציות ימין, קידמו תקציבים לחינוך החרדי ושמרו על מדיניות שמרנית בתחומי דת ומדינה.",
    futurePromises:
      "הבטחות לשנים הקרובות: הרחבת התמיכה בעולם הישיבות, שמירה על סטטוס-קוו דתי והגנה על אוטונומיית החינוך החרדי.",
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
