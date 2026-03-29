export type Language = "he" | "en";
export type Dir = "rtl" | "ltr";

export const DIR_MAP: Record<Language, Dir> = {
  he: "rtl",
  en: "ltr",
};

// ─── Hebrew ───────────────────────────────────────────────────────────────────
const he = {
  nav: {
    contactUs: "צרו קשר",
    langSwitcherLabel: "בחירת שפה",
  },

  hero: {
    sectionLabel: "דף ראשי",
    logoAlt: "לוגו פלטפורמת PIC",
    eyebrow: "המקום שבו אירועים מתעוררים לחיים",
    h1: ["יוצרים", "אירועים", "בקלות."] as [string, string, string],
    body: "הפלטפורמה המקיפה ביותר לחיבור בין מפיקים, ספקים וקהל. לתכנן, להזמין ולבצע - ללא פשרות.",
    ctaPrimary: "קבלו גישה מוקדמת",
    ctaSecondary: "גלו את הפלטפורמה",
  },

  problem: {
    eyebrow: "האתגר",
    h2: "הפקת אירועים היא תהליך שבור.",
    items: [
      {
        title: "הכל. בכל מקום. בבת אחת.",
        body: "מפיקים מתנהלים מול עשרות ספקים - באימיילים, וואטסאפ וגיליונות אלקטרוניים - ללא תמונה אחידה של מה שמאושר, מה ממתין, ומה עומד לקרוס.",
      },
      {
        title: "הזמן הוא המשאב היקר ביותר שלך.",
        body: "שעות של מרדף אחרי הצעות מחיר, אישורים ובריפים שנשלחים שוב ושוב - הן שעות שנגזלות מהאירוע עצמו. כל דקה בתיבת הדואר הנכנס היא דקה שלא על הבמה.",
      },
      {
        title: "אפס מקור אמת.",
        body: "לוגיסטיקה, לוחות זמנים וחוזים מפוזרים בין סילואים. כשמשהו נשבר - וזה קורה - אף אחד לא אחראי. האירוע משלם את המחיר.",
      },
    ],
  },

  solution: {
    eyebrow: "מיועד לכולם",
    h2: { part1: "פלטפורמה אחת.", accent: "כל הצדדים." },
    body: "ממפגשים אינטימיים ועד הפקות ענק - המקום שבו כולם נפגשים.",
    columns: [
      {
        role: "מפיקים",
        quote:
          "נהגתי לבזבז ימים שלמים על שיחות אינסופיות ותוהו ובוהו בוואטסאפ. עכשיו הכל רץ ממקום אחד - ואני אפילו נהנה מהתהליך.",
        bullets: [
          "מרעיון לאירוע: מקונספט לאוויר תוך דקות, לא ימים.",
          "רשת מאומתת: גישה מיידית לספקים שאפשר לסמוך עליהם.",
          "שליטה מלאה: משימות, לוח זמנים ותקציב - בדשבורד אחד.",
          "אפס רעש: כל התקשורת מסודרת. לא נופל כלום בין הכיסאות.",
          "תשלומים בלי כאב ראש: שלם לספקים בצורה מאובטחת, בתנאים שלך.",
        ],
      },
      {
        role: "ספקים",
        quote:
          "אני ברמה הכי גבוהה במה שאני עושה. עם PIC, הלקוחות הנכונים מוצאים אותי - לא להפך.",
        bullets: [
          "פרופיל פרמיום: ויטרינה מקצועית שמוכרת בשבילך.",
          "ליידים מדויקים: להיות ממוּצא עם לקוחות שמתאימים לנישה ולתקציב שלך.",
          "הזמנה מיידית: נהל את היומן שלך והיגייר בזמן אמת.",
          "מנוע מוניטין: ביקורות מאומתות שבונות אמינות אמיתית.",
          "גישה ישירה: עבוד עם לקוחות ישירות - ללא מתווכים, ללא קיצוץ בשוליים.",
        ],
      },
      {
        role: "קהל",
        quote: "לא לפספס אף אירוע שזז לך את הנשמה.",
        bullets: [
          "גלה אירועים שנבחרו בדיוק בשבילך",
          "כרטוס מאובטח וחסר חיכוך",
          "הישאר לפני כולם",
          "גישה בלעדית ודרופים ראשונים",
        ],
      },
    ],
  },

  uniqueValue: {
    eyebrow: "הייחודיות שלנו",
    h2: { part1: "הראשון", accent: "מסוגו." },
    tagline: "מפיקים · ספקים · חובבי אירועים",
    features: [
      {
        title: "התאמה חכמה",
        body: "עצור את הגרינד הידני. מנוע ההתאמה שלנו מחבר בין מפיקים לספקים המאומתים הטובים ביותר - מסוננים לפי תקציב, סגנון וזמינות. מיידית.",
      },
      {
        title: "שליטה טוטאלית",
        body: "דשבורד אחד לנהל הכל. ניהול משימות, צ׳אט צוות ותשלומים מאובטחים - כל חלק נע במקום אחד.",
      },
      {
        title: "כרטוס ללא מאמץ",
        body: "הפעל מערכת כרטוס מלאה תוך שניות. הגדר טיירים, עקוב אחר מכירות בזמן אמת, ותן לאורחים חוויית קופה שלא ישכחו.",
      },
    ],
  },

  process: {
    eyebrow: "התהליך",
    h2: { part1: "פשוט.", accent: "מהיר.", part2: "חכם." },
    steps: [
      {
        title: "הרשמה",
        body: "הפרופיל שלך, בדרך שלך: הירשם כמפיק או ספק והצטרף לרשת מקצועית שנבנתה לתעשייה - תוך דקות.",
      },
      {
        title: "התקנה",
        body: "בנה את הבסיס: הגדר את דשבורד האירועים המותאם אישית שלך או העלה את תיק העבודות שלך. התחל להציג את עצמך מיידית.",
      },
      {
        title: "חיבור",
        body: "מצא את ההתאמה המושלמת: עיין ברשת מאומתת של ספקים ברמה גבוהה - מסוננים בדיוק לפי היקף האירוע, התקציב והאסתטיקה שלך.",
      },
      {
        title: "השקה",
        body: "מצוינות שמסופקת: האירוע עולה לאוויר. מפיקים מנהלים הפקה מנוהלת לחלוטין. ספקים מקבלים הזמנות ותשלום בצורה מאובטחת. כל פרט מתועד. כל שלב חלק.",
      },
    ],
  },

  leadCapture: {
    eyebrow: "גישה מוקדמת",
    h2: { part1: "היו הראשונים", accent: "לדעת." },
    body: "הפלטפורמה פועלת. הצטרפו לקהילת PIC והיו מהראשונים לחוות אותה.",
    roles: { producer: "מפיק אירועים", vendor: "נותן שירות" },
    submit: { idle: "הצטרפו לרשימה", loading: "שולח…" },
    success: {
      heading: "אתם ברשימה.",
      body: "ניצור קשר כשהגישה המוקדמת תיפתח. עקבו אחרי תיבת הדואר שלכם.",
    },
    disclaimer: "ללא ספאם. ללא התחייבויות. רק גישה מוקדמת.",
    emailPlaceholder: "your@email.com",
    errorFallback: "משהו השתבש. נסו שוב.",
  },

  transitionBar: {
    eyebrow: "המצב הנוכחי",
    statementPart1: "תכנון אירוע היום מסובך, גוזל זמן, ומפוזר על פני יותר מדי פלטפורמות,",
    punchline: "עכשיו זה פשוט.",
  },

  footer: {
    copyright: "PIC · אירועים ומסיבות · זכויות יוצרים 2026 ©",
    craftedBy: "נבנה באהבה ❤️ על ידי",
    logoAlt: "לוגו PIC",
  },

  accessibility: {
    widget: {
      header: "אפשרויות נגישות",
      largeText: "הגדלת טקסט",
      highContrast: "ניגודיות גבוהה",
      grayscale: "גווני אפור",
      statementLink: "הצהרת נגישות",
      openMenu: "פתח תפריט נגישות",
      closeMenu: "סגור תפריט נגישות",
    },
    statement: {
      eyebrow: "נגישות",
      pageTitle: "הצהרת נגישות",
      badge: "AA",
      lastUpdated: "עודכן לאחרונה: מרץ 2025",
      standardDesc:
        "אתר זה עומד בדרישות התקן הישראלי 5568 (המבוסס על WCAG 2.1) ברמה AA.",
      backLink: "חזרה לדף הבית ←",
      sections: {
        whatIsA11y: {
          title: "מהי נגישות דיגיטלית?",
          body: "נגישות דיגיטלית משמעה שאנשים עם מוגבלויות - לרבות לקויות ראייה, שמיעה, מוטוריקה וקוגניציה - יכולים להשתמש באתר באופן מלא ועצמאי. אנו מחויבים לכך לא רק מבחינה חוקית, אלא מתוך ערך עמוק של הכלה.",
        },
        standards: {
          title: "עמידה בתקן",
          intro:
            "אתר זה נבנה בהתאם לתקן ישראלי 5568 ברמה AA, הכולל את ההנחיות הבאות:",
          principles: [
            { term: "ניתן לתפיסה",  desc: "ניתן להציג את התוכן בדרכים שונות ללא אובדן מידע" },
            { term: "ניתן לתפעול", desc: "ניתן להשתמש באתר עם מקלדת בלבד" },
            { term: "ניתן להבנה",  desc: "התוכן ברור והתנהגות האתר צפויה" },
            { term: "רובוסטי",     desc: "האתר תואם לטכנולוגיות עזר מובילות" },
          ],
        },
        accommodations: {
          title: "התאמות שביצענו",
          items: [
            { term: "ניווט מלא במקלדת",      desc: "כל האלמנטים האינטראקטיביים נגישים דרך Tab / Enter / Escape. סדר ה-Tab עוקב אחרי המבנה הלוגי של הדף." },
            { term: "תפריט נגישות צף",       desc: "כפתור הנגישות בפינת המסך מאפשר הגדלת טקסט, ניגודיות גבוהה ומצב גווני אפור. ההעדפות נשמרות לביקור הבא." },
            { term: "חלופות טקסט",           desc: "כל תמונה ואייקון כולל תיאור טקסטואלי (alt / aria-label) לשימוש עם קוראי מסך." },
            { term: "יחסי ניגודיות צבעים",  desc: "כל הצבעים עומדים ביחס ניגודיות מינימלי של 4.5:1 לטקסט רגיל ו-3:1 לטקסט גדול." },
            { term: "מבנה סמנטי",           desc: "כל הכותרות, הכפתורים, הטפסים והאזורים מוגדרים עם תגיות HTML סמנטיות ותפקידי ARIA." },
            { term: "תמיכה ב-RTL",           desc: "האתר בנוי עם תמיכה מלאה בכיוון קריאה מימין לשמאל, כולל סדר Tab ופריסה." },
            { term: "צמצום תנועה",           desc: "האתר מכבד את הגדרת prefers-reduced-motion של מערכת ההפעלה ומציע גם מתג ידני בתפריט הנגישות." },
          ],
        },
        assistiveTech: {
          title: "טכנולוגיות עזר נתמכות",
          intro: "האתר נבדק ותוכנן לעבוד עם:",
          tools: [
            "NVDA + Firefox (Windows)",
            "VoiceOver + Safari (macOS / iOS)",
            "TalkBack (Android)",
            "ניווט במקלדת בלבד - Chrome, Firefox, Safari, Edge",
          ],
        },
        limitations: {
          title: "מגבלות ידועות",
          body: "אנו שואפים לנגישות מלאה ומשקיעים בשיפור מתמיד. תוכן שנוצר על ידי צדדים שלישיים (כגון טפסים חיצוניים) עשוי שלא לעמוד עדיין בכל דרישות התקן. אנו פועלים לטפל בממצאים אלה בהקדם האפשרי.",
        },
        contact: {
          title: "פנייה לרכז הנגישות",
          intro: "מצאת בעיית נגישות? יש לך שאלה או בקשה? נשמח לשמוע ולתקן בהקדם.",
          coordinatorLabel: "רכז הנגישות:",
          emailLabel: "דוא״ל:",
          responseTime: "אנו מחויבים להגיב לכל פנייה תוך 5 ימי עסקים.",
        },
      },
    },
  },
} as const;

