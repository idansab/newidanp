const PLACES = [
  {
    id: "1",
    name: "נחל הקישון",
    category: "nature",
    region: "עמק יזרעאל",
    saturdayOpen: true,
    icon: "tree",
    emoji: "🌊",
    image: "/assets/uploads/1789259482492-Gemini_Generated_Image_2pqxa92pqxa92pqx.jpg",
    imageAlt: "נחל הקישון - מסלול הליכה",
    location: {
    lat: 32.6543,
    lng: 35.1234,
    address: "עמק יזרעאל"
  },
    description: {
    short: "מסלול הליכה קליל לאורך נחל זורם, מוצל ונעים",
    full: "נחל הקישון הוא מסלול הליכה קליל לאורך נחל זורם. המסלול מוצל ברובו, מתאים למשפחות עם ילדים קטנים, וכולל פינות ישיבה ומנגלים."
  },
    hours: {
    type: "24/7",
    note: "שטח פתוח"
  },
    cost: {
    level: "free",
    price: 0,
    label: "חינם"
  },
    distance: 5.2,
    rating: 4.5,
    reviews: 23,
    duration: "1-2 שעות",
    amenities: {
    restrooms: true,
    parking: true,
    shade: true,
    picnic: true,
    water: false,
    wheelchair: false,
    dogs: true,
    bbq: true,
    swimming: true,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "מים",
    "צל",
    "חינם",
    "משפחתי",
    "פיקניק"
  ],
    tips: [
    {
      text: "תגיעו לפני 10 בבוקר בשבת, אחרת החניה מלאה",
      author: "מיכל"
    },
    {
      text: "קחו נעליים להחלפה, המים מגיעים עד הברכיים",
      author: "דני"
    },
    {
      text: "יש מסלול קצר של 20 דקות למי שלא רוצה ללכת הרבה",
      author: "שירה"
    }
  ],
    personalReview: {
    text: "מקום מדהים למשפחה — לקחנו את הילדים והכול היה מושלם",
    author: "עידן"
  },
    address: "עמק יזרעאל",
    phone: "",
    lat: 32.6543,
    lng: 35.1234,
    updatedAt: "2026-09-13T00:31:24.007Z"
  },
  {
    id: "2",
    name: "קפה גרג - עפולה",
    category: "food",
    region: "עפולה",
    saturdayOpen: true,
    icon: "coffee",
    emoji: "☕",
    image: "assets/foodt/food.png",
    imageAlt: "קפה גרג - אווירה נעימה",
    location: {
    lat: 32.61,
    lng: 35.29,
    address: "שדרות ארלוזורוב 12, עפולה"
  },
    description: {
    short: "בית קפה שקט עם אווירה נעימה וקפה מעולה",
    full: "קפה גרג הוא בית קפה שכונתי עם אווירה חמה ומזמינה. המקום מציע קפה איכותי, מאפים טריים, כריכים וסלטים. בשבת יש בראנץ' מיוחד.!!!"
  },
    hours: {
    type: "24/7",
    note: "א'-ה' 07:00-22:00, ו' 07:00-15:00, ש' 09:00-23:00"
  },
    cost: {
    level: "medium",
    price: 50,
    label: "₪₪"
  },
    distance: 2.1,
    rating: 4.2,
    reviews: 45,
    duration: "30-60 דקות",
    amenities: {
    restrooms: true,
    parking: true,
    shade: true,
    picnic: false,
    water: true,
    wheelchair: true,
    dogs: true,
    bbq: false,
    swimming: false,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: true
  },
    tags: [
    "קפה",
    "דייט",
    "וייפי",
    "מאפים"
  ],
    tips: [
    {
      text: "העוגת גבינה שלהם מדהימה!",
      author: "רונית"
    },
    {
      text: "בשבת בבוקר יש בראנץ' שווה",
      author: "יואב"
    }
  ],
    personalReview: {
    text: "הקפה, והאווירה מושלמת לעבודה מהמחשב",
    author: "תמי"
  },
    address: "שדרות ארלוזורוב 12, עפולה",
    phone: "",
    lat: 32.61,
    lng: 35.29,
    updatedAt: "2026-09-13T00:19:05.657Z"
  },
  {
    id: 3,
    name: "פארק העמק",
    category: "family",
    region: "עמק יזרעאל",
    saturdayOpen: true,
    icon: "users",
    emoji: "🎪",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    imageAlt: "פארק העמק - משחקים ומדשאות",
    location: {
    lat: 32.63,
    lng: 35.25,
    address: "כביש 65, ליד צומת העמק"
  },
    description: {
    short: "פארק גדול עם מתקני משחק, מדשאות ושבילי הליכה",
    full: "פארק העמק הוא פארק גדול ומטופח הכולל מתקני משחק לילדים, מדשאות רחבות, שבילי הליכה ואופניים, בריכה אקולוגית, ופינות ישיבה מוצלות."
  },
    hours: {
    type: "weekly",
    note: "א'-ה' 06:00-21:00, ו' 06:00-14:00, ש' 06:00-21:00"
  },
    cost: {
    level: "free",
    price: 0,
    label: "חינם"
  },
    distance: 4.8,
    rating: 4.7,
    reviews: 67,
    duration: "1-3 שעות",
    amenities: {
    restrooms: true,
    parking: true,
    shade: true,
    picnic: true,
    water: true,
    wheelchair: true,
    dogs: true,
    bbq: true,
    swimming: false,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: true
  },
    tags: [
    "משחקים",
    "מדשאות",
    "חינם",
    "משפחתי",
    "אופניים"
  ],
    tips: [
    {
      text: "יש מתקן משחק חדש ליד הבריכה האקולוגית",
      author: "עדי"
    },
    {
      text: "בערב יש שקיעה מטורפת מהגבעה",
      author: "נועם"
    }
  ],
    personalReview: {
    text: "הילדים לא רצו לזוז משם — חצי יום פיקניק מושלם",
    author: "אור"
  }
  },
  {
    id: 4,
    name: "שמורת נחל השבעה",
    category: "nature",
    region: "עמק יזרעאל",
    saturdayOpen: true,
    icon: "tree",
    emoji: "🌿",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    imageAlt: "שמורת נחל השבעה - טבע ומים",
    location: {
    lat: 32.68,
    lng: 35.18,
    address: "נחל השבעה, עמק יזרעאל"
  },
    description: {
    short: "שמורת טבע יפה עם מסלול מים וצל",
    full: "שמורת נחל השבעה היא פנינה טבעית בעמק יזרעאל. המסלול עובר לאורך נחל זורם עם מים צלולים, צמחייה עשירה, וצל רב."
  },
    hours: {
    type: "24/7",
    note: "שטח פתוח"
  },
    cost: {
    level: "free",
    price: 0,
    label: "חינם"
  },
    distance: 8.3,
    rating: 4.8,
    reviews: 34,
    duration: "1-2 שעות",
    amenities: {
    restrooms: false,
    parking: true,
    shade: true,
    picnic: true,
    water: true,
    wheelchair: false,
    dogs: true,
    bbq: false,
    swimming: true,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "מים",
    "צל",
    "חינם",
    "טבע",
    "קיץ"
  ],
    tips: [
    {
      text: "אין שירותים - תתארגנו בהתאם",
      author: "מאיה"
    },
    {
      text: "המסלול הקצר מתאים גם לסבתות וסבים",
      author: "אבי"
    }
  ],
    personalReview: {
    text: "שקט, מרגש, ומלא בטבע — מומלץ בבוקר",
    author: "רנה"
  }
  },
  {
    id: 5,
    name: "עמק סנטר- עפולה",
    category: "shopping",
    region: "עפולה",
    saturdayOpen: true,
    icon: "shopping-bag",
    emoji: "🛍️",
    image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80",
    imageAlt: "עמק סנטר - חנויות ואוכל",
    location: {
    lat: 32.605,
    lng: 35.285,
    address: "שדרות י צחק רבין 18, עפולה"
  },
    description: {
    short: "מתחם גדול עם חנויות, בתי קפה ומתחם אוכל",
    full: "עמק סנטר עפולה הוא מתחם הגדול באזור. יש בו מגוון חנויות אופנה, נעליים, אלקטרוניקה, מתחם אוכל גדול, בתי קפה, וגם קולנוע."
  },
    hours: {
    type: "weekly",
    note: "א'-ה' 09:00-21:00, ו' 09:00-15:00, ש' 10:00-21:00"
  },
    cost: {
    level: "medium",
    price: 80,
    label: "₪₪"
  },
    distance: 3.5,
    rating: 4.1,
    reviews: 89,
    duration: "1-3 שעות",
    amenities: {
    restrooms: true,
    parking: true,
    shade: false,
    picnic: false,
    water: true,
    wheelchair: true,
    dogs: false,
    bbq: false,
    swimming: false,
    store: true
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: true
  },
    tags: [
    "קניות",
    "קולנוע",
    "אוכל",
    "משפחתי",
    "מזגן"
  ],
    tips: [
    {
      text: "בחמישי יש הנחה 20% בחנויות נבחרות",
      author: "ליאת"
    }
  ],
    personalReview: {
    text: "מקום מושלם ליום גשום — הכל תחת גג אחד",
    author: "דן"
  }
  },
  {
    id: 6,
    name: "מוזיאון העמק",
    category: "culture",
    region: "עמק יזרעאל",
    saturdayOpen: false,
    icon: "palette",
    emoji: "🏛️",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=800&q=80",
    imageAlt: "מוזיאון העמק - תערוכות ואירועים",
    location: {
    lat: 32.642,
    lng: 35.21,
    address: "מרכז תרבות, עמק יזרעאל"
  },
    description: {
    short: "מוזיאון קטן עם תערוכות קבועות ומעורבות חוויתיות",
    full: "מוזיאון העמק מציג תולדות האזור דרך תערוכות אינטראקטיביות, סרטי מדיה ואובייקטים קולקטיביים. מתאים לבני משפחות וליום cultural rainy."
  },
    hours: {
    type: "weekly",
    note: "א'-ה' 09:00-17:00, ש' 10:00-16:00"
  },
    cost: {
    level: "cheap",
    price: 25,
    label: "₪"
  },
    distance: 6.7,
    rating: 4.4,
    reviews: 31,
    duration: "1-2 שעות",
    amenities: {
    restrooms: true,
    parking: true,
    shade: true,
    picnic: false,
    water: true,
    wheelchair: true,
    dogs: false,
    bbq: false,
    swimming: false,
    store: true
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: true
  },
    tags: [
    "תרבות",
    "מוזיאון",
    "ילדים",
    "גשם"
  ],
    tips: [
    {
      text: "בכניסה יש הדרכת חינם לבתי ספר",
      author: "יעל"
    }
  ],
    personalReview: {
    text: "תערוכת העבר מתאימה גם לקטנים — חוויה משפחתית",
    author: "הדר"
  }
  },
  {
    id: 7,
    name: "מרכז ספורט אולימפיה",
    category: "sports",
    region: "עפולה",
    saturdayOpen: true,
    icon: "activity",
    emoji: "🏟️",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "מרכז ספורט אולימפיה - מגרשים ובריכה",
    location: {
    lat: 32.6175,
    lng: 35.279,
    address: "רחוב הספורט 5, עפולה"
  },
    description: {
    short: "מרכז ספורט עם מגרשים, בריכה וחדרי כושר",
    full: "מרכז אולימפיה מציע מגרשים למגן, כדורסל, כדורגל, בריכה לילדים, חוגי כושר, ומגוון פעילויות קבוצתיות."
  },
    hours: {
    type: "weekly",
    note: "א'-ה' 06:30-23:00, ו' 08:00-14:00, ש' 08:00-22:00"
  },
    cost: {
    level: "medium",
    price: 60,
    label: "₪₪"
  },
    distance: 3,
    rating: 4.3,
    reviews: 52,
    duration: "1-3 שעות",
    amenities: {
    restrooms: true,
    parking: true,
    shade: false,
    picnic: false,
    water: true,
    wheelchair: true,
    dogs: false,
    bbq: false,
    swimming: true,
    store: true
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "ספורט",
    "בריכה",
    "ילדים",
    "משפחתי"
  ],
    tips: [
    {
      text: "יש מנוי יומי זול יותר",
      author: "עומר"
    }
  ],
    personalReview: {
    text: "בריכה נעימה ומגרשים מעולים — מגיעים בשעות הערב",
    author: "ניר"
  }
  },
  {
    id: 8,
    name: "גלריה ArtBeat - נהריה",
    category: "culture",
    region: "נהריה",
    saturdayOpen: true,
    icon: "palette",
    emoji: "🎨",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    imageAlt: "גלריה ArtBeat - אמנות מקומית",
    location: {
    lat: 32.56,
    lng: 35.12,
    address: "שדרות ההשכלה 12, נהריה"
  },
    description: {
    short: "גלריה יפה עם אמנות מקומית ומעורבות יצירתית",
    full: "גלריה ArtBeat מציגה אמנים מהאזור, סדנאות יצירה והופעות חיות קטנות. אווירה רכה ונעימה, מתאים לצעירים ומשפחות."
  },
    hours: {
    type: "weekly",
    note: "א'-ה' 10:00-18:00, ש' 10:00-14:00"
  },
    cost: {
    level: "cheap",
    price: 20,
    label: "₪"
  },
    distance: 11.4,
    rating: 4.6,
    reviews: 19,
    duration: "1-2 שעות",
    amenities: {
    restrooms: true,
    parking: true,
    shade: true,
    picnic: false,
    water: true,
    wheelchair: true,
    dogs: false,
    bbq: false,
    swimming: false,
    store: true
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: true
  },
    tags: [
    "תרבות",
    "אמנות",
    "יצירה",
    "ילדים"
  ],
    tips: [
    {
      text: "ביום שישי יש כניסה חינם",
      author: "תמר"
    }
  ],
    personalReview: {
    text: "סדנאות האומנות הן חוויה משפחתית מדהימה",
    author: "ענת"
  }
  },
  {
    id: 29,
    name: "נחל סעדיה",
    category: "nature",
    region: "חיפה",
    saturdayOpen: true,
    icon: "tree",
    emoji: "🌊",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    imageAlt: "נחל סעדיה - מעיין ובריכות",
    location: {
    lat: 31.454,
    lng: 35.384,
    address: "נחל סעדיה, חיפה"
  },
    description: {
    short: "מסלול הליכה בין סעדיה למעיינות",
    full: "נחל סעדיה הוא אתר טבע מרהיב עם מעיין טבעי ובריכות מים צלולות. המקום מושלם לטיול משפחתי עם מים קרים וצל מבורך."
  },
    hours: {
    type: "24/7",
    note: "שטח פתוח"
  },
    cost: {
    level: "free",
    price: 0,
    label: "חינם"
  },
    rating: 4.6,
    reviews: 89,
    duration: "2-3 שעות",
    amenities: {
    restrooms: false,
    parking: true,
    shade: true,
    picnic: true,
    water: true,
    wheelchair: false,
    dogs: true,
    bbq: false,
    swimming: true,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "מים",
    "צל",
    "חינם",
    "טבע",
    "נחל"
  ],
    tips: [
    {
      text: "מסלול קצר אך יפה מאוד",
      author: "דנה"
    },
    {
      text: "הבירחים קרים במהלך החורף",
      author: "אמיר"
    }
  ],
    personalReview: {
    text: "מקום מושלם לטיול בין נופים",
    author: "ליאת"
  }
  },
  {
    id: 30,
    name: "עין ארנון",
    category: "nature",
    region: "בקעת הירדן",
    saturdayOpen: true,
    icon: "tree",
    emoji: "💧",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
    imageAlt: "עין ארנון - בריכות טבעיות",
    location: {
    lat: 32.48,
    lng: 35.55,
    address: "כביש 90, דרומית לבית שאן"
  },
    description: {
    short: "בריכות טבעיות מדהימות עם מים צלולים וצל מבורך",
    full: "עין ארנון הוא אחד המעיינות היפים בארץ. בריכות טבעיות גדולות עם מים צלולים, צל מבורך מעצי אקליפטוס, ואווירה כפרית שקטה."
  },
    hours: {
    type: "24/7",
    note: "שטח פתוח"
  },
    cost: {
    level: "free",
    price: 0,
    label: "חינם"
  },
    rating: 4.8,
    reviews: 234,
    duration: "2-3 שעות",
    amenities: {
    restrooms: true,
    parking: true,
    shade: true,
    picnic: true,
    water: true,
    wheelchair: false,
    dogs: true,
    bbq: true,
    swimming: true,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "מים",
    "צל",
    "חינם",
    "מעיין",
    "שחייה"
  ],
    tips: [
    {
      text: "20 דקות דרומית מבית שאן על כביש 90",
      author: "זיו"
    },
    {
      text: "המקום מלא בסופי שבוע — הגיעו מוקדם",
      author: "מיכל"
    }
  ],
    personalReview: {
    text: "אחת הבריכות הכי שוות בארץ! מים קרים וצל נעים",
    author: "שירה"
  }
  },
  {
    id: 31,
    name: "נחל ערוגות",
    category: "nature",
    region: "ים המלח",
    saturdayOpen: true,
    icon: "tree",
    emoji: "🏜️",
    image: "https://images.unsplash.com/photo-1534312527009-56c7016453e6?auto=format&fit=crop&w=800&q=80",
    imageAlt: "נחל ערוגות - מדבר ומים",
    location: {
    lat: 31.45,
    lng: 35.38,
    address: "נחל ערוגות, ים המלח"
  },
    description: {
    short: "מסלול ייחודי בין מדבר למים עם בריכות טבעיות",
    full: "נחל ערוגות הוא מסלול הליכה מרהיב בין הרי מדבר לבריכות מים. השילוב הייחודי של נוף מדברי עם מים זורמים הופך אותו לאחד המסלולים האהובים בארץ."
  },
    hours: {
    type: "24/7",
    note: "שטח פתוח"
  },
    cost: {
    level: "free",
    price: 0,
    label: "חינם"
  },
    rating: 4.7,
    reviews: 156,
    duration: "3-4 שעות",
    amenities: {
    restrooms: false,
    parking: true,
    shade: false,
    picnic: true,
    water: true,
    wheelchair: false,
    dogs: true,
    bbq: false,
    swimming: true,
    store: false
  },
    suitableFor: {
    children: false,
    couples: true,
    families: false,
    strollers: false
  },
    tags: [
    "מים",
    "מדבר",
    "חינם",
    "הליכה",
    "טבע"
  ],
    tips: [
    {
      text: "קחו הרבה מים — אין צל בחלק גדול מהמסלול",
      author: "יוסי"
    },
    {
      text: "המסלול הקצר יותר מתאים למשפחות עם ילדים",
      author: "רונית"
    }
  ],
    personalReview: {
    text: "נוף מדהים! שילוב של מדבר ומים שלא רואים במקומות אחרים",
    author: "דוד"
  }
  },
  {
    id: "32",
    name: "עין גדי",
    category: "nature",
    region: "ים המלח",
    saturdayOpen: true,
    icon: "tree",
    emoji: "🌴",
    image: "https://images.unsplash.com/photo-1544394998-39b027b7e6ad?auto=format&fit=crop&w=800&q=80",
    imageAlt: "עין גדי - נווה מדבר",
    location: {
    lat: 31.467,
    lng: 35.383,
    address: "עין גדי, ים המלח"
  },
    description: {
    short: "נווה מדבר קסום עם מעיינות, צמחייה ירוקה ומים",
    full: "עין גדי הוא נווה מדבר אגדי ליד ים המלח. מעיינות זורמים, צמחייה ירוקה נדירה, ומים צלולים. חוויה ייחודית של חיים במדבר."
  },
    hours: {
    type: "24/7",
    note: "שטח פתוח"
  },
    cost: {
    level: "free",
    price: 0,
    label: "חינם"
  },
    rating: 4.9,
    reviews: 412,
    duration: "2-3 שעות",
    amenities: {
    restrooms: true,
    parking: true,
    shade: true,
    picnic: true,
    water: true,
    wheelchair: false,
    dogs: true,
    bbq: false,
    swimming: true,
    store: true
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "מים",
    "צל",
    "חינם",
    "מדבר",
    "נווה מדבר"
  ],
    tips: [
    {
      text: "אל תפספסו את המפל הקטן — יפהפה!",
      author: "ליאור"
    },
    {
      text: "הביאו ספר — יש פינות ישיבה מושלמות",
      author: "נועה"
    }
  ],
    personalReview: {
    text: "אחד המקומות הכי יפים שיש — צמחייה ירוקה באמצע המדבר!",
    author: "אבי"
  },
    address: "עין גדי, ים המלח",
    phone: "",
    lat: 31.467,
    lng: 35.383,
    updatedAt: "2026-09-13T00:20:46.189Z"
  },
  {
    id: 33,
    name: "שמורת חולה",
    category: "nature",
    region: "הגליל העליון",
    saturdayOpen: true,
    icon: "tree",
    emoji: "🦅",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    imageAlt: "שמורת חולה - ציפורים וטבע",
    location: {
    lat: 33.04,
    lng: 35.62,
    address: "שמורת חולה, הגליל העליון"
  },
    description: {
    short: "שמורת טבע עשירה בציפורים, צמחייה ונופים פתוחים",
    full: "שמורת חולה היא אתר צפרות וטבע מהחשובים בארץ. בריכות מים, סוף גדול, ציפורים נדירות ונופים פתוחים מרהיבים."
  },
    hours: {
    type: "24/7",
    note: "שטח פתוח"
  },
    cost: {
    level: "free",
    price: 0,
    label: "חינם"
  },
    rating: 4.5,
    reviews: 198,
    duration: "2-3 שעות",
    amenities: {
    restrooms: true,
    parking: true,
    shade: false,
    picnic: true,
    water: true,
    wheelchair: false,
    dogs: true,
    bbq: false,
    swimming: false,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "ציפורים",
    "טבע",
    "חינם",
    "שמורה",
    "נוף"
  ],
    tips: [
    {
      text: "הביאו משקפת — יש הרבה ציפורים נדירות",
      author: "רונן"
    },
    {
      text: "הזמן הכי טוב לביקור: בוקר מוקדם",
      author: "יעל"
    }
  ],
    personalReview: {
    text: "חוויה מדהימה לאוהבי טבע וציפורים",
    author: "אסף"
  }
  },
  {
    id: "34",
    name: "נחל שפירה",
    category: "nature",
    region: "יהודה ושומרון",
    saturdayOpen: true,
    icon: "tree",
    emoji: "🌊",
    image: "/assets/uploads/1789258797508-Gemini_Generated_Image_2pqxa92pqxa92pqx.jpg",
    imageAlt: "נחל שפירה - מים וטבע",
    location: {
    lat: 31.78,
    lng: 35.03,
    address: "נחל שפירה, יהודה ושומרון"
  },
    description: {
    short: "נחל שוקק חיים עם בריכות מים גדולות לשחייה",
    full: "נחל שפירה הוא אתר טבע פופולרי עם בריכות מים גדולות ועמוקות. מושלם לשחייה, פיקניק וטיול משפחתי."
  },
    hours: {
    type: "24/7",
    note: "שטח פתוח"
  },
    cost: {
    level: "free",
    price: 0,
    label: "חינם"
  },
    rating: 4.4,
    reviews: 234,
    duration: "2-3 שעות",
    amenities: {
    restrooms: true,
    parking: true,
    shade: true,
    picnic: true,
    water: true,
    wheelchair: false,
    dogs: true,
    bbq: true,
    swimming: true,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "מים",
    "צל",
    "חינם",
    "שחייה",
    "פיקניק"
  ],
    tips: [
    {
      text: "יש מקומות עם מים עמוקים — שימו לב לילדים",
      author: "אורנה"
    },
    {
      text: "סוף השבוע מאוד עמוס — בואו מוקדם",
      author: "בועז"
    }
  ],
    personalReview: {
    text: "אהבנו! בריכות גדולות ומים כיפיים",
    author: "יעל"
  },
    address: "נחל שפירה, יהודה ושומרון",
    phone: "",
    lat: 31.78,
    lng: 35.03,
    updatedAt: "2026-09-13T00:20:38.887Z"
  },
  {
    id: 35,
    name: "מעיין הבקעה",
    category: "nature",
    region: "הגליל",
    saturdayOpen: true,
    icon: "tree",
    emoji: "💦",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    imageAlt: "מעיין הבקעה - מים זורמים",
    location: {
    lat: 32.82,
    lng: 35.29,
    address: "מעיין הבקעה, הגליל"
  },
    description: {
    short: "מעיין טבעי שוקק חיים עם בריכות גדולות",
    full: "מעיין הבקעה הוא מעיין גדול ושוקק חיים. בריכות מים רחבות, מים צלולים וקרים, ואווירה כפרית שקטה."
  },
    hours: {
    type: "24/7",
    note: "שטח פתוח"
  },
    cost: {
    level: "free",
    price: 0,
    label: "חינם"
  },
    rating: 4.6,
    reviews: 145,
    duration: "2-3 שעות",
    amenities: {
    restrooms: true,
    parking: true,
    shade: true,
    picnic: true,
    water: true,
    wheelchair: false,
    dogs: true,
    bbq: true,
    swimming: true,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "מים",
    "צל",
    "חינם",
    "מעיין",
    "שחייה"
  ],
    tips: [
    {
      text: "יש פינות שקטות למי שרוצה לשחות בשקט",
      author: "דינה"
    },
    {
      text: "מומלץ להביא מנה קטנה לפיקניק",
      author: "איתי"
    }
  ],
    personalReview: {
    text: "מקום מושלם ליום חורף — המים חמים יחסית!",
    author: "חן"
  }
  },
  {
    id: 36,
    name: "נחל צין",
    category: "nature",
    region: "הנגב",
    saturdayOpen: true,
    icon: "tree",
    emoji: "🏜️",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=800&q=80",
    imageAlt: "נחל צין - מדבר הנגב",
    location: {
    lat: 30.78,
    lng: 34.82,
    address: "נחל צין, הנגב"
  },
    description: {
    short: "מסלול מדברי מרהיב עם בריכות ומפלים בחורף",
    full: "נחל צין הוא מסלול מדברי מרהיב בלב הנגב. בחורף זורמים מים בנחל ונוצרות בריכות יפותפיות. נוף מדברי עוצר נשימה."
  },
    hours: {
    type: "24/7",
    note: "שטח פתוח"
  },
    cost: {
    level: "free",
    price: 0,
    label: "חינם"
  },
    rating: 4.7,
    reviews: 123,
    duration: "3-5 שעות",
    amenities: {
    restrooms: false,
    parking: true,
    shade: false,
    picnic: false,
    water: true,
    wheelchair: false,
    dogs: true,
    bbq: false,
    swimming: false,
    store: false
  },
    suitableFor: {
    children: false,
    couples: true,
    families: false,
    strollers: false
  },
    tags: [
    "מדבר",
    "הליכה",
    "חינם",
    "טבע",
    "נגב"
  ],
    tips: [
    {
      text: "הביאו 3 ליטר מים לפחות לאדם",
      author: "עופר"
    },
    {
      text: "בדקו מראש שיש זרימה בנחל — לא תמיד יש מים",
      author: "הילה"
    }
  ],
    personalReview: {
    text: "נופים מדבריים עוצרי נשימה — ממליצה בחום!",
    author: "מירב"
  }
  },
  {
    id: "39",
    name: "עין פשחס",
    category: "nature",
    region: "הגליל העליון",
    saturdayOpen: true,
    icon: "tree",
    emoji: "🌿",
    image: "/assets/uploads/1789258788958-Gemini_Generated_Image_2pqxa92pqxa92pqx.jpg",
    imageAlt: "עין פשחס - מעיין בגליל",
    location: {
    lat: 33.02,
    lng: 35.27,
    address: "עין פשחס, הגליל העליון"
  },
    description: {
    short: "מעיין קסום בגליל העליון",
    full: "עין פשחס הוא מעיין יפהפה בלב הגליל העליון. בריכות קטנות, מים צלולים וקרים, ואווירה הררית נעימה."
  },
    hours: {
    type: "24/7",
    note: "שטח פתוח"
  },
    cost: {
    level: "free",
    price: 0,
    label: "חינם"
  },
    rating: 4.5,
    reviews: 87,
    duration: "1-2 שעות",
    amenities: {
    restrooms: false,
    parking: true,
    shade: true,
    picnic: true,
    water: true,
    wheelchair: false,
    dogs: true,
    bbq: false,
    swimming: true,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "מים",
    "צל",
    "חינם",
    "מעיין",
    "גליל"
  ],
    tips: [
    {
      text: "מקום שקט ופחות מוכר",
      author: "רועי"
    }
  ],
    personalReview: {
    text: "גן עדן קטן!",
    author: "שרון"
  },
    address: "עין פשחס, הגליל העליון",
    phone: "",
    lat: 33.02,
    lng: 35.27,
    updatedAt: "2026-09-13T00:19:50.509Z"
  },
  {
    id: 40,
    name: "נחל דוד",
    category: "nature",
    region: "ים המלח",
    saturdayOpen: true,
    icon: "tree",
    emoji: "⛰️",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "נחל דוד - מסלול הררי",
    location: {
    lat: 31.455,
    lng: 35.389,
    address: "נחל דוד, עין גדי"
  },
    description: {
    short: "מסלול הליכה דרמטי בין סלעים ומים",
    full: "נחל דוד הוא אחד המסלולים המרהיבים. מסלול דרמטי בין קניונים ובריכות."
  },
    hours: {
    type: "24/7",
    note: "שטח פתוח"
  },
    cost: {
    level: "free",
    price: 0,
    label: "חינם"
  },
    rating: 4.8,
    reviews: 287,
    duration: "3-4 שעות",
    amenities: {
    restrooms: false,
    parking: true,
    shade: false,
    picnic: false,
    water: true,
    wheelchair: false,
    dogs: false,
    bbq: false,
    swimming: true,
    store: false
  },
    suitableFor: {
    children: false,
    couples: true,
    families: false,
    strollers: false
  },
    tags: [
    "הליכה",
    "מים",
    "מדבר",
    "חינם",
    "טבע"
  ],
    personalReview: {
    text: "מסלול מדהים!",
    author: "גיל"
  }
  },
  {
    id: 41,
    name: "עגלת קפה ירושלים",
    category: "food",
    region: "ירושלים",
    saturdayOpen: true,
    icon: "coffee",
    emoji: "☕",
    image: "assets/coffee_cart_gemini.jpg",
    imageAlt: "עגלת קפה - ירושלים",
    location: {
    lat: 31.768,
    lng: 35.217,
    address: "מרכז ירושלים"
  },
    description: {
    short: "עגלת קפה ניידת במרכז ירושלים",
    full: "עגלת קפה ניידת המציעה קפה איכותי בלב ירושלים. אווירה ירושלמית ייחודית."
  },
    hours: {
    type: "flexible",
    note: "בדקו בעמוד"
  },
    cost: {
    level: "medium",
    price: 20,
    label: "₪₪"
  },
    rating: 4.5,
    reviews: 34,
    duration: "20-40 דקות",
    amenities: {
    restrooms: false,
    parking: false,
    shade: true,
    picnic: false,
    water: false,
    wheelchair: false,
    dogs: false,
    bbq: false,
    swimming: false,
    store: false
  },
    suitableFor: {
    children: false,
    couples: true,
    families: false,
    strollers: false
  },
    tags: [
    "קפה",
    "עגלה",
    "ירושלים",
    "נייד"
  ],
    personalReview: {
    text: "קפה משובח באווירה ירושלמית",
    author: "אברהם"
  }
  },
  {
    id: 42,
    name: "עגלת קפה תל אביב",
    category: "food",
    region: "תל אביב",
    saturdayOpen: true,
    icon: "coffee",
    emoji: "☕",
    image: "assets/coffee_cart_gemini.jpg",
    imageAlt: "עגלת קפה - תל אביב",
    location: {
    lat: 32.085,
    lng: 34.781,
    address: "רוטשילד, תל אביב"
  },
    description: {
    short: "עגלת קפה טרנדית בלב תל אביב",
    full: "עגלת קפה טרנדית ברחוב רוטשילד. קפה פילטרון איכותי, לאטה מיוחדות."
  },
    hours: {
    type: "weekly",
    note: "א'-ו' 07:00-19:00"
  },
    cost: {
    level: "medium",
    price: 22,
    label: "₪₪"
  },
    rating: 4.6,
    reviews: 78,
    duration: "20-30 דקות",
    amenities: {
    restrooms: false,
    parking: false,
    shade: false,
    picnic: false,
    water: false,
    wheelchair: false,
    dogs: true,
    bbq: false,
    swimming: false,
    store: false
  },
    suitableFor: {
    children: false,
    couples: true,
    families: false,
    strollers: false
  },
    tags: [
    "קפה",
    "עגלה",
    "תל אביב",
    "פילטר"
  ],
    personalReview: {
    text: "קפה מעולה באווירה תל אביבית!",
    author: "גל"
  }
  },
  {
    id: 43,
    name: "עגלת קפה חיפה",
    category: "food",
    region: "חיפה",
    saturdayOpen: true,
    icon: "coffee",
    emoji: "☕",
    image: "assets/coffee_cart_gemini.jpg",
    imageAlt: "עגלת קפה - חיפה",
    location: {
    lat: 32.794,
    lng: 35.081,
    address: "הגן הבהאי, חיפה"
  },
    description: {
    short: "עגלת קפה בגן הבהאי חיפה",
    full: "עגלת קפה בגן הבהאי המרהיב של חיפה. קפה איכותי עם נוף לגנים הירוקים."
  },
    hours: {
    type: "flexible",
    note: "ימים משתנים"
  },
    cost: {
    level: "medium",
    price: 20,
    label: "₪₪"
  },
    rating: 4.4,
    reviews: 45,
    duration: "30-45 דקות",
    amenities: {
    restrooms: true,
    parking: true,
    shade: true,
    picnic: true,
    water: false,
    wheelchair: true,
    dogs: true,
    bbq: false,
    swimming: false,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: true
  },
    tags: [
    "קפה",
    "עגלה",
    "חיפה",
    "גן בהאי"
  ],
    personalReview: {
    text: "מקום מושלם לשילוב עם סיור בגן הבהאי",
    author: "לילך"
  }
  },
  {
    id: 44,
    name: "עגלת קפה נגב - מדבר",
    category: "food",
    region: "הנגב",
    saturdayOpen: true,
    icon: "coffee",
    emoji: "☕",
    image: "assets/coffee_cart_gemini.jpg",
    imageAlt: "עגלת קפה - נגב",
    location: {
    lat: 31.25,
    lng: 34.85,
    address: "מסלול נחל צין, הנגב"
  },
    description: {
    short: "עגלת קפה ניידת בלב הנגב",
    full: "עגלת קפה ניידת שמגיעה למסלולים בנגב. קפה חם, שתייה קרה וכיבוד קל."
  },
    hours: {
    type: "flexible",
    note: "לפי לוח הטיולים"
  },
    cost: {
    level: "medium",
    price: 25,
    label: "₪₪"
  },
    rating: 4.8,
    reviews: 67,
    duration: "20-30 דקות",
    amenities: {
    restrooms: false,
    parking: true,
    shade: false,
    picnic: false,
    water: false,
    wheelchair: false,
    dogs: false,
    bbq: false,
    swimming: false,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "קפה",
    "עגלה",
    "נגב",
    "מדבר",
    "טיולים"
  ],
    personalReview: {
    text: "מציל חיים! קפה חם באמצע המדבר",
    author: "איתמר"
  }
  },
  {
    id: 45,
    name: "עגלת קפה ים המלח",
    category: "food",
    region: "ים המלח",
    saturdayOpen: true,
    icon: "coffee",
    emoji: "☕",
    image: "assets/coffee_cart_gemini.jpg",
    imageAlt: "עגלת קפה - ים המלח",
    location: {
    lat: 31.5,
    lng: 35.35,
    address: "ים המלח"
  },
    description: {
    short: "עגלת קפה ליד ים המלח",
    full: "עגלת קפה בנקודת תצפית מרהיבה ליד ים המלח. קפה משובח עם נוף."
  },
    hours: {
    type: "flexible",
    note: "ימים משתנים"
  },
    cost: {
    level: "medium",
    price: 25,
    label: "₪₪"
  },
    rating: 4.7,
    reviews: 89,
    duration: "30-45 דקות",
    amenities: {
    restrooms: false,
    parking: true,
    shade: false,
    picnic: true,
    water: false,
    wheelchair: false,
    dogs: true,
    bbq: false,
    swimming: false,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "קפה",
    "עגלה",
    "ים המלח",
    "נוף"
  ],
    personalReview: {
    text: "קפה עם נוף של ים המלח",
    author: "רונן"
  }
  },
  {
    id: 46,
    name: "עגלת קפה צפון - גליל",
    category: "food",
    region: "הגליל",
    saturdayOpen: true,
    icon: "coffee",
    emoji: "☕",
    image: "assets/coffee_cart_gemini.jpg",
    imageAlt: "עגלת קפה - גליל",
    location: {
    lat: 32.97,
    lng: 35.5,
    address: "אצבע הגליל"
  },
    description: {
    short: "עגלת קפה בצפון הגליל",
    full: "עגלת קפה בלב הגליל העליון. קפה איכותי, עוגות ביתיות."
  },
    hours: {
    type: "flexible",
    note: "ימים משתנים"
  },
    cost: {
    level: "medium",
    price: 22,
    label: "₪₪"
  },
    rating: 4.6,
    reviews: 52,
    duration: "30-60 דקות",
    amenities: {
    restrooms: false,
    parking: true,
    shade: true,
    picnic: true,
    water: false,
    wheelchair: false,
    dogs: true,
    bbq: false,
    swimming: false,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "קפה",
    "עגלה",
    "גליל",
    "הרים"
  ],
    personalReview: {
    text: "קפה חם עם נוף קסום",
    author: "מיכל"
  }
  },
  {
    id: 47,
    name: "עגלת קפה שרון - פרדס חנה",
    category: "food",
    region: "השרון",
    saturdayOpen: true,
    icon: "coffee",
    emoji: "☕",
    image: "assets/coffee_cart_gemini.jpg",
    imageAlt: "עגלת קפה - פרדס חנה",
    location: {
    lat: 32.47,
    lng: 34.95,
    address: "פרדס חנה, השרון"
  },
    description: {
    short: "עגלת קפה כפרית בפרדס חנה",
    full: "עגלת קפה כפרית בלב מטעי ההדרים. קפה טרי, עוגות ביתיות."
  },
    hours: {
    type: "flexible",
    note: "סופי שבוע"
  },
    cost: {
    level: "medium",
    price: 20,
    label: "₪₪"
  },
    rating: 4.5,
    reviews: 38,
    duration: "30-60 דקות",
    amenities: {
    restrooms: true,
    parking: true,
    shade: true,
    picnic: true,
    water: false,
    wheelchair: false,
    dogs: true,
    bbq: false,
    swimming: false,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "קפה",
    "עגלה",
    "שرون",
    "כפרי",
    "פרדס"
  ],
    personalReview: {
    text: "מקום קסום ליד הטבע!",
    author: "רותי"
  }
  },
  {
    id: 48,
    name: "עגלת קפה אילת",
    category: "food",
    region: "אילת",
    saturdayOpen: true,
    icon: "coffee",
    emoji: "☕",
    image: "assets/coffee_cart_gemini.jpg",
    imageAlt: "עגלת קפה - אילת",
    location: {
    lat: 29.558,
    lng: 34.948,
    address: "אילת"
  },
    description: {
    short: "עגלת קפה טרופית באילת",
    full: "עגלת קפה טרופית עם אווירת ים סוף. קפה קר, שתייה טרופית."
  },
    hours: {
    type: "flexible",
    note: "ימים משתנים"
  },
    cost: {
    level: "medium",
    price: 25,
    label: "₪₪"
  },
    rating: 4.4,
    reviews: 41,
    duration: "20-40 דקות",
    amenities: {
    restrooms: false,
    parking: true,
    shade: true,
    picnic: false,
    water: true,
    wheelchair: false,
    dogs: false,
    bbq: false,
    swimming: false,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "קפה",
    "עגלה",
    "אילת",
    "ים סוף"
  ],
    personalReview: {
    text: "חוויה טרופית מרעננת באילת",
    author: "מור"
  }
  },
  {
    id: 49,
    name: "עגלת קפה רמת הגולן",
    category: "food",
    region: "רמת הגולן",
    saturdayOpen: true,
    icon: "coffee",
    emoji: "☕",
    image: "assets/coffee_cart_gemini.jpg",
    imageAlt: "עגלת קפה - רמת הגולן",
    location: {
    lat: 32.98,
    lng: 35.75,
    address: "רמת הגולן"
  },
    description: {
    short: "עגלת קפה ברמת הגולן",
    full: "עגלת קפה בלב רמת הגולן עם תצפית להרי הגולן והחרמון. קפה חם."
  },
    hours: {
    type: "flexible",
    note: "ימים משתנים"
  },
    cost: {
    level: "medium",
    price: 22,
    label: "₪₪"
  },
    rating: 4.7,
    reviews: 63,
    duration: "30-60 דקות",
    amenities: {
    restrooms: false,
    parking: true,
    shade: true,
    picnic: true,
    water: false,
    wheelchair: false,
    dogs: true,
    bbq: false,
    swimming: false,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "קפה",
    "עגלה",
    "גולן",
    "הרים",
    "כפרי"
  ],
    personalReview: {
    text: "קפה עם נוף של החרמון",
    author: "ליאור"
  }
  },
  {
    id: 50,
    name: "עגלת קפה קיבוץ בחן",
    category: "food",
    region: "עמק חפר",
    saturdayOpen: true,
    icon: "coffee",
    emoji: "☕",
    image: "assets/coffee_cart_gemini.jpg",
    imageAlt: "עגלת קפה - קיבוץ בחן",
    location: {
    lat: 32.34,
    lng: 34.92,
    address: "קיבוץ בחן, עמק חפר"
  },
    description: {
    short: "עגלת קפה קולינרית בקיבוץ בחן",
    full: "עגלת קפה קולינרית בלב האווירה הקיבוצית. קפה איכותי, מאפים טריים."
  },
    hours: {
    type: "flexible",
    note: "ימים משתנים"
  },
    cost: {
    level: "medium",
    price: 25,
    label: "₪₪"
  },
    rating: 4.7,
    reviews: 56,
    duration: "30-60 דקות",
    amenities: {
    restrooms: false,
    parking: true,
    shade: true,
    picnic: true,
    water: false,
    wheelchair: false,
    dogs: true,
    bbq: false,
    swimming: false,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "קפה",
    "עגלה",
    "קיבוץ",
    "אוכל ביתי"
  ],
    personalReview: {
    text: "אווירה קיבוצית כיפית",
    author: "נועה"
  }
  },
  {
    id: 51,
    name: "עגלת קפה מרכז תל אביב",
    category: "food",
    region: "תל אביב",
    saturdayOpen: true,
    icon: "coffee",
    emoji: "☕",
    image: "assets/coffee_cart_gemini.jpg",
    imageAlt: "עגלת קפה - תל אביב מרכז",
    location: {
    lat: 32.08,
    lng: 34.78,
    address: "רחוב הרצל, תל אביב"
  },
    description: {
    short: "עגלת קפה ברחוב הרצל",
    full: "עגלת קפה טרנדית בלב תל אביב. קפה פילטרון איכותי."
  },
    hours: {
    type: "daily",
    note: "07:00-20:00"
  },
    cost: {
    level: "medium",
    price: 24,
    label: "₪₪"
  },
    rating: 4.6,
    reviews: 85,
    duration: "25-35 דקות",
    amenities: {
    restrooms: false,
    parking: true,
    shade: true,
    picnic: false,
    water: false,
    wheelchair: false,
    dogs: true,
    bbq: false,
    swimming: false,
    store: false
  },
    suitableFor: {
    children: false,
    couples: true,
    families: false,
    strollers: false
  },
    tags: [
    "קפה",
    "עגלה",
    "תל אביב",
    "רצל"
  ],
    personalReview: {
    text: "סבלנות לִי! מאוד מומלץ",
    author: "דנה"
  }
  },
  {
    id: 52,
    name: "עגלת קפה חיפה צפון",
    category: "food",
    region: "חיפה",
    saturdayOpen: true,
    icon: "coffee",
    emoji: "☕",
    image: "assets/coffee_cart_gemini.jpg",
    imageAlt: "עגלת קפה - חיפה צפון",
    location: {
    lat: 32.8,
    lng: 35.08,
    address: "שכונת נווה, חיפה"
  },
    description: {
    short: "עגלת קפה בסמוך לנווה",
    full: "עגלת קפה בשכונת נווה בחיפה. מפתחות, קפה טרי, אווירה שקטה."
  },
    hours: {
    type: "flexible",
    note: "לפי ערוסת היום"
  },
    cost: {
    level: "medium",
    price: 21,
    label: "₪₪"
  },
    rating: 4.5,
    reviews: 42,
    duration: "30-50 דקות",
    amenities: {
    restrooms: false,
    parking: true,
    shade: true,
    picnic: false,
    water: false,
    wheelchair: false,
    dogs: true,
    bbq: false,
    swimming: false,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "קפה",
    "עגלה",
    "חיפה",
    "נווה"
  ],
    personalReview: {
    text: "קפה טעים ומוקדם לפני העבודה",
    author: "יוסי"
  }
  },
  {
    id: 53,
    name: "עין תאו",
    category: "nature",
    region: "בקעת הירדן",
    saturdayOpen: true,
    icon: "tree",
    emoji: "🌿",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
    imageAlt: "עין תאו - מעיין בבקעת הירדן",
    location: {
    lat: 32.45,
    lng: 35.45,
    address: "עין תאו, בקעת הירדן"
  },
    description: {
    short: "מעיין ייחודי עם בריכה בצורת לב וצמחייה טרופית",
    full: "עין תאו הוא אתר טבע ייחודי בבקעת הירדן. מעיין טבעי זורם לבריכה בצורת לב המוקפת בצמחייה עשירה — לוטוס, פפירוס ואיריס צהוב נדיר. האזור הוא בית לחיות בר נדירות ומציע מסלול הליכה שליו סביב הבריכות."
  },
    hours: {
    type: "24/7",
    note: "שטח פתוח"
  },
    cost: {
    level: "free",
    price: 0,
    label: "חינם"
  },
    rating: 4.7,
    reviews: 124,
    duration: "1-2 שעות",
    amenities: {
    restrooms: true,
    parking: true,
    shade: true,
    picnic: true,
    water: true,
    wheelchair: false,
    dogs: true,
    bbq: false,
    swimming: false,
    store: false
  },
    suitableFor: {
    children: true,
    couples: true,
    families: true,
    strollers: false
  },
    tags: [
    "מים",
    "צל",
    "חינם",
    "מעיין",
    "בקעת הירדן"
  ],
    tips: [
    {
      text: "הצבע הצהוב של האיריס הוא מחזה נדיר!",
      author: "רונן"
    },
    {
      text: "הביאו נעלי הליכה — המסלול סביב הבריכה מקסים",
      author: "יעל"
    }
  ],
    personalReview: {
    text: "מקום קסום ושקט — מומלץ בחום",
    author: "אבי"
  }
  }
];