// ─── English ──────────────────────────────────────────────────────────────────
const en = {
  nav: {
    contactUs: "Contact Us",
    langSwitcherLabel: "Language selection",
  },

  hero: {
    sectionLabel: "Hero",
    logoAlt: "PIC - Parties & Events Platform logo",
    eyebrow: "Where Events Come to Life",
    h1: ["Create", "Events", "Easily."] as [string, string, string],
    body: "The all-in-one platform where producers, vendors, and audiences connect. Plan, book, and execute - flawlessly.",
    ctaPrimary: "Get Early Access",
    ctaSecondary: "Explore Platform",
  },

  problem: {
    eyebrow: "The Challenge",
    h2: "Event Production is Broken.",
    items: [
      {
        title: "Everything. Everywhere. All at Once.",
        body: "Producers juggle dozens of vendors across email threads, WhatsApp groups, and spreadsheets - with no unified view of what's confirmed, what's pending, or what's about to fall through.",
      },
      {
        title: "Time Is Your Most Expensive Resource.",
        body: "Hours spent chasing quotes, hunting confirmations, and resending briefs are hours stolen from the event itself. Every minute in your inbox is a minute not on stage.",
      },
      {
        title: "Zero Single Source of Truth.",
        body: "Logistics, timelines, and contracts are scattered across silos. When something breaks - and it will - no one owns the problem. The event pays the price.",
      },
    ],
  },

  solution: {
    eyebrow: "Built for Everyone",
    h2: { part1: "One Platform.", accent: "All Sides." },
    body: "From intimate gatherings to stadium-scale productions - the place where producers, vendors, and attendees converge.",
    columns: [
      {
        role: "Producers",
        quote:
          "I used to lose days to calls and chaos. Now everything runs from one place - and I actually enjoy the process.",
        bullets: [
          "Idea to Event: From concept to live in minutes, not days.",
          "Verified Network: Instant access to pre-vetted vendors you can actually trust.",
          "Full Visibility: Tasks, timeline, and budget - all on one dashboard.",
          "Zero Noise: All communications organized. Nothing slips through.",
          "Seamless Payments: Pay vendors securely, on your terms.",
        ],
      },
      {
        role: "Vendors",
        quote:
          "I'm world-class at what I do. With PIC, the right clients find me - not the other way around.",
        bullets: [
          "Premium Profile: A professional showcase that does the selling for you.",
          "Qualified Leads: Get matched with clients who fit your niche and rate.",
          "Instant Booking: Manage your calendar and get hired in real time.",
          "Reputation Engine: Verified reviews that build lasting credibility.",
          "Direct Access: Work with clients directly - no middlemen, no margin cuts.",
        ],
      },
      {
        role: "Attendees",
        quote: "Never miss the events that move you.",
        bullets: [
          "Discover events curated to your taste",
          "Secure, frictionless ticketing",
          "Stay ahead of what's coming",
          "Exclusive drops and first-access passes",
        ],
      },
    ],
  },

  uniqueValue: {
    eyebrow: "Our Uniqueness",
    h2: { part1: "The First", accent: "of Its Kind." },
    tagline: "Producers · Vendors · Party People",
    features: [
      {
        title: "Smart Sourcing",
        body: "Stop the manual grind. Our matching engine connects producers with top verified vendors - filtered by budget, style, and availability. Instantly.",
      },
      {
        title: "Total Control",
        body: "One dashboard to run them all. Task management, team messaging, secure payments - every moving part, in one place.",
      },
      {
        title: "Effortless Ticketing",
        body: "Launch a full ticketing operation in seconds. Set tiers, track sales live, and give guests a checkout experience worth remembering.",
      },
    ],
  },

  process: {
    eyebrow: "The Process",
    h2: { part1: "Simple.", accent: "Fast.", part2: "Smart." },
    steps: [
      {
        title: "Register",
        body: "Your profile, your way: Sign up as a Producer or Vendor and join a professional network built for the industry - in minutes.",
      },
      {
        title: "Set Up",
        body: "Build your foundation: Configure your event dashboard or upload your portfolio. Start showcasing your work immediately.",
      },
      {
        title: "Connect",
        body: "Find your perfect match: Browse a verified network of top-tier vendors - filtered precisely to your event's scope, budget, and aesthetic.",
      },
      {
        title: "Launch",
        body: "Excellence, delivered: The event goes live. Producers run a fully managed production. Vendors get booked and paid securely. Every detail documented. Every step seamless.",
      },
    ],
  },

  leadCapture: {
    eyebrow: "Early Access",
    h2: { part1: "Be the First", accent: "to Know." },
    body: "The platform is live. Join the PIC community and be among the first to experience it.",
    roles: { producer: "Event Producer", vendor: "Service Provider" },
    submit: { idle: "Join the List", loading: "Sending…" },
    success: {
      heading: "You're on the list.",
      body: "We'll be in touch when your access opens. Keep an eye on your inbox.",
    },
    disclaimer: "No spam. No commitments. Just early access.",
    emailPlaceholder: "your@email.com",
    errorFallback: "Something went wrong. Please try again.",
  },

  transitionBar: {
    eyebrow: "The Current Situation",
    statementPart1: "Planning an event today is complicated, time consuming, and spread across too many platforms,",
    punchline: "Now it's simple.",
  },

  footer: {
    copyright: "PIC · Parties & Events Platform · Copyright 2026 ©",
    craftedBy: "Crafted with ❤️ by",
    logoAlt: "PIC Platform logo",
  },

  accessibility: {
    widget: {
      header: "Accessibility Options",
      largeText: "Large Text",
      highContrast: "High Contrast",
      grayscale: "Grayscale",
      statementLink: "Accessibility Statement",
      openMenu: "Open accessibility menu",
      closeMenu: "Close accessibility menu",
    },
    statement: {
      eyebrow: "Accessibility",
      pageTitle: "Accessibility Statement",
      badge: "AA",
      lastUpdated: "Last updated: March 2025",
      standardDesc:
        "This website meets the requirements of Israeli Standard 5568 (based on WCAG 2.1) at level AA.",
      backLink: "← Back to Home",
      sections: {
        whatIsA11y: {
          title: "What is Digital Accessibility?",
          body: "Digital accessibility means that people with disabilities - including visual, auditory, motor, and cognitive impairments - can use the website fully and independently. We are committed to this not only legally, but from a deep value of inclusion.",
        },
        standards: {
          title: "Standard Compliance",
          intro:
            "This website was built in accordance with Israeli Standard 5568 at level AA, including the following guidelines:",
          principles: [
            { term: "Perceivable", desc: "Content can be presented in different ways without loss of information" },
            { term: "Operable",    desc: "The website can be used with keyboard only" },
            { term: "Understandable", desc: "Content is clear and behavior is predictable" },
            { term: "Robust",     desc: "The website is compatible with leading assistive technologies" },
          ],
        },
        accommodations: {
          title: "Accommodations We've Made",
          items: [
            { term: "Full Keyboard Navigation",    desc: "All interactive elements are accessible via Tab / Enter / Escape. The Tab order follows the logical structure of the page." },
            { term: "Floating Accessibility Menu", desc: "The accessibility button in the corner of the screen enables text enlargement, high contrast, and grayscale mode. Preferences are saved for the next visit." },
            { term: "Text Alternatives",           desc: "Every image and icon includes a textual description (alt / aria-label) for use with screen readers." },
            { term: "Color Contrast Ratios",       desc: "All colors meet a minimum contrast ratio of 4.5:1 for regular text and 3:1 for large text." },
            { term: "Semantic Structure",          desc: "All headings, buttons, forms, and regions are defined with semantic HTML tags and ARIA roles." },
            { term: "RTL Support",                 desc: "The website is built with right-to-left support, including reading direction, Tab order, and layout." },
            { term: "Reduced Motion",              desc: "The website respects the operating system's prefers-reduced-motion setting and also offers a manual toggle in the accessibility menu." },
          ],
        },
        assistiveTech: {
          title: "Supported Assistive Technologies",
          intro: "The website has been tested and designed to work with:",
          tools: [
            "NVDA + Firefox (Windows)",
            "VoiceOver + Safari (macOS / iOS)",
            "TalkBack (Android)",
            "Keyboard-only navigation - Chrome, Firefox, Safari, Edge",
          ],
        },
        limitations: {
          title: "Known Limitations",
          body: "We strive for full accessibility and invest in continuous improvement. Content created by third parties (such as external forms) may not yet meet all standard requirements. We are working to address these findings as quickly as possible.",
        },
        contact: {
          title: "Contact the Accessibility Coordinator",
          intro: "Found an accessibility issue? Have a question or request? We'd love to hear from you and fix it quickly.",
          coordinatorLabel: "Accessibility Coordinator:",
          emailLabel: "Email:",
          responseTime: "We are committed to responding to every inquiry within 5 business days.",
        },
      },
    },
  },
} as const;

// ─── Exports ──────────────────────────────────────────────────────────────────
export const translations = { he, en } as const;

/** Union of both translation objects - use this as the type for `t`. */
export type TranslationSet = typeof translations[Language];
