import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Lock, 
  Unlock, 
  Shield, 
  Languages, 
  CreditCard, 
  CheckCircle2, 
  LogOut, 
  User, 
  Mail, 
  LockKeyhole, 
  Sparkles, 
  Check, 
  X, 
  ChevronRight,
  ChevronLeft,
  AlertTriangle
} from 'lucide-react';

// Bilingual translations dictionary
const translations = {
  en: {
    title: "Saudi Prep",
    subtitle: "Premium Competitive Prep Portal",
    splashText: "Choose Language / اختر اللغة",
    enterApp: "Get Started",
    login: "Sign In",
    signup: "Create Account",
    emailPlaceholder: "Enter your email",
    passwordPlaceholder: "Enter password",
    namePlaceholder: "Enter your full name",
    forgotPassword: "Forgot Password?",
    noAccount: "Don't have an account? Register",
    hasAccount: "Already have an account? Sign In",
    welcome: "Ahlan,",
    dashboardTitle: "Saudi Prep",
    dashboardSubtitle: "Prepare for competitive Saudi assessments",
    modules: "Preparation Modules",
    unlockedBadge: "Unlocked",
    lockedBadge: "Premium Locked",
    studyMaterials: "Study Guide",
    practiceQuiz: "Practice Quiz",
    keyConcepts: "Key Concepts",
    progress: "Your Preparation Progress",
    logout: "Sign Out",
    viewerTitle: "Assessment Prep Material",
    studyGuideTab: "Study Guide",
    takeQuizTab: "Quiz Practice",
    conceptsTab: "Key Concepts",
    secureViewerActive: "SECURE CONTENT VIEWER ACTIVE",
    backToDashboard: "Dashboard",
    protectionToast: "Security Block: Content replication is strictly prohibited.",
    focusLostTitle: "Viewer Blocked",
    focusLostMessage: "Focus lost. Tap screen to unlock and resume learning.",
    watermarkText: "Confidential - Saudi Prep - ",
    checkoutTitle: "Unlock Premium Module",
    checkoutSubtitle: "Get lifetime access to this exam preparation suite",
    upgradeCost: "Price: 99 SAR",
    cardHolderName: "Cardholder Name",
    cardNumber: "Card Number (16 digits)",
    expiryDate: "MM/YY",
    cvv: "CVV",
    payNow: "Secure Checkout with Mada",
    paymentProcessing: "Contacting payment gateway...",
    paymentSuccess: "Purchase Successful! Module unlocked.",
    paymentCancel: "Cancel Checkout",
    madaPayment: "Mada Pay",
    applePay: "Pay with Apple Pay",
    emailRequired: "Valid email is required.",
    passwordRequired: "Password must be at least 6 characters.",
    nameRequired: "Full name is required.",
    accountNotFound: "Account not found. Please sign up first.",
    incorrectPassword: "Incorrect password. Please try again.",
    emailExists: "An account with this email already exists.",
    questionExplanation: "Explanation",
    correctFeedback: "Correct Answer!",
    wrongFeedback: "Incorrect. Try again!",
    quizCompleted: "Quiz Completed!",
    score: "Your Score",
    resetQuiz: "Retake Quiz",
    securityWarningTitle: "Protection System Engaged",
    securityWarningDesc: "This content is digitally fingerprinted. Right-click, copy, save, and screenshots are restricted to protect copyright."
  },
  ar: {
    title: "سعودي بريب",
    subtitle: "البوابة الفاخرة للاستعداد للاختبارات",
    splashText: "اختر اللغة / Choose Language",
    enterApp: "ابدأ الآن",
    login: "تسجيل الدخول",
    signup: "إنشاء حساب جديد",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    passwordPlaceholder: "أدخل كلمة المرور",
    namePlaceholder: "أدخل اسمك الكامل",
    forgotPassword: "هل نسيت كلمة المرور؟",
    noAccount: "ليس لديك حساب؟ سجل الآن",
    hasAccount: "لديك حساب بالفعل؟ سجل دخولك",
    welcome: "أهلاً بك،",
    dashboardTitle: "سعودي بريب",
    dashboardSubtitle: "استعد بكفاءة للاختبارات الوطنية والتنافسية",
    modules: "وحدات التحضير المتاحة",
    unlockedBadge: "متاح مجاناً",
    lockedBadge: "مغلق - بريميوم",
    studyMaterials: "دليل الدراسة",
    practiceQuiz: "أسئلة الاختبار",
    keyConcepts: "المفاهيم الأساسية",
    progress: "مستوى تقدمك الدراسي",
    logout: "تسجيل الخروج",
    viewerTitle: "محتوى الاستعداد والتدريب",
    studyGuideTab: "دليل الدراسة",
    takeQuizTab: "التدريب التفاعلي",
    conceptsTab: "المفاهيم الأساسية",
    secureViewerActive: "مشاهد المحتوى الآمن نشط",
    backToDashboard: "الرئيسية",
    protectionToast: "حظر أمني: نسخ أو تصوير المحتوى محظور تماماً.",
    focusLostTitle: "تم حجب الشاشة مؤقتاً",
    focusLostMessage: "تم فقدان التركيز. اضغط على الشاشة للاستئناف.",
    watermarkText: "سري للغاية - سعودي بريب - ",
    checkoutTitle: "تفعيل الوصول الكامل",
    checkoutSubtitle: "احصل على صلاحية الوصول مدى الحياة لهذه الحقيبة",
    upgradeCost: "التكلفة: 99 ريال سعودي",
    cardHolderName: "اسم حامل البطاقة",
    cardNumber: "رقم البطاقة (16 رقم)",
    expiryDate: "الشهر/السنة",
    cvv: "رمز الأمان (CVV)",
    payNow: "دفع آمن عبر مدى",
    paymentProcessing: "جاري التفويض والتحقق مع مدى...",
    paymentSuccess: "تمت عملية الشراء بنجاح! تم تفعيل الوحدة.",
    paymentCancel: "إلغاء عملية الدفع",
    madaPayment: "مدى",
    applePay: "الدفع عبر Apple Pay",
    emailRequired: "البريد الإلكتروني مطلوب بشكل صحيح.",
    passwordRequired: "يجب ألا تقل كلمة المرور عن 6 أحرف.",
    nameRequired: "الاسم الكامل مطلوب.",
    accountNotFound: "الحساب غير موجود. يرجى إنشاء حساب أولاً.",
    incorrectPassword: "كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.",
    emailExists: "هذا البريد الإلكتروني مسجل بالفعل.",
    questionExplanation: "الشرح والتوضيح",
    correctFeedback: "إجابة صحيحة متميزة!",
    wrongFeedback: "إجابة غير صحيحة. حاول مجدداً!",
    quizCompleted: "اكتمل الاختبار!",
    score: "درجتك الحالية",
    resetQuiz: "إعادة الاختبار",
    securityWarningTitle: "نظام حماية المحتوى نشط",
    securityWarningDesc: "هذا المحتوى محمي ببصمة رقمية مشفرة. يُمنع النسخ أو الحفظ أو التقاط الشاشة لضمان الملكية الفكرية."
  }
};

// Interface structures
interface Question {
  id: number;
  questionEn: string;
  questionAr: string;
  optionsEn: string[];
  optionsAr: string[];
  correctIndex: number;
  explanationEn: string;
  explanationAr: string;
}

interface TopicData {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number; // Price to unlock individual topic in SAR
  materialsEn: string[];
  materialsAr: string[];
  conceptsEn: { term: string; desc: string }[];
  conceptsAr: { term: string; desc: string }[];
  questions: Question[];
}

interface ModuleData {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: string;
  price: number; // Price to unlock the whole module in SAR
  topics: TopicData[];
}

// Complete mock database of exam prep materials organized by topics
const examModules: ModuleData[] = [
  {
    id: "qudrat",
    titleEn: "Qudrat Aptitude Test (GAT)",
    titleAr: "اختبار القدرات العامة",
    descriptionEn: "National standardized cognitive exam testing logical verbal relations and high-level quantitative analysis.",
    descriptionAr: "التقييم الوطني الموحد لقياس القدرات التحليلية، الكمية واللفظية لطلاب الثانوية.",
    icon: "Award",
    price: 35,
    topics: [
      {
        id: "qudrat-t1",
        titleEn: "Topic 1: Quantitative Comparison & Number Properties",
        titleAr: "الموضوع 1: المقارنة الكمية وخصائص الأعداد",
        descriptionEn: "Master column comparisons, testing fractions, negatives, zero, and core divisibility rules.",
        descriptionAr: "احتراف المقارنة بين عمودين واختبار الكسور، الأعداد السالبة، الصفر وقواعد القابلية للقسمة.",
        price: 15,
        materialsEn: [
          "1. Quantitative Comparison Edge Cases: In Column A vs Column B questions, never assume variables are positive integers. Always test zero (0), negative values, and fractions between 0 and 1. If x² > y, x could be positive or negative.",
          "2. Prime Factorization Divisor Rule: To find the total positive divisors of an integer, write it as a product of prime powers: p₁ᵃ * p₂ᵇ... then calculate (a+1)*(b+1)... For example, 12 = 2² * 3¹ -> (2+1)*(1+1) = 6 divisors.",
          "3. Fractional Powers: For any number x where 0 < x < 1, x² < x and √x > x. Raising a fraction between 0 and 1 to a higher power decreases its value, while taking its square root increases it."
        ],
        materialsAr: [
          "1. الحالات الحرجة للمقارنة الكمية: في أسئلة المقارنة بين العمودين، لا تفترض أبداً أن المتغيرات أعداد صحيحة موجبة فقط. اختبر الصفر، الأعداد السالبة، والكسور بين 0 و1. إذا كان س² > ص، فقد تكون س موجبة أو سالبة.",
          "2. قواسم العدد بالتحليل الأولي: لإيجاد عدد القواسم الموجبة لعدد صحيح، اكتبه كحاصل ضرب قوى عوامل أولية: أ^س × ب^ص... ثم احسب (س+1)×(ص+1)... مثلاً، 12 = 2² × 3¹ -> (2+1)×(1+1) = 6 قواسم.",
          "3. القوى والكسور: لأي كسر س حيث 0 < س < 1، يكون س² < س و √س > س. فرفع الكسر بين 0 و1 لأس أعلى يقلل قيمته، بينما جذره التربيعي يزيده."
        ],
        conceptsEn: [
          { term: "Boundary Variable Testing", desc: "Evaluating equations using critical values like negatives, zero, and fractions to test inequality limits." },
          { term: "Prime Decomposition Count", desc: "Determining positive divisors count using prime factor exponents." }
        ],
        conceptsAr: [
          { term: "اختبار القيم الحدية للمتغيرات", desc: "تقييم المعادلات باستخدام القيم الحرجة مثل السالب والصفر والكسر لاختبار حدود المتباينات." },
          { term: "حساب عدد القواسم بالتحليل", desc: "تحديد إجمالي عدد القواسم الموجبة لعدد ما باستخدام أسس عوامله الأولية." }
        ],
        questions: [
          {
            id: 1,
            questionEn: "If x is a real number, compare Column A: x² and Column B: x³.",
            questionAr: "إذا كان س عدداً حقيقياً، قارن بين العمود أ: س² والعمود ب: س³.",
            optionsEn: ["Column A is greater", "Column B is greater", "The two columns are equal", "The relationship cannot be determined"],
            optionsAr: ["العمود أ أكبر", "العمود ب أكبر", "العمودان متساويان", "لا يمكن تحديد العلاقة من المعطيات"],
            correctIndex: 3,
            explanationEn: "If x = 0.5, then x² (0.25) > x³ (0.125). If x = 2, then x² (4) < x³ (8). If x = 1, they are equal. Thus, the relationship depends on x and cannot be determined.",
            explanationAr: "إذا كانت س = 0.5، فإن س² (0.25) أكبر من س³ (0.125). وإذا كانت س = 2، فإن س² (4) أصغر من س³ (8). وإذا كانت س = 1، فهما متساويان. بالتالي، لا يمكن تحديد العلاقة."
          },
          {
            id: 2,
            questionEn: "Find the total number of positive divisors of 60.",
            questionAr: "ما هو العدد الإجمالي للقواسم الموجبة للعدد 60؟",
            optionsEn: ["8", "10", "12", "16"],
            optionsAr: ["8", "10", "12", "16"],
            correctIndex: 2,
            explanationEn: "Prime factorization of 60 is 2² * 3¹ * 5¹. The number of divisors is (2 + 1) * (1 + 1) * (1 + 1) = 3 * 2 * 2 = 12.",
            explanationAr: "التحليل الأولي للعدد 60 هو 2² × 3¹ × 5¹. عدد القواسم هو (2 + 1) × (1 + 1) × (1 + 1) = 3 × 2 × 2 = 12."
          },
          {
            id: 3,
            questionEn: "If y is a negative integer, which of the following must be the greatest?",
            questionAr: "إذا كان ص عدداً صحيحاً سالباً، فأي مما يلي يجب أن يكون الأكبر؟",
            optionsEn: ["y", "y²", "y³", "2y"],
            optionsAr: ["ص", "ص²", "ص³", "2ص"],
            correctIndex: 1,
            explanationEn: "Since y is negative, y² will be a positive integer, making it greater than y, y³ (which remains negative), and 2y.",
            explanationAr: "بما أن ص سالب، فإن ص² سيكون عدداً موجباً، مما يجعله أكبر من ص، وص³ (الذي يبقى سالباً)، و2ص."
          },
          {
            id: 4,
            questionEn: "A box contains red and blue balls. The ratio of red to blue is 3:5. If there are 40 balls in total, how many are blue?",
            questionAr: "صندوق يحتوي على كرات حمراء وزرقاء. نسبة الحمراء إلى الزرقاء هي 3:5. إذا كان المجموع 40 كرة، فكم عدد الكرات الزرقاء؟",
            optionsEn: ["15", "20", "25", "30"],
            optionsAr: ["15", "20", "25", "30"],
            correctIndex: 2,
            explanationEn: "Total ratio units = 3 + 5 = 8. Value of one unit = 40 / 8 = 5. Blue balls = 5 units * 5 = 25.",
            explanationAr: "إجمالي أجزاء النسبة = 3 + 5 = 8. قيمة الجزء الواحد = 40 / 8 = 5. عدد الكرات الزرقاء = 5 أجزاء × 5 = 25 كرة."
          },
          {
            id: 5,
            questionEn: "If 3^x = 9^(x-2), find the value of x.",
            questionAr: "إذا كان 3^س = 9^(س-2)، فأوجد قيمة س.",
            optionsEn: ["2", "3", "4", "5"],
            optionsAr: ["2", "3", "4", "5"],
            correctIndex: 2,
            explanationEn: "Rewrite 9 as 3²: 3^x = 3^(2x-4). Equating exponents: x = 2x - 4 => x = 4.",
            explanationAr: "أعد كتابة 9 لتصبح 3²: 3^س = 3^(2س-4). بمساواة الأسس: س = 2س - 4 => س = 4."
          }
        ]
      },
      {
        id: "qudrat-t2",
        titleEn: "Topic 2: Arithmetic, Speed/Work Rates & Series",
        titleAr: "الموضوع 2: الحساب، معدلات السرعة والعمل والمتتابعات",
        descriptionEn: "Deep dive into average speeds (harmonic mean), combined work rates, and progression sum formulas.",
        descriptionAr: "دراسة معمقة لسرعات السير (المتوسط التوافقي)، معدلات الإنجاز المشترك، وصيغ مجموع المتتابعات.",
        price: 15,
        materialsEn: [
          "1. Average Speed (Harmonic Mean): When traveling distance D at speed V₁ and returning at V₂, average speed is computed using the harmonic mean: S_avg = (2 * V₁ * V₂) / (V₁ + V₂). Never use simple average.",
          "2. Combined Work Rate: If worker A completes a task in T₁ hours and worker B in T₂ hours, their combined rate satisfies: 1/T_total = 1/T₁ + 1/T₂ => T_total = (T₁ * T₂) / (T₁ + T₂).",
          "3. Progression Summations: Arithmetic series sum is S_n = (n/2)*(a_1 + a_n). Geometric series sum is S_n = a_1*(1 - rⁿ) / (1 - r)."
        ],
        materialsAr: [
          "1. السرعة المتوسطة الذهاب والإياب: عند قطع مسافة بسرعة ع1 والعودة بسرعة ع2، يُحسب متوسط السرعة بالمتوسط التوافقي: السرعة المتوسطة = (2 × ع1 × ع2) / (ع1 + ع2). ولا تسخدم المتوسط الحسابي أبداً.",
          "2. معدل العمل المشترك: إذا أنجز العامل الأول عملاً في ز1 من الساعات، والعامل الثاني في ز2، فإن زمن إنجازهما معاً: 1/ز الكلي = 1/ز1 + 1/ز2 => ز الكلي = (ز1 × ز2) / (ز1 + ز2).",
          "3. مجموع المتتابعات: مجموع الحدود لمتتابعة حسابية هو ج_ن = (ن/2)(أ + ح_ن). ومجموع الهندسية هو ج_ن = أ(1 - ر^ن) / (1 - ر)."
        ],
        conceptsEn: [
          { term: "Harmonic Rate Skew", desc: "Why rate parameters over constant distance skew arithmetic means and require harmonic ratios." },
          { term: "Reciprocal Work Rate", desc: "Combining task rates by adding their reciprocal time values." }
        ],
        conceptsAr: [
          { term: "انحياز المعدل التوافقي", desc: "لماذا تسبب السرعات على مسافات متساوية انحيازاً للمتوسط الحسابي وتتطلب النسبة التوافقية." },
          { term: "معدل العمل العكسي", desc: "دمج معدلات إنجاز المهام بجمع مقلوب قيم الأزمنة الفردية لكل منها." }
        ],
        questions: [
          {
            id: 1,
            questionEn: "A car goes from Riyadh to Dammam at 100 km/h and returns along the same route at 120 km/h. What is its average speed?",
            questionAr: "ذهبت سيارة من الرياض إلى الدمام بسرعة 100 كم/س وعادت على نفس الطريق بسرعة 120 كم/س. ما هو متوسط سرعة السيارة؟",
            optionsEn: ["109.1 km/h", "110 km/h", "112 km/h", "105 km/h"],
            optionsAr: ["109.1 كم/س", "110 كم/س", "112 كم/س", "105 كم/س"],
            correctIndex: 0,
            explanationEn: "S_avg = (2 * 100 * 120) / (100 + 120) = 24000 / 220 ≈ 109.09 km/h.",
            explanationAr: "السرعة المتوسطة = (2 × 100 × 120) / (100 + 120) = 24000 / 220 ≈ 109.09 كم/س."
          },
          {
            id: 2,
            questionEn: "Pipe A fills a pool in 3 hours, and Pipe B fills it in 6 hours. If both open together, how long will they take?",
            questionAr: "صنبور (أ) يملأ خزان في 3 ساعات، وصنبور (ب) يملأ نفس الخزان في 6 ساعات. إذا فتحنا الاثنين معاً، فكم ساعة يستغرق الملء؟",
            optionsEn: ["2 hours", "3.5 hours", "4 hours", "4.5 hours"],
            optionsAr: ["ساعتان", "3.5 ساعات", "4 ساعات", "4.5 ساعات"],
            correctIndex: 0,
            explanationEn: "T = (3 * 6) / (3 + 6) = 18 / 9 = 2 hours.",
            explanationAr: "الزمن الكلي = (3 × 6) / (3 + 6) = 18 / 9 = ساعتان."
          },
          {
            id: 3,
            questionEn: "What is the sum of integers from 1 to 100?",
            questionAr: "ما هو مجموع الأعداد الصحيحة المتتالية من 1 إلى 100؟",
            optionsEn: ["4950", "5000", "5050", "5100"],
            optionsAr: ["4950", "5000", "5050", "5100"],
            correctIndex: 2,
            explanationEn: "Using Arithmetic Series sum: S = (100 / 2) * (1 + 100) = 50 * 101 = 5050.",
            explanationAr: "باستخدام قانون المجموع الحسابي: ج = (100 / 2) × (1 + 100) = 50 × 101 = 5050."
          },
          {
            id: 4,
            questionEn: "Find the next term in the sequence: 2, 5, 11, 23, ...",
            questionAr: "أوجد الحد التالي في المتتابعة: 2، 5، 11، 23، ...",
            optionsEn: ["35", "45", "47", "49"],
            optionsAr: ["35", "45", "47", "49"],
            correctIndex: 2,
            explanationEn: "The pattern is: term * 2 + 1. So, 2*2+1=5; 5*2+1=11; 11*2+1=23; 23*2+1 = 47.",
            explanationAr: "النمط هو: الحد السابق × 2 + 1. كالتالي: 2×2+1=5؛ 5×2+1=11؛ 11×2+1=23؛ 23×2+1 = 47."
          },
          {
            id: 5,
            questionEn: "If a printer print 60 pages in 5 minutes, how many pages can it print in 12 minutes?",
            questionAr: "إذا كانت طابعة تطبع 60 صفحة في 5 دقائق، فكم صفحة تطبع في 12 دقيقة؟",
            optionsEn: ["120", "144", "150", "180"],
            optionsAr: ["120", "144", "150", "180"],
            correctIndex: 1,
            explanationEn: "Rate = 60 / 5 = 12 pages per minute. In 12 minutes: 12 * 12 = 144 pages.",
            explanationAr: "المعدل = 60 / 5 = 12 صفحة لكل دقيقة. في 12 دقيقة تطبع: 12 × 12 = 144 صفحة."
          }
        ]
      },
      {
        id: "qudrat-t3",
        titleEn: "Topic 3: Verbal Reasoning: Analogies & Errors",
        titleAr: "الموضوع 3: التفكير اللفظي: التناظر والخطأ السياقي",
        descriptionEn: "Master semantic relationship bridges and logical sentence analysis to spot context anomalies.",
        descriptionAr: "احتراف بناء جمل الربط اللغوية وتحليل المنطق اللفظي لكشف الكلمات الشاذة سياقياً.",
        price: 15,
        materialsEn: [
          "1. Analogical Semantic Bridge: Build a detailed, active sentence containing the two prompt words. Maintain the direction of relation: 'Scale : Weight' -> A scale is an instrument used to measure weight. Apply to options: 'Thermometer : Temperature' -> A thermometer measures temperature.",
          "2. Contextual Error Analysis: Find the single word that makes a sentence logical nonsense. Focus on key structural adjectives, verbs, or antonyms.",
          "3. Reading Comprehension Logic: Answer strictly based on the text. Watch out for absolute qualifiers like 'always', 'never', 'only'."
        ],
        materialsAr: [
          "1. جملة التناظر الدقيقة: ابنِ جملة فعلية واضحة تربط الكلمتين وحافظ على الاتجاه: 'ميزان : وزن' -> الميزان أداة تستخدم لقياس الوزن. طبق ذلك على الخيارات: 'مقياس : حرارة' -> المقياس يقيس درجة الحرارة.",
          "2. كشف الخطأ السياقي: حدد الكلمة التي تفسد المعنى المنطقي للجملة. ركز على الصفات أو الأفعال التي تعاكس السياق الأصلي.",
          "3. استيعاب المقروء المنطقي: يجب أن تكون الإجابة مبنية تماماً على النص. انتبه للكلمات القطعية مثل 'دائماً'، 'أبداً'، 'فقط'."
        ],
        conceptsEn: [
          { term: "Semantic Bridge Equivalency", desc: "A method to test analogous pairs by matching their sentence context structure." },
          { term: "Adjectival Context Flip", desc: "When a sentence is falsified by using a word opposite to its cognitive context." }
        ],
        conceptsAr: [
          { term: "تطابق جملة الربط اللغوي", desc: "منهجية لاختبار تناظر الكلمات بمطابقة تركيب الجملة والسياق الدلالي للزوجين." },
          { term: "قلب الصفة السياقية", desc: "إفساد المعنى الإجمالي للجملة عبر إحلال كلمة معاكسة للمفهوم الإدراكي المقصود." }
        ],
        questions: [
          {
            id: 1,
            questionEn: "Analogy - Glove : Hand",
            questionAr: "تناظر لفظي - قفاز : يد",
            optionsEn: ["Sock : Foot", "Ring : Neck", "Cap : Arm", "Watch : Face"],
            optionsAr: ["جورب : قدم", "خاتم : عنق", "قبعة : ذراع", "ساعة : وجه"],
            correctIndex: 0,
            explanationEn: "A glove covers and protects the hand. Similarly, a sock covers and protects the foot.",
            explanationAr: "القفاز يغطي اليد ويحميها. وبالمثل، الجورب يغطي القدم ويحميها."
          },
          {
            id: 2,
            questionEn: "Identify the contextual error: 'The great values of human ethics encourage cooperation to decrease the ties between societies.'",
            questionAr: "حدد الخطأ السياقي: 'القيم العظيمة للأخلاق الإنسانية تشجع على التعاون لتقليل الأواصر بين المجتمعات.'",
            optionsEn: ["values", "ethics", "decrease", "societies"],
            optionsAr: ["العظيمة", "تشجع", "تقليل", "المجتمعات"],
            correctIndex: 2,
            explanationEn: "The word 'decrease' is wrong; human ethics should 'strengthen' (or increase) ties between societies.",
            explanationAr: "كلمة 'تقليل' خاطئة سياقياً، والصواب هو 'تقوية' أو 'تمتين' الأواصر بين المجتمعات."
          },
          {
            id: 3,
            questionEn: "Analogy - Sun : Light",
            questionAr: "تناظر لفظي - شمس : ضياء",
            optionsEn: ["Fire : Heat", "Moon : Solar", "Well : Water", "Lamp : Switch"],
            optionsAr: ["النار : حرارة", "القمر : كسوف", "البئر : ماء", "المصباح : زر"],
            correctIndex: 0,
            explanationEn: "The sun is a natural source of light. Similarly, fire is a natural source of heat.",
            explanationAr: "الشمس هي مصدر الضياء الطبيعي. وبالمثل، النار هي مصدر الحرارة."
          },
          {
            id: 4,
            questionEn: "Identify the contextual error: 'Genius is a single spark of intelligence that requires constant laziness to ignite.'",
            questionAr: "حدد الخطأ السياقي: 'العبقرية هي شرارة ذكاء وحيدة تتطلب الكسل المستمر لتشتعل.'",
            optionsEn: ["Genius", "spark", "laziness", "ignite"],
            optionsAr: ["العبقرية", "وحيدة", "الكسل", "لتشتعل"],
            correctIndex: 2,
            explanationEn: "The word 'laziness' is incorrect. Genius requires 'hard work' or 'perseverance' to ignite.",
            explanationAr: "كلمة 'الكسل' خاطئة في هذا السياق، والصحيح هو 'الجهد' أو 'المثابرة' لتشتعل العبقرية."
          },
          {
            id: 5,
            questionEn: "Analogy - Needle : Sewing",
            questionAr: "تناظر لفظي - إبرة : خياطة",
            optionsEn: ["Axe : Tree", "Pen : Writing", "Knife : Metal", "Hammer : Wood"],
            optionsAr: ["فأس : شجرة", "قلم : كتابة", "سكين : معدن", "مطرقة : خشب"],
            correctIndex: 1,
            explanationEn: "A needle is an instrument used for sewing. Similarly, a pen is an instrument used for writing.",
            explanationAr: "الإبرة أداة تستخدم لغرض الخياطة. وبالمثل، القلم أداة تستخدم لغرض الكتابة."
          }
        ]
      }
    ]
  },
  {
    id: "tahsili",
    titleEn: "Tahsili Achievement Test (SAAT)",
    titleAr: "اختبار التحصيل الدراسي العلمي",
    descriptionEn: "Comprehensive assessment of senior high school level Physics, Chemistry, Biology, and Mathematics.",
    descriptionAr: "التقييم الوطني التحصيلي الشامل في مقررات الفيزياء والكيمياء والأحياء والرياضيات.",
    icon: "Shield",
    price: 45,
    topics: [
      {
        id: "tahsili-t1",
        titleEn: "Topic 1: Physics: Mechanics & Electromagnetism",
        titleAr: "الموضوع 1: الفيزياء: الميكانيكا والكهرومغناطيسية",
        descriptionEn: "Master kinematics equations, circular motions, Coulomb's field law, and electromagnetic induction rules.",
        descriptionAr: "قوانين الحركة، المقذوفات، قانون كولوم للمجالات الشحنية، وقواعد الحث الكهرومغناطيسي لفرداي.",
        price: 19,
        materialsEn: [
          "1. Kinematics of Motion: Recall d = vᵢt + 0.5at², and v_f² = vᵢ² + 2ad. Under gravity, acceleration a = -9.8 m/s².",
          "2. Coulomb's Field Law: F = k * (|q₁| * |q₂|) / r², where k = 9 * 10⁹ N·m²/C². Force vector directions depend on polarity.",
          "3. Electromagnetic Induction: Faraday's law states EMF = -N * (ΔΦ/Δt). Inductions relate mechanical work to electricity."
        ],
        materialsAr: [
          "1. معادلات الحركة الخطية: تذكر ف = ع1 × ز + 0.5 ت × ز²، وع2² = ع1² + 2 ت × ف. تسارع الجاذبية الأرضية جـ = -9.8 م/ث².",
          "2. قانون كولوم الكهربائي: ق = أ × (|ش1| × |ش2|) / ف²، حيث أ = 9 × 10^9 نيوتن.م²/كولوم². اتجاه القوة يعتمد على نوع الشحنة.",
          "3. الحث الكهرومغناطيسي: قانون فاراداي ينص على أن القوة الدافعة الكهربية الحثية = -ن × (Δم/Δز)."
        ],
        conceptsEn: [
          { term: "Gravitational Projectile Vectors", desc: "Solving projectile components independently under constant vertical gravity." },
          { term: "Coulombic Force Fields", desc: "Electrostatic interactions between charged particles relative to distance squared." }
        ],
        conceptsAr: [
          { term: "متجهات المقذوفات تحت الجاذبية", desc: "تحليل مركبات حركة المقذوفات الأفقية والرأسية بشكل مستقل تحت تأثير الجاذبية." },
          { term: "مجال قوة كولوم الكهربائي", desc: "التفاعل الكهروستاتيكي بين الجسيمات المشحونة وتأثره العكسي بمربع المسافة بينهما." }
        ],
        questions: [
          {
            id: 1,
            questionEn: "A stone is dropped from a bridge. It hits the water after 3 seconds. What is the approximate height of the bridge? (Ignore air resistance, g = 10 m/s²)",
            questionAr: "سقط حجر من جسر واصطدم بالماء بعد 3 ثوانٍ. ما هو الارتفاع التقريبي للجسر؟ (بإهمال مقاومة الهواء، جـ = 10 م/ث²)",
            optionsEn: ["15 m", "30 m", "45 m", "90 m"],
            optionsAr: ["15 م", "30 م", "45 م", "90 م"],
            correctIndex: 2,
            explanationEn: "Using d = vᵢt + 0.5at², since dropped vᵢ = 0. d = 0.5 * 10 * 3² = 5 * 9 = 45 meters.",
            explanationAr: "باستخدام ف = ع1 × ز + 0.5 ت × ز²، وبما أنه سقط فإن ع1 = 0. ف = 0.5 × 10 × 3² = 5 × 9 = 45 متراً."
          },
          {
            id: 2,
            questionEn: "If the distance between two charges is doubled, the electrostatic force between them is:",
            questionAr: "إذا تضاعفت المسافة بين شحنتين إلى المثلين، فإن القوة الكهروستاتيكية بينهما تصبح:",
            optionsEn: ["Doubled", "Quadrupled", "Halved", "Reduced to one-fourth"],
            optionsAr: ["تتضاعف مرتين", "تتضاعف أربع مرات", "تقل للنصف", "تقل إلى الربع"],
            correctIndex: 3,
            explanationEn: "According to Coulomb's law, force is inversely proportional to the square of distance (1/r²). Doubling the distance (2r) reduces force by 1/2² = 1/4.",
            explanationAr: "وفقاً لقانون كولوم، تتناسب القوة عكسياً مع مربع المسافة (1/ف²). تضاعف المسافة (2ف) يقلل القوة بمقدار 1/2² = 1/4 من قيمتها."
          },
          {
            id: 3,
            questionEn: "Which of the following materials is classified as a semiconductor?",
            questionAr: "أي من المواد التالية يُصنف على أنه شبه موصل للكهرباء؟",
            optionsEn: ["Copper", "Silicon", "Rubber", "Aluminum"],
            optionsAr: ["النحاس", "السيليكون", "المطاط", "الألومنيوم"],
            correctIndex: 1,
            explanationEn: "Silicon is a metalloid belonging to Group 14 and is widely used as a semiconductor in electronic components.",
            explanationAr: "السيليكون عنصر شبه فلزي ينتمي للمجموعة 14 في الجدول الدوري ويستخدم على نطاق واسع كشبه موصل للكهرباء."
          },
          {
            id: 4,
            questionEn: "An electric circuit has a voltage of 12V and a resistance of 4 Ohms. Find the current flowing in the circuit.",
            questionAr: "دائرة كهربائية تحتوي على فرق جهد قدره 12 فولت ومقاومة قدرها 4 أوم. احسب التيار المار بالدائرة.",
            optionsEn: ["3 A", "8 A", "16 A", "48 A"],
            optionsAr: ["3 أمبير", "8 أمبير", "16 أمبير", "48 أمبير"],
            correctIndex: 0,
            explanationEn: "Ohm's Law: I = V / R = 12V / 4 Ohms = 3 Amperes.",
            explanationAr: "قانون أوم: ت = جـ / م = 12 فولت / 4 أوم = 3 أمبير."
          },
          {
            id: 5,
            questionEn: "What is the frequency of an electromagnetic wave with a wavelength of 3 meters? (Speed of light c = 3 * 10^8 m/s)",
            questionAr: "ما هو تردد موجة كهرومغناطيسية طولها الموجي 3 أمتار؟ (سرعة الضوء = 3 × 10^8 م/ث)",
            optionsEn: ["1 * 10^8 Hz", "3 * 10^8 Hz", "9 * 10^8 Hz", "1 * 10^6 Hz"],
            optionsAr: ["1 × 10^8 هرتز", "3 × 10^8 هرتز", "9 × 10^8 هرتز", "1 × 10^6 هرتز"],
            correctIndex: 0,
            explanationEn: "Using f = c / λ = (3 * 10^8) / 3 = 1 * 10^8 Hz.",
            explanationAr: "باستخدام القانون: التردد = سرعة الضوء / الطول الموجي = (3 × 10^8) / 3 = 1 × 10^8 هرتز."
          }
        ]
      },
      {
        id: "tahsili-t2",
        titleEn: "Topic 2: Chemistry: Thermodynamics & Kinetics",
        titleAr: "الموضوع 2: الكيمياء: الديناميكا الحركية والعضوية",
        descriptionEn: "Deep dive into Gibbs free energy, Le Chatelier's equilibrium, rate laws, and IUPAC hydrocarbons.",
        descriptionAr: "دراسة معمقة لطاقة جيبس الحرة، توازن لوشاتيليه، قوانين سرعة التفاعل، وتسمية المركبات العضوية IUPAC.",
        price: 19,
        materialsEn: [
          "1. Gibbs Free Energy: Spontaneity depends on ΔG = ΔH - TΔS. If ΔG is negative, the reaction is spontaneous.",
          "2. Le Chatelier's Principle: When a stress (concentration, temperature, pressure) is applied to an equilibrium system, it shifts to counteract the stress.",
          "3. Organic Hydrocarbons: Alkanes (C_nH_2n+2), Alkenes (C_nH_2n), Alkyne (C_nH_2n-2). Learn prefix naming rules (meth-, eth-, prop-)."
        ],
        materialsAr: [
          "1. طاقة جيبس الحرة: تعتمد تلقائية التفاعل على المعادلة Δجـ = Δهـ - د×Δس. إذا كانت قيمة Δجـ سالبة، يكون التفاعل تلقائياً.",
          "2. مبدأ لوشاتيليه للتوازن: عند إحداث إجهاد (تغيير التركيز أو الحرارة أو الضغط) على نظام متزن، فإنه يزاح بالاتجاه الذي يقلل هذا الإجهاد.",
          "3. تسمية المركبات العضوية: الألكانات (C_nH_2n+2)، الألكينات (C_nH_2n)، الألكاينات (C_nH_2n-2). احفظ البادئات اللاتينية."
        ],
        conceptsEn: [
          { term: "Gibbs Spontaneity Index", desc: "Using enthalpy and entropy differences at temperature thresholds to determine chemical spontaneity." },
          { term: "Le Chatelier Shift", desc: "How dynamic systems adjust coordinate shifts under concentration or temperature stress." }
        ],
        conceptsAr: [
          { term: "مؤشر تلقائية جيبس", desc: "استخدام فروق المحتوى الحراري والعشوائية عند درجات حرارة معينة لتحديد تلقائية التفاعل الكيميائي." },
          { term: "إزاحة التوازن للوشاتيليه", desc: "كيف تضبط الأنظمة الكيميائية المتزنة موضعها عند تعرضها لتغيرات في الحرارة أو الضغط." }
        ],
        questions: [
          {
            id: 1,
            questionEn: "A reaction has positive ΔH and positive ΔS. Under what temperature condition will this reaction be spontaneous?",
            questionAr: "تفاعل كيميائي يمتلك تغير محتوى حراري موجب (ΔH > 0) وعشوائية موجبة (ΔS > 0). في أي ظروف حرارية يكون تلقائياً؟",
            optionsEn: ["At low temperatures", "At high temperatures", "At all temperatures", "It will never be spontaneous"],
            optionsAr: ["عند درجات الحرارة المنخفضة", "عند درجات الحرارة المرتفعة", "عند جميع درجات الحرارة", "لن يكون تلقائياً أبداً"],
            correctIndex: 1,
            explanationEn: "ΔG = ΔH - TΔS. For ΔG to be negative (spontaneous), the TΔS term must exceed ΔH, which requires a large temperature T (high temperatures).",
            explanationAr: "المعادلة: Δجـ = Δهـ - د×Δس. لكي تصبح Δجـ سالبة (تلقائي)، يجب أن تتجاوز قيمة (د×Δس) قيمة Δهـ، وهو ما يتطلب درجة حرارة مرتفعة."
          },
          {
            id: 2,
            questionEn: "For the exothermic equilibrium N₂ + 3H₂ ⇌ 2NH₃ + Heat, raising the temperature will shift the reaction in which direction?",
            questionAr: "في التفاعل المتزن الطارد للحرارة N₂ + 3H₂ ⇌ 2NH₃ + حرارة، رفع درجة الحرارة يزيح التفاعل في أي اتجاه؟",
            optionsEn: ["Forward (to NH₃)", "Reverse (to reactants)", "It will not shift", "It halts the reaction"],
            optionsAr: ["الأمامي (نحو NH₃)", "العكسي (نحو المتفاعلات)", "لا يتأثر موضع الاتزان", "يتوقف التفاعل تماماً"],
            correctIndex: 1,
            explanationEn: "Since heat is a product, raising temperature shifts the equilibrium in the reverse direction to absorb the excess heat.",
            explanationAr: "بما أن الحرارة من نواتج التفاعل، فإن رفع درجة الحرارة يجعل النظام يزاح في الاتجاه العكسي (الماص للحرارة) لامتلاك الحرارة الفائضة."
          },
          {
            id: 3,
            questionEn: "What is the IUPAC name of the hydrocarbon with formula C₃H₈?",
            questionAr: "ما هو الاسم النظامي (IUPAC) للمركب الهيدروكربوني ذو الصيغة C₃H₈؟",
            optionsEn: ["Methane", "Ethane", "Propane", "Butane"],
            optionsAr: ["ميثان", "إيثان", "بروبان", "بوتان"],
            correctIndex: 2,
            explanationEn: "C₃H₈ follows the alkane formula C_nH_2n+2 where n=3. The prefix for 3 carbons is prop-, hence Propane.",
            explanationAr: "المركب C₃H₈ يتبع صيغة الألكانات C_n H_2n+2 حيث ن = 3. البادئة لـ 3 ذرات كربون هي 'بروب'، لذلك يسمى بروبان."
          },
          {
            id: 4,
            questionEn: "A catalyst speeds up a chemical reaction by:",
            questionAr: "يقوم العامل الحفاز بتسريع التفاعل الكيميائي عن طريق:",
            optionsEn: ["Increasing activation energy", "Decreasing activation energy", "Increasing enthalpy ΔH", "Increasing average collision speed"],
            optionsAr: ["زيادة طاقة التنشيط", "تقليل طاقة التنشيط", "زيادة التغير في المحتوى الحراري", "زيادة سرعة التصادم المتوسطة"],
            correctIndex: 1,
            explanationEn: "A catalyst provides an alternative pathway with a lower activation energy, allowing more molecules to react per unit time.",
            explanationAr: "يعمل الحفاز على توفير مسار بديل للتفاعل ذو طاقة تنشيط أقل، مما يسمح لعدد أكبر من الجزيئات بالتفاعل بسرعة."
          },
          {
            id: 5,
            questionEn: "What is the oxidation number of Hydrogen in H₂O?",
            questionAr: "ما هو عدد تأكسد الهيدروجين في مركب الماء H₂O؟",
            optionsEn: ["-2", "-1", "+1", "+2"],
            optionsAr: ["-2", "-1", "+1", "+2"],
            correctIndex: 2,
            explanationEn: "In water, Oxygen has an oxidation number of -2. The two Hydrogen atoms must balance this: 2(H) + (-2) = 0 => H = +1.",
            explanationAr: "في الماء، عدد تأكسد الأكسجين هو -2. ذرات الهيدروجين تعادل الشحنة: 2(هـ) + (-2) = 0 => هـ = +1."
          }
        ]
      },
      {
        id: "tahsili-t3",
        titleEn: "Topic 3: Math & Biology: Calculus & Genetics",
        titleAr: "الموضوع 3: الرياضيات والأحياء: التفاضل والتكامل والوراثة",
        descriptionEn: "Master calculus limits, derivative slopes, integration areas, and Mendelian dihybrid crosses.",
        descriptionAr: "قواعد الاشتقاق، إيجاد النهايات، حساب مساحات التكامل، والوراثة المندلية وتلقيح الجينات الهجين.",
        price: 19,
        materialsEn: [
          "1. Calculus Limits and Derivatives: Power rule: d/dx(xⁿ) = n·xⁿ⁻¹. Integration is the inverse operation, calculating area under curves.",
          "2. Mendelian Genetics: Punnett squares track allele distributions. Monohybrid cross of heterozygotes yields a 3:1 phenotype ratio.",
          "3. Cell Structures and Respiration: Mitochondria perform cellular respiration, converting glucose to ATP energy."
        ],
        materialsAr: [
          "1. تفاضل وتكامل الدوال: قانون القوة: د/دسين (س^ن) = ن × س^(ن-1). والتكامل هو العملية العكسية للاشتقاق لحساب المساحة تحت المنحنى.",
          "2. الوراثة المندلية: مخطط بانيت يوضح توزيع الأليلات. تزاوج صفتين هجينتين ينتج عنه نسبة مظهرية 3:1 للصبيان.",
          "3. التنفس الخلوي والميتوكندريا: الميتوكندريا هي مصنع الطاقة بالخلية حيث تحول الجلوكوز إلى جزيئات الطاقة ATP."
        ],
        conceptsEn: [
          { term: "Calculus Derivative Slopes", desc: "Finding instantaneous rate of change as limit of secant slopes." },
          { term: "Heterozygous Genetics Ratio", desc: "Expected inheritance distributions for dominant vs recessive alleles." }
        ],
        conceptsAr: [
          { term: "ميل مشتقة الدوال", desc: "حساب معدل التغير اللحظي للدالة كالنهاية الرياضية لخطوط المماس." },
          { term: "نسبة الجينات الهجينة", desc: "التوزيع الوراثي المتوقع للأليلات السائدة والمتنحية في الأجيال الناتجة." }
        ],
        questions: [
          {
            id: 1,
            questionEn: "Find the limit as x approaches 3 of (x² - 9) / (x - 3).",
            questionAr: "أوجد نهاية الدالة عندما تقترب س من 3 لـ: (س² - 9) / (س - 3).",
            optionsEn: ["3", "6", "0", "Does not exist"],
            optionsAr: ["3", "6", "0", "غير موجودة"],
            correctIndex: 1,
            explanationEn: "Factor the numerator: (x-3)(x+3) / (x-3) = x+3. As x approaches 3, 3 + 3 = 6.",
            explanationAr: "حلل البسط: (س-3)(س+3) / (س-3) = س+3. عندما تقترب س من 3: 3 + 3 = 6."
          },
          {
            id: 2,
            questionEn: "What is the derivative of the function f(x) = 3x² + 5x - 2?",
            questionAr: "ما هي مشتقة الدالة د(س) = 3س² + 5س - 2؟",
            optionsEn: ["6x + 5", "3x + 5", "6x² + 5", "6x - 2"],
            optionsAr: ["6س + 5", "3س + 5", "6س² + 5", "6س - 2"],
            correctIndex: 0,
            explanationEn: "Using power rule: d/dx(3x²) = 6x, d/dx(5x) = 5, and derivative of constant is 0. So f'(x) = 6x + 5.",
            explanationAr: "باستخدام قاعدة القوة: مشتقة 3س² هي 6س، ومشتقة 5س هي 5، والثابت مشتقته صفر. النتيجة = 6س + 5."
          },
          {
            id: 3,
            questionEn: "In humans, brown eyes (B) are dominant over blue eyes (b). If a heterozygous brown-eyed father (Bb) and a blue-eyed mother (bb) have children, what is the probability of having a blue-eyed child?",
            questionAr: "في البشر، لون العين البني (ب) سائد على الأزرق (بـ). تزاوج أب هجين ذو عين بنية (ب بـ) مع أم ذات عين زرقاء (بـ بـ). ما هو احتمال ولادة طفل ذو عين زرقاء؟",
            optionsEn: ["0%", "25%", "50%", "75%"],
            optionsAr: ["0%", "25%", "50%", "75%"],
            correctIndex: 2,
            explanationEn: "Cross Bb x bb results in offspring: Bb, Bb, bb, bb. The probability of blue-eyed offspring (bb) is 2 out of 4, which is 50%.",
            explanationAr: "التزاوج (ب بـ) × (بـ بـ) ينتج أطفالاً: ب بـ، ب بـ، بـ بـ، بـ بـ. احتمال الأطفال ذوي العيون الزرقاء هو 2 من 4 = 50%."
          },
          {
            id: 4,
            questionEn: "Which organelle is responsible for generating energy (ATP) in a eukaryotic cell?",
            questionAr: "أي عضية خلوية مسؤولة عن إنتاج الطاقة (ATP) في الخلايا حقيقية النواة؟",
            optionsEn: ["Ribosome", "Chloroplast", "Golgi Apparatus", "Mitochondria"],
            optionsAr: ["الريبوسوم", "البلاستيدة الخضراء", "جهاز جولجي", "الميتوكندريا"],
            correctIndex: 3,
            explanationEn: "Mitochondria are known as the powerhouses of the cell because they perform aerobic cellular respiration to generate ATP.",
            explanationAr: "الميتوكندريا هي بيوت الطاقة في الخلية لأنها تقوم بالتنفس الخلوي لإنتاج جزيئات الـ ATP."
          },
          {
            id: 5,
            questionEn: "If the limit of f(x) as x approaches a exists, is it always equal to f(a)?",
            questionAr: "إذا كانت نهاية د(س) عندما تقترب س من (أ) موجودة، فهل تساوي دائماً قيمة د(أ)؟",
            optionsEn: ["Yes, always", "No, only if f is continuous at a", "No, it is never equal", "Yes, except when a=0"],
            optionsAr: ["نعم، دائماً", "لا، فقط إذا كانت الدالة متصلة عند أ", "لا، لا تساويها أبداً", "نعم، عدا عندما أ=0"],
            correctIndex: 1,
            explanationEn: "By definition, a function is continuous at a point x=a if and only if the limit as x approaches a is equal to f(a).",
            explanationAr: "حسب التعريف الرياضي، تكون الدالة متصلة عند نقطة س = أ فقط إذا كانت النهاية عندما تقترب س من أ تساوي قيمة الدالة د(أ)."
          }
        ]
      }
    ]
  },
  {
    id: "step",
    titleEn: "STEP English Test",
    titleAr: "اختبار كفايات اللغة الإنجليزية",
    descriptionEn: "Standardized Test of English Proficiency designed for university enrollment and workplace screening.",
    descriptionAr: "التقييم الوطني الموحد لقياس الكفاءة والمهارات اللغوية الإنجليزية.",
    icon: "BookOpen",
    price: 39,
    topics: [
      {
        id: "step-t1",
        titleEn: "Topic 1: English Grammar & Verb Tenses",
        titleAr: "الموضوع 1: قواعد اللغة الإنجليزية والأزمنة",
        descriptionEn: "Master perfect chronologies, active/passive voice, and subject-verb agreement rules.",
        descriptionAr: "استيعاب أزمنة الماضي التام والفاعل والمفعول وصيغة المبني للمجهول وقواعد المطابقة.",
        price: 15,
        materialsEn: [
          "1. Past Perfect Chronology: Use the past perfect (had + past participle) for the older of two past actions: 'The train had left when we arrived.'",
          "2. Passive Voice Conversion: Object + form of verb 'to be' + Past Participle. Make sure the tense of 'to be' matches the original active sentence.",
          "3. Subject-Verb Agreement: Words joined by 'along with', 'as well as', or 'together with' do not change the number of the subject: 'The teacher, along with the students, is coming.'"
        ],
        materialsAr: [
          "1. تسلسل الماضي التام: استخدم الماضي التام (had + التصريف الثالث) للعمل الأقدم زمنياً في الماضي: 'لقد غادر القطار عندما وصلنا'.",
          "2. المبني للمجهول: المفعول به + صيغة فعل الكينونة الملائم + التصريف الثالث للعمل.",
          "3. مطابقة الفاعل والفاعل: العبارات التي تبدأ بـ 'along with' لا تغير من صيغة الفرد أو الجمع للفاعل الرئيسي."
        ],
        conceptsEn: [
          { term: "Past Perfect Chronology", desc: "Ordering past events by using past perfect for the earlier event." },
          { term: "Passive Verb Conversion", desc: "Shifting focus from agent to object using form of 'to be' + past participle." }
        ],
        conceptsAr: [
          { term: "تسلسل الماضي التام", desc: "ترتيب أحداث الماضي باستخدام الماضي التام للحدث الأقدم زمنياً." },
          { term: "تحويل الفعل للمجهول", desc: "نقل التركيز من الفاعل للمفعول به باستخدام صيغة فعل الكينونة + التصريف الثالث." }
        ],
        questions: [
          {
            id: 1,
            questionEn: "By the time the rescue team arrived, the hikers ________ for twelve hours.",
            questionAr: "بحلول وقت وصول فريق الإنقاذ، كان المتنزهون ________ لمدة اثني عشر ساعة.",
            optionsEn: ["walked", "had been walking", "were walking", "have walked"],
            optionsAr: ["walked", "had been walking", "were walking", "have walked"],
            correctIndex: 1,
            explanationEn: "We use past perfect continuous ('had been walking') to show an action that started in the past and continued up until another point in the past.",
            explanationAr: "نستخدم الماضي التام المستمر للتدليل على حدث بدأ بالماضي واستمر حتى نقطة زمنية أخرى بالماضي."
          },
          {
            id: 2,
            questionEn: "Active: 'The chef prepares the meal.' Choose the correct passive form.",
            questionAr: "جملة مبني للمعلوم: 'المطبخ يعد الوجبة.' اختر الصيغة الصحيحة للمبني للمجهول.",
            optionsEn: ["The meal is prepared by the chef.", "The meal was prepared by the chef.", "The meal is preparing by the chef.", "The meal has been prepared by the chef."],
            optionsAr: ["The meal is prepared by the chef.", "The meal was prepared by the chef.", "The meal is preparing by the chef.", "The meal has been prepared by the chef."],
            correctIndex: 0,
            explanationEn: "The active sentence is in present simple. The passive form uses present simple of 'to be' (is) + past participle (prepared).",
            explanationAr: "الجملة بالمعلوم مضارع بسيط. مبني للمجهول يستخدم مضارع بسيط من فعل الكينونة (is) + التصريف الثالث (prepared)."
          },
          {
            id: 3,
            questionEn: "Neither of the two candidates ________ qualified for the position.",
            questionAr: "كلا المرشحين الاثنين ________ مؤهلاً للمنصب.",
            optionsEn: ["are", "is", "were", "have"],
            optionsAr: ["are", "is", "were", "have"],
            correctIndex: 1,
            explanationEn: "'Neither' is a singular pronoun and takes a singular verb ('is').",
            explanationAr: "كلمة 'Neither' تعتبر ضمير مفرد وتتطلب فعلاً مفرداً ('is')."
          },
          {
            id: 4,
            questionEn: "She worked ________ hard ________ she passed the exam easily.",
            questionAr: "لقد عملت بجد ________ لدرجة أنها ________ نجحت بالاختبار بسهولة.",
            optionsEn: ["so / that", "such / that", "too / to", "very / that"],
            optionsAr: ["so / that", "such / that", "too / to", "very / that"],
            correctIndex: 0,
            explanationEn: "The correlative conjunction 'so... that' is used to show cause and effect with an adjective ('hard').",
            explanationAr: "رابط العطف المتلازم 'so... that' يُسخدم لبيان السبب والنتيجة مع صفة أو حال."
          },
          {
            id: 5,
            questionEn: "If he had studied, he ________ passed the test.",
            questionAr: "لو أنه درس، لكان ________ قد نجح بالاختبار.",
            optionsEn: ["would have", "will have", "would", "had"],
            optionsAr: ["would have", "will have", "would", "had"],
            correctIndex: 0,
            explanationEn: "This is a third conditional sentence, representing an imaginary past. Structure: If + past perfect, would have + past participle.",
            explanationAr: "هذه حالة الشرط الثالثة للتعبير عن ماضٍ تخيلي. الهيكل: If + ماضي تام، would have + تصريف ثالث."
          }
        ]
      },
      {
        id: "step-t2",
        titleEn: "Topic 2: Subjunctive Conditionals & Reading Comprehension",
        titleAr: "الموضوع 2: الجمل الشرطية واستيعاب المقروء",
        descriptionEn: "Master subjunctive conditionals (using 'were' for imaginary states) and scanning strategies.",
        descriptionAr: "احتراف شروط التمني الافتراضية، وقراءة وفهم النصوص وحل مسائل استيعاب المقروء.",
        price: 15,
        materialsEn: [
          "1. Subjunctive Mood: In hypothetical or contrary-to-fact conditions, use 'were' instead of 'was' for all subjects: 'If I were you, I would accept.'",
          "2. Reading Strategy: Scan for key numbers, dates, or terms instead of reading word-for-word. Check the first and last sentence of paragraphs.",
          "3. Preposition Collocations: Memorize noun/verb prepositions: 'interested in', 'agree with', 'depend on'."
        ],
        materialsAr: [
          "1. أسلوب التمني الافتراضي: في الشروط الافتراضية المنافية للواقع، نستخدم 'were' بدلاً من 'was' لكافة الفواعل: 'لو كنت مكانك لوافقت'.",
          "2. استراتيجية القراءة: ابحث عن أرقام أو تواريخ محددة بدلاً من قراءة النص كلمة بكلمة. ركز على الجمل الافتتاحية والختامية.",
          "3. روابط حروف الجر: احفظ الاقترانات الصحيحة: مهتم بـ (interested in)، متفق مع (agree with)."
        ],
        conceptsEn: [
          { term: "Subjunctive Conditionals", desc: "Using subjunctive 'were' for hypothetical or unreal present conditions." },
          { term: "Text Scanning Strategy", desc: "Locating answers by identifying semantic keywords rather than reading fully." }
        ],
        conceptsAr: [
          { term: "الشرط الافتراضي للتمني", desc: "استخدام 'were' للتعبير عن الحالات الافتراضية غير الواقعية في المضارع." },
          { term: "استراتيجية مسح النصوص", desc: "تحديد مواقع الإجابات في النص بالبحث عن الكلمات المفتاحية دون الحجة للقراءة الكاملة." }
        ],
        questions: [
          {
            id: 1,
            questionEn: "If I ________ rich, I would travel around the world.",
            questionAr: "لو ________ غنياً، لسافرت حول العالم.",
            optionsEn: ["was", "were", "am", "be"],
            optionsAr: ["was", "were", "am", "be"],
            correctIndex: 1,
            explanationEn: "For contrary-to-fact subjunctive conditions, 'were' is used with all subjects.",
            explanationAr: "في حالات التمني الافتراضية غير الواقعية، نستخدم 'were' مع جميع الفواعل."
          },
          {
            id: 2,
            questionEn: "They are looking forward to ________ their relatives next week.",
            questionAr: "إنهم يتطلعون بشوق إلى ________ أقاربهم الأسبوع المقبل.",
            optionsEn: ["visit", "visiting", "visited", "visits"],
            optionsAr: ["visit", "visiting", "visited", "visits"],
            correctIndex: 1,
            explanationEn: "The phrasal verb 'look forward to' is followed by a gerund (-ing form), not a base verb.",
            explanationAr: "الفعل المركب 'look forward to' يتبعه دائماً اسم مصدر ينتهي بـ (-ing)."
          },
          {
            id: 3,
            questionEn: "He is highly capable ________ handling this difficult project.",
            questionAr: "إنه قادر بشكل كبير ________ على تولي هذا المشروع الصعب.",
            optionsEn: ["of", "to", "in", "for"],
            optionsAr: ["of", "to", "in", "for"],
            correctIndex: 0,
            explanationEn: "The adjective 'capable' collocates with the preposition 'of'.",
            explanationAr: "الصفة 'capable' تقترن دائماً بحرف الجر 'of'."
          },
          {
            id: 4,
            questionEn: "Choose the correct spelling:",
            questionAr: "اختر الإملاء الصحيح للكلمة:",
            optionsEn: ["accommodation", "acomodation", "accomodation", "acommodation"],
            optionsAr: ["accommodation", "acomodation", "accomodation", "acommodation"],
            correctIndex: 0,
            explanationEn: "'Accommodation' is spelled with double 'c' and double 'm'.",
            explanationAr: "الكلمة 'accommodation' تُكتب بصيغة دبل 'c' ودبل 'm'."
          },
          {
            id: 5,
            questionEn: "Although it was raining, they went out. Which word shows contrast?",
            questionAr: "بالرغم من أنها كانت تمطر، فقد خرجوا. أي كلمة توضح التناقض؟",
            optionsEn: ["Although", "was", "went", "out"],
            optionsAr: ["Although", "was", "went", "out"],
            correctIndex: 0,
            explanationEn: "'Although' is a subordinating conjunction used to show contrast or concession.",
            explanationAr: "الرابط 'Although' يستخدم لتوضيح التباين أو التناقض بين جملتين."
          }
        ]
      }
    ]
  },
  {
    id: "gateng",
    titleEn: "GAT English Version",
    titleAr: "اختبار القدرات باللغة الإنجليزية",
    descriptionEn: "English variant of the GAT cognitive assessment for international school students.",
    descriptionAr: "النسخة المترجمة للإنجليزية من اختبار القدرات العامة لطلاب المدارس العالمية.",
    icon: "Award",
    price: 39,
    topics: [
      {
        id: "gateng-t1",
        titleEn: "Topic 1: Quantitative Logic & Geometry",
        titleAr: "الموضوع 1: المنطق الكمي والهندسة",
        descriptionEn: "Master circular permutations, polygon geometry, and set overlap calculations in English GAT format.",
        descriptionAr: "قوانين التباديل الدائرية، مجموع زوايا المضلعات، والتقاطع الكهربائي للمجموعات.",
        price: 15,
        materialsEn: [
          "1. Circular Permutations: The number of ways to arrange n distinct objects in a circle is (n - 1)!. If fixed reference point exists, it becomes n!.",
          "2. Polygon Angles: Sum of interior angles of a convex polygon is (n - 2) * 180 degrees.",
          "3. Set Overlap: Use A + B - Both + Neither = Total to solve overlap word problems."
        ],
        materialsAr: [
          "1. التباديل الدائرية: عدد طرق ترتيب (ن) من العناصر في شكل دائرى هو (ن-1)!. وإذا كان هناك نقطة مرجع ثابتة تصبح ن!.",
          "2. زوايا المضلع: مجموع قياسات الزوايا الداخلية لأي مضلع محدب هو (ن-2) × 180 درجة.",
          "3. تداخل المجموعات: نستخدم القانون (أ + ب - كلاهما + لا أحد = المجموع الكلي) لحل مسائل التداخل."
        ],
        conceptsEn: [
          { term: "Circular Permutations Skew", desc: "Arranging items relative to each other in a loop without absolute start point." },
          { term: "Set Union Overlap Formula", desc: "Accounting for intersection in set union calculations." }
        ],
        conceptsAr: [
          { term: "التباديل الدائرية المنحرفة", desc: "ترتيب العناصر بالنسبة لبعضها في حلقة مغلقة دون وجود نقطة بداية مطلقة." },
          { term: "صيغة اتحاد المجموعات المتداخلة", desc: "احتساب المنطقة المشتركة عند جمع المجموعات لتجنب التكرار." }
        ],
        questions: [
          {
            id: 1,
            questionEn: "In how many ways can 5 people be seated around a circular table?",
            questionAr: "بكم طريقة يمكن لـ 5 أشخاص الجلوس حول طاولة دائرية؟",
            optionsEn: ["120", "24", "60", "720"],
            optionsAr: ["120", "24", "60", "720"],
            correctIndex: 1,
            explanationEn: "Circular permutation formula is (n-1)!. For 5 people, it is (5-1)! = 4! = 4 * 3 * 2 * 1 = 24.",
            explanationAr: "قانون الترتيب الدائري هو (ن-1)!. لـ 5 أشخاص: (5-1)! = 4! = 4 × 3 × 2 × 1 = 24 طريقة."
          },
          {
            id: 2,
            questionEn: "What is the sum of the interior angles of a regular hexagon?",
            questionAr: "ما هو مجموع الزوايا الداخلية للشكل السداسي المنتظم؟",
            optionsEn: ["540°", "720°", "900°", "1080°"],
            optionsAr: ["540°", "720°", "900°", "1080°"],
            correctIndex: 1,
            explanationEn: "Using sum = (n - 2) * 180 for hexagon (n=6): (6 - 2) * 180 = 4 * 180 = 720 degrees.",
            explanationAr: "باستخدام القانون: مجموع الزوايا = (ن-2) × 180. للشكل السداسي (ن=6): (6-2) × 180 = 4 × 180 = 720 درجة."
          },
          {
            id: 3,
            questionEn: "In a class of 30 students, 18 study French and 15 study German. If 5 study both, how many study neither?",
            questionAr: "في فصل دراسي يحتوي على 30 طالباً، 18 يدرسون الفرنسية و 15 يدرسون الألمانية. إذا كان 5 يدرسون اللغتين معاً، فكم عدد الطلاب الذين لا يدرسون أي لغة منهما؟",
            optionsEn: ["2", "5", "8", "12"],
            optionsAr: ["2", "5", "8", "12"],
            correctIndex: 0,
            explanationEn: "Total = A + B - Both + Neither => 30 = 18 + 15 - 5 + Neither => 30 = 28 + Neither => Neither = 2.",
            explanationAr: "المجموع = أ + ب - كلاهما + لا أحد => 30 = 18 + 15 - 5 + لا أحد => 30 = 28 + لا أحد = لا أحد = 2."
          },
          {
            id: 4,
            questionEn: "What is the area of a circle with a circumference of 10π?",
            questionAr: "ما هي مساحة دائرة محيطها يساوي 10ط (10π)؟",
            optionsEn: ["25π", "50π", "100π", "10π"],
            optionsAr: ["25ط", "50ط", "100ط", "10ط"],
            correctIndex: 0,
            explanationEn: "Circumference = 2πr = 10π => r = 5. Area = πr² = π(5²) = 25π.",
            explanationAr: "المحيط = 2 × ط × نق = 10ط => نق = 5. المساحة = ط × نق² = ط × 5² = 25ط."
          },
          {
            id: 5,
            questionEn: "Simplify the expression: (2x² * 3x³) / x^4.",
            questionAr: "بسط المقدار الجبري التالي: (2س² × 3س³) / س^4.",
            optionsEn: ["5x", "6x", "6x²", "5x²"],
            optionsAr: ["5س", "6س", "6س²", "5س²"],
            correctIndex: 1,
            explanationEn: "(2x² * 3x³) / x^4 = 6x^5 / x^4 = 6x.",
            explanationAr: "(2س² × 3س³) / س^4 = 6س^5 / س^4 = 6س."
          }
        ]
      },
      {
        id: "gateng-t2",
        titleEn: "Topic 2: Verbal Equivalence & Analogies",
        titleAr: "الموضوع 2: التكافؤ اللفظي والتناظر",
        descriptionEn: "Improve sentence completions, synonym matches, and logical relations in English format.",
        descriptionAr: "تطوير مهارات تكملة الجمل واختيار المرادفات الصحيحة وتحديد العلاقات اللفظية باللغة الإنجليزية.",
        price: 15,
        materialsEn: [
          "1. Vocabulary Completion: Look for transition words like 'although' or 'because' that signal contract or agreement.",
          "2. Analogy Semantic Bridges: Build an active sentence logic. Check the parts of speech (noun-noun, verb-noun).",
          "3. Passage Inference: Answers must be deduced logically from the text, avoiding assumptions."
        ],
        materialsAr: [
          "1. إكمال الجمل المفرداتية: ابحث عن الكلمات الانتقالية مثل 'بالرغم من' أو 'بسبب' لمعرفة التناقض أو التوافق السياقي.",
          "2. جمل التناظر اللغوي: ابنِ منطقاً فعلياً واضحاً وتأكد من أقسام الكلام (اسم مع اسم، فعل مع اسم).",
          "3. الاستدلال من النص: يجب استخلاص الإجابات منطقياً من النص دون فرضيات خارجية."
        ],
        conceptsEn: [
          { term: "Semantic Contrast Markers", desc: "Clues in sentences like 'nevertheless' that flip expected meaning." },
          { term: "Analogy Class Matching", desc: "Matching word class types between prompt pair and candidate answers." }
        ],
        conceptsAr: [
          { term: "علامات التباين الدلالي", desc: "دلالات في الجمل مثل 'مع ذلك' تقلب المعنى المتوقع للجملة." },
          { term: "مطابقة أقسام الكلام بالتناظر", desc: "مطابقة فئة الكلمات (اسم، فعل، صفة) بين زوج السؤال وزوج الإجابة." }
        ],
        questions: [
          {
            id: 1,
            questionEn: "Analogy - Shield : Protect",
            questionAr: "تناظر لفظي - درع : حماية",
            optionsEn: ["Sword : Strike", "Helmet : Bike", "Glove : Warmth", "Key : Door"],
            optionsAr: ["سيف : ضرب", "خوذة : دراجة", "قفاز : دافئ", "مفتاح : باب"],
            correctIndex: 0,
            explanationEn: "A shield is used to protect. Similarly, a sword is used to strike (tool to function).",
            explanationAr: "الدرع يُستخدم لغرض الحماية. وبالمثل، السيف يُستخدم لغرض الضرب."
          },
          {
            id: 2,
            questionEn: "Choose the word that best completes the sentence: 'Although he was highly skilled, he remained ________.'",
            questionAr: "اختر الكلمة الأنسب لإكمال الفراغ: 'بالرغم من أنه كان ماهراً للغاية، فقد ظل ________.'",
            optionsEn: ["arrogant", "proud", "humble", "boastful"],
            optionsAr: ["متكبراً", "فخوراً", "متواضعاً", "متباهياً"],
            correctIndex: 2,
            explanationEn: "The word 'Although' signals contrast. The contrast to 'highly skilled' in this options is 'humble'.",
            explanationAr: "الرابط 'Although' يدل على التناقض. والتباين مع 'ماهراً للغاية' هنا هو 'متواضعاً'."
          },
          {
            id: 3,
            questionEn: "Analogy - Oasis : Desert",
            questionAr: "تناظر لفظي - واحة : صحراء",
            optionsEn: ["Island : Ocean", "Forest : Tree", "Mountain : Peak", "River : Lake"],
            optionsAr: ["جزيرة : محيط", "غابة : شجرة", "جبل : قمة", "نهر : بحيرة"],
            correctIndex: 0,
            explanationEn: "An oasis is a fertile spot located inside a dry desert. Similarly, an island is a land mass located inside an ocean.",
            explanationAr: "الواحة هي بقعة خصبة تقع داخل الصحراء الجافة. وبالمثل، الجزيرة هي يابسة تقع داخل المحيط."
          },
          {
            id: 4,
            questionEn: "Identify the word that best fits: 'Due to the ________ of evidence, the case was dismissed.'",
            questionAr: "اختر الكلمة المناسبة للفراغ: 'نظراً لـ ________ الأدلة، تم إسقاط القضية.'",
            optionsEn: ["abundance", "lack", "clarity", "weight"],
            optionsAr: ["وفرة", "نقص", "وضوح", "ثقل"],
            correctIndex: 1,
            explanationEn: "'dismissed' means dropped. Cases are dropped due to a 'lack' (scarcity) of evidence.",
            explanationAr: "إسقاط القضية يدل على عدم كفايتها، بالتالي تسقط القضية بسبب 'نقص' (عدم وجود) الأدلة."
          },
          {
            id: 5,
            questionEn: "Analogy - Bark : Tree",
            questionAr: "تناظر لفظي - لحاء : شجرة",
            optionsEn: ["Peel : Fruit", "Leaf : Branch", "Root : Soil", "Petal : Flower"],
            optionsAr: ["قشر : فاكهة", "ورقة : غصن", "جذر : تربة", "بتلة : زهرة"],
            correctIndex: 0,
            explanationEn: "Bark is the outer protective layer of a tree. Similarly, peel is the outer protective layer of a fruit.",
            explanationAr: "اللحاء هو الغلاف الخارجي الواقي للشجرة. وبالمثل، القشر هو الغلاف الخارجي للفاكهة."
          }
        ]
      }
    ]
  },
  {
    id: "mawhiba",
    titleEn: "Mawhiba Giftedness Test",
    titleAr: "مقياس موهبة للقدرات العقلية",
    descriptionEn: "Cognitive assessment evaluating spatial logic, mental rotation, and pattern matrices.",
    descriptionAr: "مقياس موهبة الوطني للقدرات العقلية المتعددة والاستدلال المكاني والتحليلي.",
    icon: "BookOpen",
    price: 39,
    topics: [
      {
        id: "mawhiba-t1",
        titleEn: "Topic 1: Spatial Rotation & Shape Folding",
        titleAr: "الموضوع 1: الدوران الفراغي وطي الأشكال",
        descriptionEn: "Master mental 3D rotations, shape folding rules, and isometric projections.",
        descriptionAr: "مهارات التدوير الذهني ثلاثي الأبعاد، قواعد طي وتكوين الصناديق والمكعبات، والإسقاط الهندسي.",
        price: 15,
        materialsEn: [
          "1. 3D Mental Rotation: Select a reference point (an edge or shading). Track its direction change relative to the axis of rotation.",
          "2. Cube Folding (Opposite Rule): In flat cube nets, faces separated by exactly one square are always opposite to each other. They can never be adjacent.",
          "3. Shape Reflection: Track symmetrical changes across a vertical or horizontal reflection line."
        ],
        materialsAr: [
          "1. التدوير الذهني للأشكال: اختر نقطة مرجعية (مثل زاوية أو وجه مظلل) وتتبع اتجاه تغيرها بالنسبة لمحور الدوران.",
          "2. طي الأشكال والمكعبات (قاعدة الأوجه المقابلة): في شبكة المكعب المفرودة، الأوجه التي يفصل بينها مربع واحد تكون متقابلة دائماً ولا تلتقي.",
          "3. انعكاس الأشكال: تتبع التغيرات المتناظرة عبر خطوط الانعكاس الرأسية أو الأفقية."
        ],
        conceptsEn: [
          { term: "Mental 3D Rotation", desc: "Rotating mental models of solid objects in coordinate space." },
          { term: "Cube Net Opposite Rule", desc: "Recognizing that opposite faces in a cube net can never touch at any edge." }
        ],
        conceptsAr: [
          { term: "التدوير الذهني ثلاثي الأبعاد", desc: "تدوير النماذج الذهنية للأجسام الصلبة في الفضاء الهندسي." },
          { term: "قاعدة الأوجه المتقابلة للشبكة", desc: "معرفة أن الأوجه المتقابلة في شبكة المكعب المفرودة لا يمكن أن تلتقي عند أي حافة." }
        ],
        questions: [
          {
            id: 1,
            questionEn: "A flat cross-shaped net consists of 6 squares. If we fold this net into a solid cube, which face will be directly opposite the center square of the cross?",
            questionAr: "شبكة مفرودة على شكل صليب تتكون من 6 مربعات. إذا قمنا بطي هذه الشبكة لتكوين مكعب، فأي وجه سيكون مقابلاً للوجه الأوسط؟",
            optionsEn: ["The bottom square", "The top square", "The right square", "The left square"],
            optionsAr: ["المربع السفلي", "المربع العلوي", "المربع الأيمن", "المربع الأيسر"],
            correctIndex: 0,
            explanationEn: "In a cross shape, the top and bottom squares fold up to become opposite to each other, with the center opposite the bottom end.",
            explanationAr: "في شبكة الصليب، يطوى الجزء العلوي والسفلي ليصبحا متقابلين، ويكون المربع الأوسط مقابلاً للمربع السفلي للمكعب."
          },
          {
            id: 2,
            questionEn: "A 3D object is rotated 90 degrees clockwise around the Y-axis. If its front face was pointing north, where does it point now?",
            questionAr: "جسم ثلاثي الأبعاد تم تدويره 90 درجة مع عقارب الساعة حول المحور الصادي. إذا كان وجهه الأمامي يشير للشمال، فأين يشير الآن؟",
            optionsEn: ["East", "West", "South", "Up"],
            optionsAr: ["الشرق", "الغرب", "الجنوب", "الأعلى"],
            correctIndex: 0,
            explanationEn: "Rotating clockwise around the vertical Y-axis shifts the direction from North (0°) to East (90°).",
            explanationAr: "التدوير مع عقارب الساعة حول المحور الصادي الرأسي يغير الاتجاه من الشمال (0 درجة) إلى الشرق (90 درجة)."
          },
          {
            id: 3,
            questionEn: "Which of the following flat patterns can be folded to form a complete hollow cylinder?",
            questionAr: "أي من الأنماط المسطحة التالية يمكن طيه لتكوين أسطوانة مجوفة كاملة؟",
            optionsEn: ["Two circles and one rectangle", "One circle and two rectangles", "Three circles", "One square and one circle"],
            optionsAr: ["دائرتان ومستطيل واحد", "دائرة واحدة ومستطيلان", "ثلاث دوائر", "مربع واحد ودائرة واحدة"],
            correctIndex: 0,
            explanationEn: "A cylinder's net consists of a rectangle (forming the curved surface) and two circles (forming the top and bottom bases).",
            explanationAr: "تتكون شبكة الأسطوانة من مستطيل (يمثل السطح المنحني الجانبي) ودائرتين (تمثلان القاعدتين العلوية والسفلية)."
          },
          {
            id: 4,
            questionEn: "If a shape is reflected across the X-axis (horizontal line), which of its coordinate values change polarity?",
            questionAr: "إذا تم عكس شكل هندسي عبر المحور السيني (خط أفقي)، فأي من إحداثياته تتغير إشارتها؟",
            optionsEn: ["X-coordinates", "Y-coordinates", "Both X and Y", "Neither"],
            optionsAr: ["الإحداثيات السينية", "الإحداثيات الصادية", "كلاهما السينية والصادية", "لا شيء منهما"],
            correctIndex: 1,
            explanationEn: "Reflection across a horizontal line (X-axis) mirrors y values (y becomes -y) while x values remain unchanged.",
            explanationAr: "الانعكاس عبر الخط الأفقي (المحور السيني) يقلب الإحداثي الصادي (ص تصبح -ص) بينما تبقى س دون تغيير."
          },
          {
            id: 5,
            questionEn: "If a solid cube is cut once diagonally from corner to corner, what 2D shape is the cross-section?",
            questionAr: "إذا تم قطع مكعب صلب مرة واحدة بشكل قطري من زاوية إلى زاوية، فما هو الشكل ثنائي الأبعاد للقطع الناتج؟",
            optionsEn: ["Triangle", "Square", "Rectangle", "Hexagon"],
            optionsAr: ["مثلث", "مربع", "مستطيل", "شكل سداسي"],
            correctIndex: 2,
            explanationEn: "A diagonal cut through a cube from opposite top edges to opposite bottom edges creates a rectangle.",
            explanationAr: "القطع القطري للمكعب من الحواف العلوية إلى الحواف السفلية المقابلة ينتج عنه مساحة مستطيلة الشكل."
          }
        ]
      },
      {
        id: "mawhiba-t2",
        titleEn: "Topic 2: Logic Matrices & Syllogisms",
        titleAr: "الموضوع 2: مصفوفات المنطق والقياس المنطقي",
        descriptionEn: "Solve advanced exclusive OR logical matrices, deductive syllogisms, and sequence grids.",
        descriptionAr: "حل مصفوفات المنطق الرياضي (بوابات XOR)، الاستدلال المنطقي للعبارات، وسلاسل الأشكال الشبكية.",
        price: 15,
        materialsEn: [
          "1. Exclusive OR (XOR) Logic: In shape matrices, overlaying shapes can cancel out shared elements. Only elements unique to one shape remain.",
          "2. Transitivity Syllogisms: If A -> B and B -> C, then A -> C. Watch out for logical fallacies.",
          "3. Number Matrices: Identify relations between rows and columns (e.g. Row 1 + Row 2 = Row 3)."
        ],
        materialsAr: [
          "1. منطق الاستبعاد (بوابة XOR): في مصفوفات الأشكال، الأجزاء المشتركة بين الشكلين الأول والثاني تختفي بالثالث، ويبقى الفريد فقط.",
          "2. قياس التعدي المنطقي: إذا كانت أ تؤدي إلى ب، وب تؤدي إلى جـ، فإن أ تؤدي إلى جـ. احذر من المغالطات العكسية.",
          "3. مصفوفات الأعداد: اكتشف العلاقات الرياضية بين الصفوف والأعمدة (مثال: جمع الصف الأول والثاني يعطي الثالث)."
        ],
        conceptsEn: [
          { term: "Deductive Syllogism Logic", desc: "Drawing valid conclusions from premises using logical rules." },
          { term: "XOR Logical Matrix", desc: "A pattern rule where common graphical elements cancel out across columns." }
        ],
        conceptsAr: [
          { term: "منطق القياس الاستدلالي", desc: "استخلاص نتائج صحيحة من المقدمات باستخدام قواعد المنطق الرياضي." },
          { term: "مصفوفة الاستبعاد XOR", desc: "قاعدة نمطية تلتغي فيها العناصر الرسومية المشتركة عند دمج الأعمدة." }
        ],
        questions: [
          {
            id: 1,
            questionEn: "Premise 1: All scientists are thinkers. Premise 2: Some thinkers are poets. Which of the following is logically sound?",
            questionAr: "مقدمة 1: كل العلماء مفكرون. مقدمة 2: بعض المفكرين شعراء. أي مما يلي يعتبر استنتاجاً صحيحاً منطقياً؟",
            optionsEn: ["All scientists are poets", "Some scientists are poets", "Some thinkers are scientists", "No scientist is a poet"],
            optionsAr: ["كل العلماء شعراء", "بعض العلماء شعراء", "بعض المفكرين علماء", "لا يوجد عالم شاعر"],
            correctIndex: 2,
            explanationEn: "Since all scientists are thinkers, any scientist is a thinker. Therefore, some thinkers must be scientists. We cannot prove any relationship between scientists and poets from the premises.",
            explanationAr: "بما أن كل العلماء مفكرون، فإن المفكرين يضمون العلماء بالتأكيد. بالتالي، 'بعض المفكرين علماء' هو استنتاج صحيح قطعاً."
          },
          {
            id: 2,
            questionEn: "In a 3x3 matrix, Row 1 has values: 3, 5, 8. Row 2 has values: 4, 2, 6. Row 3 has values: 5, 9, ?. What is the value of the missing number?",
            questionAr: "في مصفوفة 3×3، الصف الأول: 3، 5، 8. الصف الثاني: 4، 2، 6. الصف الثالث: 5، 9، ؟. ما هي قيمة العدد المفقود؟",
            optionsEn: ["10", "12", "14", "16"],
            optionsAr: ["10", "12", "14", "16"],
            correctIndex: 2,
            explanationEn: "The pattern in each row is: Col 1 + Col 2 = Col 3. Row 1: 3+5=8. Row 2: 4+2=6. Row 3: 5+9=14.",
            explanationAr: "النمط في كل صف هو: العمود الأول + الثاني = الثالث. الصف الأول: 3+5=8. الصف الثاني: 4+2=6. الصف الثالث: 5+9=14."
          },
          {
            id: 3,
            questionEn: "If a logical matrix follows the rule of addition (combining shapes without overlap removal), what happens when a circle and a square are combined?",
            questionAr: "إذا كانت مصفوفة منطقية تتبع قاعدة الجمع (دمج الأشكال دون حذف المشترك)، فماذا ينتج عند دمج دائرة ومربع؟",
            optionsEn: ["Only the circle", "Only the square", "A circle inside a square", "Nothing"],
            optionsAr: ["الدائرة فقط", "المربع فقط", "دائرة بداخل مربع (الشكلان معاً)", "لا شيء"],
            correctIndex: 2,
            explanationEn: "Addition rule combines all elements from both figures. So, both the circle and square will appear together.",
            explanationAr: "قاعدة الجمع تقوم بدمج جميع العناصر من الشكلين معاً في شكل واحد يحتوي على الدائرة والمربع."
          },
          {
            id: 4,
            questionEn: "All squares are rectangles. No circles are rectangles. Therefore:",
            questionAr: "كل المربعات مستطيلات. لا توجد دوائر مستطيلات. بناءً عليه:",
            optionsEn: ["Some squares are circles", "No circles are squares", "All rectangles are squares", "Some circles are rectangles"],
            optionsAr: ["بعض المربعات دوائر", "لا توجد دوائر مربعات", "كل المستطيلات مربعات", "بعض الدوائر مستطيلات"],
            correctIndex: 1,
            explanationEn: "Since all squares are rectangles and no circles are rectangles, circles can never be squares.",
            explanationAr: "بما أن جميع المربعات تقع ضمن فئة المستطيلات، والمستطيلات لا تتقاطع مع الدوائر، فلا يمكن لأي دائرة أن تكون مربعاً."
          },
          {
            id: 5,
            questionEn: "If it rains, the grass gets wet. The grass is not wet. Therefore:",
            questionAr: "إذا أمطرت، يبتل العشب. العشب ليس مبتلاً. بناءً عليه:",
            optionsEn: ["It rained", "It did not rain", "The grass is dry because of sun", "It might rain soon"],
            optionsAr: ["لقد أمطرت", "لم تمطر", "العشب جاف بسبب الشمس", "قد تمطر قريباً"],
            correctIndex: 1,
            explanationEn: "By Modus Tollens: If P -> Q, and not Q, then not P. P = it rains, Q = grass is wet. Not wet means it did not rain.",
            explanationAr: "حسب قاعدة منطق نفي النتيجة: إذا كانت أ تؤدي لـ ب، ونفي ب متحقق، فإن نفي أ متحقق. أ = تمطر، ب = يبتل العشب. العشب غير مبتل يعني لم تمطر."
          }
        ]
      }
    ]
  },
  {
    id: "teacher",
    titleEn: "Teacher License Exam (Jadarat)",
    titleAr: "رخصة المعلمين المهنية (جدارات)",
    descriptionEn: "National assessment for pedagogical theories, assessment methodologies, and classroom standards.",
    descriptionAr: "التقييم الوطني المهني للمعلمين لقياس الكفايات التربوية، طرائق التدريس، والمعايير المهنية.",
    icon: "Award",
    price: 45,
    topics: [
      {
        id: "teacher-t1",
        titleEn: "Topic 1: Cognitive Development & Learning Theories",
        titleAr: "الموضوع 1: النمو المعرفي ونظريات التعلم",
        descriptionEn: "Master Jean Piaget's stages of development, Vygotsky's scaffolding, behaviorism, and cognitivism.",
        descriptionAr: "مراحل بياجيه للنمو العقلي، منطقة النمو الوشيك والدعم لفيغوتسكي، والنظريات السلوكية والمعرفية.",
        price: 19,
        materialsEn: [
          "1. Piaget's Stages of Development: Sensorimotor (0-2y), Preoperational (2-7y), Concrete Operational (7-11y, concrete logic), Formal Operational (11y+, abstract reasoning).",
          "2. Vygotsky's Scaffolding: Zone of Proximal Development (ZPD) is the range of tasks a student can perform with guidance but not alone. Scaffolding is the temporary support.",
          "3. Behaviorism vs Cognitivism: Behaviorism focuses on observable actions and reinforcement (Skinner). Cognitivism focuses on memory processes."
        ],
        materialsAr: [
          "1. مراحل بياجيه للنمو المعرفي: الحس حركية (0-2 سنة)، ما قبل العمليات (2-7 سنوات)، العمليات المادية (7-11 سنة، منطق محسوس)، العمليات المجردة (11 سنة فما فوق، تفكير تجريدي).",
          "2. منطقة النمو الوشيك والدعم لفيغوتسكي: المدى الذي ينجز فيه الطالب المهام بمساعدة وتوجيه، والدرجات المؤقتة للدعم تسمى السقالات التعليمية (Scaffolding).",
          "3. السلوكية مقابل المعرفية: السلوكية تركز على السلوك الملاحظ والتعزيز (سكنر). المعرفية تركز على معالجة المعلومات والذاكرة."
        ],
        conceptsEn: [
          { term: "Piagetian Schema", desc: "Mental frameworks used to organize and interpret new information through assimilation and accommodation." },
          { term: "Zone of Proximal Development", desc: "The cognitive gap between a learner's independent ability and guided potential." }
        ],
        conceptsAr: [
          { term: "المخططات المعرفية لبياجيه", desc: "الأطر الذهنية المستخدمة لتنظيم وتفسير المعلومات الجديدة عبر التمثل والمواءمة." },
          { term: "منطقة النمو الوشيك ZPD", desc: "الفجوة المعرفية بين قدرة المتعلم المستقلة على حل المشكلات وقدرته الكامنة تحت التوجيه." }
        ],
        questions: [
          {
            id: 1,
            questionEn: "A teacher observes a student who is struggling to solve a math problem alone but can solve it easily when the teacher points out the first step. What is this capability range called?",
            questionAr: "يلاحظ المعلم أن أحد الطلاب يعجز عن حل مسألة رياضية بمفرده، ولكنه يحلها بسهولة عندما يقوم المعلم بتوضيح الخطوة الأولى له. ماذا يُطلق على هذا المدى من القدرة؟",
            optionsEn: ["Concrete Operational Stage", "Zone of Proximal Development", "Conditioned Reflex Arc", "Self-Actualization Level"],
            optionsAr: ["مرحلة العمليات المادية", "منطقة النمو الوشيك (ZPD)", "المنعكس الشرطي", "مستوى تحقيق الذات"],
            correctIndex: 1,
            explanationEn: "According to Vygotsky, the Zone of Proximal Development is the distance between what a learner can do independently and what they can do with assistance.",
            explanationAr: "وفقاً لفيغوتسكي، منطقة النمو الوشيك هي المسافة بين ما يستطيع المتعلم فعله بمفرده وما يستطيع إنجازه بتوجيه ومساعدة."
          },
          {
            id: 2,
            questionEn: "At which of Piaget's developmental stages does a child gain the ability to perform conservation tasks (e.g. volume conservation)?",
            questionAr: "في أي من مراحل النمو عند بياجيه يكتسب الطفل القدرة على فهم مهام الحفظ (مثل حفظ كمية السائل)؟",
            optionsEn: ["Sensorimotor", "Preoperational", "Concrete Operational", "Formal Operational"],
            optionsAr: ["الحس حركية", "ما قبل العمليات", "العمليات المادية (المحسوسة)", "العمليات المجردة"],
            correctIndex: 2,
            explanationEn: "During the Concrete Operational stage (ages 7-11), children develop conservation, understanding that quantity does not change when appearance changes.",
            explanationAr: "خلال مرحلة العمليات المادية (المحسوسة، من 7-11 سنة)، يطور الأطفال مفهوم الحفظ أو البقاء، مدركين أن الكمية لا تتغير بتغير المظهر."
          },
          {
            id: 3,
            questionEn: "Which of the following describes Skinner's Operant Conditioning?",
            questionAr: "أي مما يلي يصف نظرية الاشتراط الإجرائي لسكنر؟",
            optionsEn: ["Learning through observation", "Behavior shaped by reinforcements and punishments", "Processing information in sensory registry", "Scaffolding within the ZPD"],
            optionsAr: ["التعلم من خلال الملاحظة والنمذجة", "تشكيل السلوك بالتعزيز والعقاب", "معالجة المعلومات في المسجل الحسي", "تقديم الدعم التعليمي ضمن منطقة النمو الوشيك"],
            correctIndex: 1,
            explanationEn: "Operant conditioning posits that behaviors are learned and shaped by their consequences (rewards/punishments).",
            explanationAr: "الاشتراط الإجرائي يقوم على فرضية أن السلوكيات يتم تعلمها وتشكيلها بناءً على عواقبها (المكافآت أو العقوبات)."
          },
          {
            id: 4,
            questionEn: "A student fits a new animal (zebra) into their existing category of 'horse'. According to Piaget, this process is called:",
            questionAr: "يقوم طالب بإدخال حيوان جديد (الحمار الوحشي) ضمن فئته الذهنية الحالية 'الحصان'. وفقاً لبياجيه، تسمى هذه عملية:",
            optionsEn: ["Assimilation", "Accommodation", "Equilibration", "Scaffolding"],
            optionsAr: ["التمثل (الاستيعاب)", "المواءمة (التكيف)", "التوازن المعرفي", "الدعم التعليمي"],
            correctIndex: 0,
            explanationEn: "Assimilation occurs when a learner fits new information into pre-existing cognitive schemas.",
            explanationAr: "يحدث التمثل (الاستيعاب) عندما يقوم المتعلم بدمج المعلومات الجديدة في أطر معرفية موجودة مسبقاً لديه."
          },
          {
            id: 5,
            questionEn: "A student modifies their schema of a 'horse' to create a new category for a 'zebra' due to its stripes. This is:",
            questionAr: "قام طالب بتعديل مخطط الذهني عن 'الحصان' لإنشاء فئة جديدة باسم 'الحمار الوحشي' بسبب خطوطه. تسمى هذه العملية:",
            optionsEn: ["Assimilation", "Accommodation", "Organization", "Extinction"],
            optionsAr: ["التمثل", "المواءمة (التكيف)", "التنظيم المعرفي", "الانطفاء"],
            correctIndex: 1,
            explanationEn: "Accommodation occurs when existing schemas are altered or new ones are created in response to new information.",
            explanationAr: "تحدث المواءمة عندما يتم تعديل المخططات الحالية أو إنشاء مخططات جديدة استجابةً لظهور معلومات وخبرات جديدة."
          }
        ]
      },
      {
        id: "teacher-t2",
        titleEn: "Topic 2: Measurement, Evaluation & Pedagogy",
        titleAr: "الموضوع 2: القياس، التقويم وطرق التدريس",
        descriptionEn: "Differentiate formative/summative evaluations, diagnostic tests, validity coefficient, and VARK designs.",
        descriptionAr: "التمييز بين التقويم التكويني والنهائي والتشخيصي، حساب معامل ثبات الاختبار، وتطبيقات تفريد التعليم.",
        price: 19,
        materialsEn: [
          "1. Formative vs Summative Assessment: Formative is ongoing and non-graded, adjusting pacing. Summative is final and graded, assessing achievements.",
          "2. Test Reliability and Validity: Validity measures if a test tests what it claims. Reliability is the consistency of scores.",
          "3. VARK Differentiated Instruction: Visual, Auditory, Read/Write, Kinesthetic pathways. Differentiating materials helps address diverse learning styles."
        ],
        materialsAr: [
          "1. التقويم التكويني مقابل النهائي: التكويني مستمر وغير مرصود بالدرجات لضبط التدريس. النهائي يُجرى بالختام للرصد وتحديد مستويات التحصيل.",
          "2. ثبات وصدق الاختبارات: الصدق يقيس مدى صلاحية الاختبار لقياس ما وُضع لأجله. الثبات يقيس مدى اتساق واستقرار الدرجات عند إعادة الاختبار.",
          "3. تصميم التعليم المتمايز (VARK): الأنماط البصرية، السمعية، القراءة والكتابة، والحركية. تنويع المواد يساعد على مراعاة الفروق الفردية."
        ],
        conceptsEn: [
          { term: "Formative Assessment Loop", desc: "Using ungraded checks to gather instant learning feedback and adjust teaching." },
          { term: "VARK Differentiated Design", desc: "Tailoring lesson media to address visual, auditory, and kinesthetic channels." }
        ],
        conceptsAr: [
          { term: "حلقة التغذية الراجعة التكوينية", desc: "استخدام نقاط التحقق غير المرصودة بالدرجات لجمع معلومات مرحلية وتعديل سرعة التدريس." },
          { term: "تصميم متمايز بطريقة فارك", desc: "تنويع المواد التدريسية لتخاطب الأنماط البصرية والسمعية وقراءة/كتابة والأنماط الحركية للطلاب." }
        ],
        questions: [
          {
            id: 1,
            questionEn: "During a lesson, a teacher asks a quick question to gauge understanding and decides to re-explain a concept. What type of assessment is this?",
            questionAr: "أثناء الحصة الدراسية، طرح المعلم سؤالاً سريعاً لقياس مدى الفهم، وبناءً عليه قرر إعادة شرح المفهوم. ما نوع هذا التقويم؟",
            optionsEn: ["Diagnostic Assessment", "Formative Assessment", "Summative Assessment", "Placement Assessment"],
            optionsAr: ["تقويم تشخيصي", "تقويم تكويني (بنائي)", "تقويم نهائي (ختامي)", "تقويم قبلي"],
            correctIndex: 1,
            explanationEn: "Formative assessment occurs during the instruction process to monitor learning and provide ongoing feedback to improve teaching.",
            explanationAr: "يحدث التقويم التكويني (البنائي) أثناء عملية التدريس لمراقبة التعلم وتقديم تغذية راجعة مستمرة لتحسين الأداء التدريسي."
          },
          {
            id: 2,
            questionEn: "If a test yields the same score for a student when taken multiple times under similar conditions, the test is said to have high:",
            questionAr: "إذا حصل الطالب على نفس الدرجة تقريباً عند إعادة تطبيق الاختبار عليه عدة مرات تحت ظروف مماثلة، يُوصف الاختبار بـ:",
            optionsEn: ["Validity", "Reliability", "Objectivity", "Difficulty"],
            optionsAr: ["الصدق", "الثبات", "الموضوعية", "السهولة والصعوبة"],
            correctIndex: 1,
            explanationEn: "Reliability refers to the consistency and stability of test results across multiple administrations.",
            explanationAr: "يشير الثبات إلى مدى اتساق واستقرار نتائج الاختبار عند إعادة تطبيقه في مناسبات مختلفة."
          },
          {
            id: 3,
            questionEn: "A teacher presents a diagram, reads the labels aloud, and has students write a summary. Which VARK styles are addressed?",
            questionAr: "قدم المعلم رسماً بيانياً، وقرأ المصطلحات بصوت مرتفع، ثم طلب من الطلاب كتابة ملخص. أي أنماط التعلم (VARK) تمت مراعاتها؟",
            optionsEn: ["Visual and Auditory only", "Visual, Auditory, and Read/Write", "Auditory and Kinesthetic only", "Kinesthetic and Visual only"],
            optionsAr: ["البصري والسمعي فقط", "البصري، السمعي، والقراءة/الكتابة", "السمعي والحركي فقط", "الحركي والبصري فقط"],
            correctIndex: 1,
            explanationEn: "Diagram handles Visual, reading aloud handles Auditory, and writing a summary handles Read/Write.",
            explanationAr: "الرسم يراعي النمط البصري، والقراءة بصوت عادل تراعي السمعي، وكتابة الملخص تراعي نمط القراءة والكتابة."
          },
          {
            id: 4,
            questionEn: "What is the primary purpose of a Diagnostic Assessment?",
            questionAr: "ما هو الهدف الرئيسي من إجراء التقويم التشخيصي؟",
            optionsEn: ["To grade student achievement at end of term", "To identify learning difficulties and strengths beforehand", "To compare students nationally", "To reinforce positive behaviors"],
            optionsAr: ["لرصد درجات الطلاب في نهاية الفصل الدراسي", "لتحديد نقاط القوة والصعوبات التعلمية مسبقاً", "لمقارنة مستويات الطلاب على المستوى الوطني", "لتعزيز السلوكيات الإيجابية بالفصل"],
            correctIndex: 1,
            explanationEn: "Diagnostic assessments are used before instruction to identify students' specific strengths, weaknesses, and learning barriers.",
            explanationAr: "يُسخدم التقويم التشخيصي قبل البدء بالتعليم لتحديد نقاط القوة والصعوبات والاحتياجات الخاصة بكل متعلم."
          },
          {
            id: 5,
            questionEn: "A test that measures mathematical aptitude includes complex vocabulary that skews scores. This test lacks:",
            questionAr: "اختبار مخصص لقياس القدرة الرياضية ولكنه يتضمن مصطلحات لغوية معقدة تشوش على الدرجات. هذا الاختبار ينقصه:",
            optionsEn: ["Reliability", "Validity", "Difficulty", "Objectivity"],
            optionsAr: ["الثبات", "الصدق", "الصعوبة الكافية", "الموضوعية"],
            correctIndex: 1,
            explanationEn: "The test is measuring vocabulary skills rather than purely mathematical aptitude. Therefore, it lacks validity.",
            explanationAr: "بما أن الاختبار يقيس الثروة اللغوية والمفردات بدلاً من قياس القدرة الرياضية البحتة، فإنه يفتقر إلى صفة الصدق."
          }
        ]
      },
      {
        id: "teacher-t3",
        titleEn: "Topic 3: Classroom Management & Professional Ethics",
        titleAr: "الموضوع 3: إدارة الصف وأخلاقيات مهنة التعليم",
        descriptionEn: "Master reinforcement schedules, behavioral extinction, parent communication, and Saudi professional standards.",
        descriptionAr: "خطط التعزيز الإيجابي، إطفاء سلوكيات الفوضى، إشراك أولياء الأمور، وميثاق المعلم المهني الأخلاقي بالمملكة.",
        price: 19,
        materialsEn: [
          "1. Positive Reinforcement & Extinction: Extinction is ignoring disruptive attention-seeking behavior. Reinforcement increases desired behaviors.",
          "2. Saudi Professional Standards: Teachers must respect cultural values, show high integrity, and maintain confidentiality of student profiles.",
          "3. Classroom Pacing: Establish clear routines to reduce transition times and maximize academic learning time."
        ],
        materialsAr: [
          "1. التعزيز الإيجابي والانطفاء السلوكي: الانطفاء هو تجاهل السلوكيات الفوضوية التي تهدف لجذب الانتباه. والتعزيز يزيد من معدل السلوك المرغوب.",
          "2. المعايير المهنية السعودية: يجب على المعلم احترام القيم الثقافية للمملكة، التحلي بالأمانة، وحفظ سرية بيانات وسجلات الطلاب.",
          "3. ضبط الفترات الانتقالية: وضع إجراءات روتينية واضحة لتقليل زمن الانتقال بين الأنشطة التعليمية بالفصل."
        ],
        conceptsEn: [
          { term: "Operant Behavior Extinction", desc: "Ignoring undesired attention-seeking behavior to let it decline naturally." },
          { term: "Professional Teacher Integrity", desc: "Ethical guidelines defining student relationships and professional status in Saudi system." }
        ],
        conceptsAr: [
          { term: "الإطفاء السلوكي الإجرائي", desc: "الرّفض المنظم لتعزيز سلوكيات جذب الانتباه المشاغبة في الفصل الدراسي مما يؤدي إلى تراجعها وتلاشيها." },
          { term: "النزاهة والمسؤولية المهنية للمعلم", desc: "الضوابط الأخلاقية المحددة لعلاقة المعلم بالطلاب والمجتمع المدرسي وفق ميثاق وزارة التعليم بالمملكة." }
        ],
        questions: [
          {
            id: 1,
            questionEn: "A student frequently talks out of turn to gain attention. The teacher decides to completely ignore this behavior. What technique is the teacher using?",
            questionAr: "طالب يتحدث كثيراً دون إذن لجذب الانتباه. قرر المعلم تجاهل هذا السلوك تماماً. ما هو الأسلوب المستخدم هنا؟",
            optionsEn: ["Negative Reinforcement", "Extinction (Ignoring)", "Punishment", "Systematic Desensitization"],
            optionsAr: ["التعزيز السلبي", "الانطفاء (الإطفاء السلوكي)", "العقاب", "تقليل الحساسية التدريجي"],
            correctIndex: 1,
            explanationEn: "Extinction is a behavior modification technique that involves removing the reinforcement (attention) of an undesired behavior to reduce its occurrence.",
            explanationAr: "الانطفاء هو استراتيجية لتعديل السلوك تعتمد على سحب المعزز (الاهتمام) المسبب للسلوك غير المرغوب حتى يتلاشى تدريجياً."
          },
          {
            id: 2,
            questionEn: "According to Saudi Educational Code of Conduct, which of the following is a violation of professional ethics?",
            questionAr: "وفقاً لميثاق أخلاقيات مهنة التعليم في المملكة العربية السعودية، أي مما يلي يعد مخالفاً لأخلاقيات المهنة؟",
            optionsEn: ["Sharing general educational articles on social media", "Discussing a student's grades with another parent", "Providing free extra support during school hours", "Inviting parents to attend classroom activities"],
            optionsAr: ["نشر مقالات تربوية عامة في وسائل التواصل الاجتماعي", "مناقشة درجات طالب مع ولي أمر طالب آخر", "تقديم دعم إضافي مجاني للطلاب خلال الدوام الرسمي", "دعوة أولياء الأمور لحضور فعاليات الأنشطة الصفية"],
            correctIndex: 1,
            explanationEn: "Discussing student performance with unauthorized parents violates confidentiality regulations, which is a major ethical breach.",
            explanationAr: "تداول أداء الطالب أو درجاته مع أولياء أمور غير مخولين ينتهك سرية البيانات والمعلومات ويعتبر مخالفة أخلاقية صريحة."
          },
          {
            id: 3,
            questionEn: "To minimize time wasted during transitions between tasks, the teacher should:",
            questionAr: "لتقليل الوقت الضائع في الفترات الانتقالية بين الأنشطة بالفصل، يجب على المعلم:",
            optionsEn: ["Let students take long breaks", "Establish clear, consistent classroom routines", "Rely on physical punishments", "End the class early"],
            optionsAr: ["ترك وقت فراغ طويل للطلاب", "تأسيس إجراءات روتينية واضحة وثابتة للفصل الدراسي", "الاعتماد على العقاب البدني لتخويفهم", "إنهاء الحصة الدراسية مبكراً"],
            correctIndex: 1,
            explanationEn: "Establishing clear routines (like where to turn in papers or how to form groups) makes transitions automatic, saving instructional time.",
            explanationAr: "بناء إجراءات روتينية معتادة (مثل طريقة تسليم الواجبات أو تشكيل المجموعات) يجعل الحركة بالفصل تلقائية ومنظمة ويحفظ الوقت."
          },
          {
            id: 4,
            questionEn: "Positive reinforcement should be administered ________ to shape a new behavior rapidly.",
            questionAr: "يجب تقديم التعزيز الإيجابي بشكل ________ لتشكيل سلوك جديد بسرعة عالية.",
            optionsEn: ["Continuously", "Intermittently", "Rarely", "Only at the end of the semester"],
            optionsAr: ["مستمر ومتواصل", "متقطع ومتباعد", "نادراً وقليلاً", "في نهاية الفصل الدراسي فقط"],
            correctIndex: 0,
            explanationEn: "Continuous reinforcement is most effective when training or shaping a brand-new behavior, while intermittent reinforcement maintains it.",
            explanationAr: "التعزيز المستمر هو الأسلوب الأكثر فاعلية عند بدء تشكيل أو تعليم سلوك جديد كلياً، بينما يحافظ التعزيز المتقطع عليه لاحقاً."
          },
          {
            id: 5,
            questionEn: "Which of the following describes a proactive classroom management strategy?",
            questionAr: "أي مما يلي يمثل استراتيجية إدارة صفية وقائية (نشطة قبل وقوع الحدث)؟",
            optionsEn: ["Establishing classroom rules together on the first day", "Punishing students after they break rules", "Sending misbehaving students to the principal", "Calling parents after a student fails"],
            optionsAr: ["الاتفاق على قواعد الصف مع الطلاب في اليوم الأول", "عقاب الطلاب فوراً بعد كسرهم للقواعد", "إرسال الطلاب المشاغبين إلى إدارة المدرسة", "الاتصال بولي الأمر بعد رسوب الطالب بالفصل"],
            correctIndex: 0,
            explanationEn: "Establishing rules proactively on the first day sets clear expectations and prevents misbehavior before it starts.",
            explanationAr: "وضع القوانين والاتفاق عليها بشكل وقائي في أول يوم دراسي يحدد التوقعات للجميع ويحد من حدوث المشاكل الفوضوية مسبقاً."
          }
        ]
      }
    ]
  }
];

export default function App() {
  // Navigation & localization state
  const [lang, setLang] = useState<'en' | 'ar'>((localStorage.getItem('lang') as 'en' | 'ar') || "ar"); // Default to Arabic for Saudi Games theme target
  const [viewState, setViewState] = useState<'splash' | 'auth' | 'dashboard' | 'topics' | 'viewer'>('splash');
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  
  // User Authentication State
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authError, setAuthError] = useState('');
  
  // Premium Content Unlocks (stored in state & synced to LocalStorage)
  const [unlockedModules, setUnlockedModules] = useState<string[]>([]);
  const [unlockedTopics, setUnlockedTopics] = useState<string[]>(['qudrat-t1']); // Only GAT Topic 1 unlocked by default
  const [activeModule, setActiveModule] = useState<ModuleData>(examModules[0]);
  const [activeTopic, setActiveTopic] = useState<TopicData | null>(null);
  
  // Checkout Modal / Simulated Purchase State
  const [checkoutModule, setCheckoutModule] = useState<ModuleData | null>(null);
  const [checkoutTopic, setCheckoutTopic] = useState<TopicData | null>(null);
  const [checkoutType, setCheckoutType] = useState<'topic' | 'module'>('topic');
  const [paymentMethod, setPaymentMethod] = useState<'mada' | 'apple'>('mada');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Content Viewer Tab state
  const [viewerTab, setViewerTab] = useState<'materials' | 'quiz' | 'concepts'>('materials');
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState<Record<number, number>>({});
  const [shakeLockedId, setShakeLockedId] = useState<string | null>(null);

  // Copy protection status
  const [isBlurred, setIsBlurred] = useState(false);
  const [showSecurityToast, setShowSecurityToast] = useState(false);
  const [isSystemBlocked, setIsSystemBlocked] = useState(false);

  // Calculate total and unlocked topics
  const totalTopics = examModules.reduce((acc, mod) => acc + mod.topics.length, 0);
  const unlockedTopicsCount = examModules.reduce((acc, mod) => {
    const isModuleUnlocked = unlockedModules.includes(mod.id);
    const topicsUnlocked = mod.topics.filter(t => isModuleUnlocked || unlockedTopics.includes(t.id)).length;
    return acc + topicsUnlocked;
  }, 0);
  const progressPercent = Math.round((unlockedTopicsCount / totalTopics) * 100);

  // Update layout direction dynamically when lang changes
  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Load user data & unlocked packages from localStorage on mount
  useEffect(() => {
    // Seed default registered users if not present
    const savedRegUsers = localStorage.getItem('saudi_registered_users');
    if (!savedRegUsers) {
      const defaultUsers = [
        { email: 'admin@saudiprep.com', name: 'Saudi Prep Admin', password: 'password123' },
        { email: 'student@saudiprep.com', name: 'Saudi Student', password: 'password123' }
      ];
      localStorage.setItem('saudi_registered_users', JSON.stringify(defaultUsers));
    }

    const savedUser = localStorage.getItem('saudi_user');
    const savedUnlocks = localStorage.getItem('saudi_unlocks');
    const savedUnlockedTopics = localStorage.getItem('saudi_unlocked_topics');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setViewState('dashboard');
    }
    if (savedUnlocks) {
      setUnlockedModules(JSON.parse(savedUnlocks));
    }
    if (savedUnlockedTopics) {
      setUnlockedTopics(JSON.parse(savedUnlockedTopics));
    }
  }, []);

  // Sync unlocks to localStorage
  const saveUnlocks = (unlocks: string[]) => {
    setUnlockedModules(unlocks);
    localStorage.setItem('saudi_unlocks', JSON.stringify(unlocks));
  };

  const saveUnlockedTopics = (topics: string[]) => {
    setUnlockedTopics(topics);
    localStorage.setItem('saudi_unlocked_topics', JSON.stringify(topics));
  };

  // Helper dictionary lookup
  const t = (key: keyof typeof translations['en']) => {
    return translations[lang][key] || translations['en'][key] || '';
  };

  // Auth Handler
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!authEmail || !authEmail.includes('@')) {
      setAuthError(t('emailRequired'));
      return;
    }
    if (authPassword.length < 6) {
      setAuthError(t('passwordRequired'));
      return;
    }
    if (authTab === 'signup' && !authName) {
      setAuthError(t('nameRequired'));
      return;
    }

    // Load registered users
    const stored = localStorage.getItem('saudi_registered_users');
    let registeredUsers: any[] = [];
    if (stored) {
      try {
        registeredUsers = JSON.parse(stored);
      } catch (err) {
        registeredUsers = [];
      }
    }

    if (authTab === 'signup') {
      // Check if email already exists
      const exists = registeredUsers.some((u: any) => u.email.toLowerCase() === authEmail.toLowerCase());
      if (exists) {
        setAuthError(t('emailExists'));
        return;
      }

      // Add new user
      const newUser = {
        email: authEmail,
        name: authName,
        password: authPassword
      };
      registeredUsers.push(newUser);
      localStorage.setItem('saudi_registered_users', JSON.stringify(registeredUsers));

      const userData = { email: authEmail, name: authName };
      localStorage.setItem('saudi_user', JSON.stringify(userData));
      setUser(userData);
      setViewState('dashboard');

      // Clear inputs
      setAuthEmail('');
      setAuthPassword('');
      setAuthName('');
    } else {
      // Login flow: check credentials
      const matchedUser = registeredUsers.find(
        (u: any) => u.email.toLowerCase() === authEmail.toLowerCase()
      );

      if (!matchedUser) {
        setAuthError(t('accountNotFound'));
        return;
      }

      if (matchedUser.password !== authPassword) {
        setAuthError(t('incorrectPassword'));
        return;
      }

      // Successful login
      const userData = {
        email: matchedUser.email,
        name: matchedUser.name
      };
      localStorage.setItem('saudi_user', JSON.stringify(userData));
      setUser(userData);
      setViewState('dashboard');

      // Clear inputs
      setAuthEmail('');
      setAuthPassword('');
      setAuthName('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('saudi_user');
    setUser(null);
    setViewState('splash');
  };

  // Security alert trigger
  const triggerSecurityToast = () => {
    setShowSecurityToast(true);
    setTimeout(() => {
      setShowSecurityToast(false);
    }, 4000);
  };

  // Copy Protection Hook
  useEffect(() => {
    if (!user) return;

    const preventDefault = (e: Event) => {
      e.preventDefault();
      triggerSecurityToast();
      setIsSystemBlocked(true); // Block the app on any copy/right-click/drag attempts
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      // Intercept modifier + Shift combos instantly (Mac: Cmd+Shift, Windows: Ctrl+Shift)
      // This detects the screenshot key sequences BEFORE they press the third key (3, 4, 5, or S)
      if (modifier && e.shiftKey) {
        e.preventDefault();
        triggerSecurityToast();
        setIsSystemBlocked(true); // Permanent block
        return;
      }

      // Intercept other key blockages
      if (
        e.key === 'PrintScreen' ||
        e.key === 'F12' ||
        (modifier && e.key === 'c') ||
        (modifier && e.key === 'x') ||
        (modifier && e.key === 'p') ||
        (modifier && e.key === 's') ||
        (modifier && e.key === 'u')
      ) {
        e.preventDefault();
        triggerSecurityToast();
        setIsSystemBlocked(true); // Permanent block
      }
    };

    const handleBlur = () => {
      setIsBlurred(true);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setIsBlurred(true);
      }
    };

    const handleResize = () => {
      // Check if DevTools is opened and docked (by checking window border size difference)
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;
      if (widthDiff || heightDiff) {
        setIsSystemBlocked(true);
      }
    };

    const handleMouseLeave = () => {
      setIsBlurred(true); // Mask screen immediately when mouse leaves browser viewport
    };

    const handleMouseEnter = () => {
      if (document.hasFocus()) {
        setIsBlurred(false);
      }
    };

    window.addEventListener('contextmenu', preventDefault);
    window.addEventListener('selectstart', preventDefault);
    window.addEventListener('copy', preventDefault);
    window.addEventListener('cut', preventDefault);
    window.addEventListener('dragstart', preventDefault);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('contextmenu', preventDefault);
      window.removeEventListener('selectstart', preventDefault);
      window.removeEventListener('copy', preventDefault);
      window.removeEventListener('cut', preventDefault);
      window.removeEventListener('dragstart', preventDefault);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [user]);

  // Click handler for Module Cards
  const handleModuleClick = (mod: ModuleData) => {
    setActiveModule(mod);
    setViewState('topics');
  };

  // Click handler for Topic Cards
  const handleTopicClick = (topic: TopicData) => {
    const isUnlocked = unlockedModules.includes(activeModule.id) || unlockedTopics.includes(topic.id);
    if (isUnlocked) {
      setActiveTopic(topic);
      setViewerTab('materials');
      setQuizScore(null);
      setCurrentQuestionAnswers({});
      setViewState('viewer');
    } else {
      // Shake locked topic representation
      setShakeLockedId(topic.id);
      setTimeout(() => setShakeLockedId(null), 600);
      
      // Open Checkout overlay for this topic
      setCheckoutModule(activeModule);
      setCheckoutTopic(topic);
      setCheckoutType('topic');
      setCheckoutError('');
    }
  };

  // Simulated Payment Handler
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError('');

    if (paymentMethod === 'mada') {
      if (!cardName) {
        setCheckoutError(lang === 'ar' ? 'اسم حامل البطاقة مطلوب' : 'Cardholder name is required');
        return;
      }
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        setCheckoutError(lang === 'ar' ? 'يجب إدخال 16 رقماً للبطاقة' : 'Card number must be 16 digits');
        return;
      }
      if (!cardExpiry || !cardExpiry.includes('/')) {
        setCheckoutError(lang === 'ar' ? 'صيغة تاريخ الانتهاء خاطئة (الشهر/السنة)' : 'Invalid expiry format (MM/YY)');
        return;
      }
      if (cardCvv.length !== 3) {
        setCheckoutError(lang === 'ar' ? 'رمز الأمان CVV غير صالح' : 'Invalid CVV (3 digits)');
        return;
      }
    }

    setIsProcessingPayment(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      
      if (checkoutType === 'topic' && checkoutTopic) {
        const newUnlocks = [...unlockedTopics, checkoutTopic.id];
        saveUnlockedTopics(newUnlocks);
        
        // Show success state
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          setCheckoutModule(null);
          setCheckoutTopic(null);
          // Auto enter topic
          setActiveTopic(checkoutTopic);
          setViewerTab('materials');
          setViewState('viewer');
        }, 1800);
      } else if (checkoutType === 'module' && checkoutModule) {
        const newUnlocks = [...unlockedModules, checkoutModule.id];
        saveUnlocks(newUnlocks);
        
        // Show success state
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          setCheckoutModule(null);
          setCheckoutTopic(null);
          // Auto enter topic if one was selected, else go to topics view
          if (checkoutTopic) {
            setActiveTopic(checkoutTopic);
            setViewerTab('materials');
            setViewState('viewer');
          } else {
            setViewState('topics');
          }
        }, 1800);
      }
      
      // Reset form
      setCardName('');
      setCardNumber('');
      setCardExpiry('');
      setCardCvv('');
    }, 2000);
  };

  // Apple Pay simulation click
  const handleApplePaySimulate = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      
      if (checkoutType === 'topic' && checkoutTopic) {
        const newUnlocks = [...unlockedTopics, checkoutTopic.id];
        saveUnlockedTopics(newUnlocks);
        
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          setCheckoutModule(null);
          setCheckoutTopic(null);
          setActiveTopic(checkoutTopic);
          setViewerTab('materials');
          setViewState('viewer');
        }, 1800);
      } else if (checkoutType === 'module' && checkoutModule) {
        const newUnlocks = [...unlockedModules, checkoutModule.id];
        saveUnlocks(newUnlocks);
        
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          setCheckoutModule(null);
          setCheckoutTopic(null);
          if (checkoutTopic) {
            setActiveTopic(checkoutTopic);
            setViewerTab('materials');
            setViewState('viewer');
          } else {
            setViewState('topics');
          }
        }, 1800);
      }
    }, 1500);
  };

  // Option select in Practice Quiz
  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setCurrentQuestionAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // Calculate Quiz Score
  const handleGradeQuiz = () => {
    if (!activeTopic) return;
    let score = 0;
    activeTopic.questions.forEach(q => {
      if (currentQuestionAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    setQuizScore(score);
  };

  // Dynamic watermark tags
  const renderWatermarks = () => {
    const items = [];
    const text = user ? `${t('watermarkText')}${user.email}` : `${t('watermarkText')}Guest`;
    for (let i = 0; i < 6; i++) {
      items.push(<div key={i}>{text}</div>);
    }
    return <div className="confidential-watermark">{items}</div>;
  };

  return (
    <div className="desktop-backdrop">
      
      {/* Desktop Helper Panel - Shows users that this runs inside a simulated mobile bezel */}
      <div className="desktop-header-info">
        <h1>{t('title')}</h1>
        <p>{t('subtitle')} (Responsive Mobile Focus Only)</p>
      </div>

      {/* Mobile Simulator Bezel Wrapper */}
      <div className="mobile-device-frame saudi-pattern-bg">
        <div className="device-notch"></div>
        
        {/* App Main Area */}
        <div className="app-screen-container">
          
          {/* Global System Block Overlay */}
          {isSystemBlocked && (
            <div className="security-blur-overlay" style={{ background: '#000000', opacity: 1, pointerEvents: 'auto', zIndex: 999999, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: 24, position: 'absolute', inset: 0 }}>
              <AlertTriangle size={50} style={{ color: 'var(--accent-neon)', marginBottom: 20 }} className="pulse-neon" />
              <h2 className="ar-text-rtl-center" style={{ fontSize: 18, fontWeight: 800, color: 'var(--white)', marginBottom: 10 }}>
                {lang === 'ar' ? 'تم تنشيط حظر نظام الحماية' : 'SECURITY SYSTEM ENGAGED'}
              </h2>
              <p className="ar-text-rtl-center" style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.8)', maxWidth: 280, marginBottom: 24, lineHeight: '150%' }}>
                {lang === 'ar' 
                  ? 'تم كشف نشاط مشبوه (محاولة تصوير شاشة، فحص الكود البرمجي، أو محاولة نسخ المحتوى). تم حظر الوصول للجلسة لحماية حقوق الطبع والنشر.' 
                  : 'Suspicious activity detected (screenshot attempt, Developer Tools inspection, or copy/paste attempt). Session access is locked to protect copyright.'}
              </p>
              <button 
                onClick={() => window.location.reload()}
                style={{ 
                  padding: '12px 24px', 
                  borderRadius: 12, 
                  border: 'none', 
                  backgroundColor: 'var(--accent-neon)', 
                  color: 'var(--deep-forest)', 
                  fontSize: 13, 
                  fontWeight: 700, 
                  cursor: 'pointer' 
                }}
              >
                {lang === 'ar' ? 'إعادة تحميل البوابة' : 'Reload Portal'}
              </button>
            </div>
          )}

          {/* Global Active Blur protection overlay */}
          {isBlurred && user && (
            <div className="security-blur-overlay" style={{ background: '#000000', opacity: 1, pointerEvents: 'auto', zIndex: 99999, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: 24, position: 'absolute', inset: 0 }}>
              <Shield size={42} className="text-emerald-500" style={{ color: 'var(--accent-neon)', marginBottom: 14 }} />
              <h3 className="ar-text-rtl-center" style={{ fontSize: 16, fontWeight: 800, color: 'var(--white)', marginBottom: 8 }}>
                {t('focusLostTitle')}
              </h3>
              <p className="ar-text-rtl-center" style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', maxWidth: 220, marginBottom: 20 }}>
                {t('focusLostMessage')}
              </p>
              <button 
                onClick={() => setIsBlurred(false)}
                style={{ 
                  padding: '10px 20px', 
                  borderRadius: 10, 
                  border: 'none', 
                  backgroundColor: 'var(--accent-neon)', 
                  color: 'var(--deep-forest)', 
                  fontSize: 12, 
                  fontWeight: 700, 
                  cursor: 'pointer' 
                }}
              >
                {lang === 'ar' ? 'استئناف' : 'Resume'}
              </button>
            </div>
          )}
          
          {/* Status Bar simulation with clock and battery */}
          <div className={`device-status-bar ${viewState === 'splash' ? 'dark-text' : ''}`}>
            <span className="simulator-only">11:37 AM</span>
            <div className="status-right-icons">
              <span className="simulator-only">5G</span>
              <div className="simulator-only" style={{ width: 18, height: 10, border: '1px solid currentColor', borderRadius: 2, padding: 1, display: 'flex' }}>
                <div style={{ width: '80%', height: '100%', backgroundColor: 'currentColor' }}></div>
              </div>
            </div>
          </div>

          {/* Core Content Area */}
          <div className="custom-scroll" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px 18px 24px' }}>
            
            {/* SPLASH / LANGUAGE SELECT SCREEN */}
            {viewState === 'splash' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                
                {/* Saudi prep dynamic emblem */}
                <div className="logo-glide pulse-neon" style={{ position: 'relative', width: 110, height: 110, borderRadius: '50%', backgroundColor: '#09241b', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 24, boxShadow: '0 0 25px rgba(62, 222, 165, 0.55)', border: '2px solid rgba(251, 191, 36, 0.75)', overflow: 'hidden' }}>
                  <img src="/logo.png" alt="Saudi Prep Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <h1 className="ar-text-rtl-center" style={{ fontSize: 26, fontWeight: 800, color: 'var(--deep-forest)', marginBottom: 8, letterSpacing: -0.5 }}>
                  {t('title')}
                </h1>
                <p className="ar-text-rtl-center" style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 36, maxWidth: 280 }}>
                  {t('subtitle')}
                </p>

                {/* Language Switch Card */}
                <div className="glass-panel" style={{ width: '100%', padding: 20, marginBottom: 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <span className="ar-text-rtl-center" style={{ fontSize: 13, fontWeight: 700, color: 'var(--deep-forest)', opacity: 0.8 }}>
                    {t('splashText')}
                  </span>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button 
                      onClick={() => {
                        setLang('ar');
                        localStorage.setItem('lang',"ar");
                      }}
                      style={{ 
                        flex: 1, 
                        padding: '12px 0', 
                        borderRadius: 14, 
                        border: 'none', 
                        fontFamily: 'var(--font-ar)',
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: 'pointer',
                        backgroundColor: lang === 'ar' ? 'var(--deep-forest)' : 'rgba(255,255,255,0.6)',
                        color: lang === 'ar' ? 'var(--white)' : 'var(--deep-forest)',
                        transition: 'var(--transition)'
                      }}
                    >
                      العربية
                    </button>
                    <button 
                      onClick={() => {
                        setLang('en');
                        localStorage.setItem('lang',"en");
                      }}
                      style={{ 
                        flex: 1, 
                        padding: '12px 0', 
                        borderRadius: 14, 
                        border: 'none', 
                        fontFamily: 'var(--font-en)',
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: 'pointer',
                        backgroundColor: lang === 'en' ? 'var(--deep-forest)' : 'rgba(255,255,255,0.6)',
                        color: lang === 'en' ? 'var(--white)' : 'var(--deep-forest)',
                        transition: 'var(--transition)'
                      }}
                    >
                      English
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => setViewState('auth')}
                  className="btn-ripple"
                  style={{ 
                    width: '100%', 
                    padding: '16px 20px', 
                    borderRadius: 18, 
                    border: 'none', 
                    backgroundColor: 'var(--accent-neon)', 
                    color: 'var(--deep-forest)', 
                    fontSize: 15, 
                    fontWeight: 800, 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: 8,
                    boxShadow: '0 8px 16px rgba(62, 222, 165, 0.25)' 
                  }}
                >
                  <span>{t('enterApp')}</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* AUTHENTICATION SCREEN */}
            {viewState === 'auth' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => setViewState('splash')}>
                    <ChevronLeft size={18} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{lang === 'ar' ? 'الرجوع' : 'Back'}</span>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setLang(lang === 'ar' ? 'en' : 'ar');
                      localStorage.setItem('lang',lang === 'ar' ? 'en' : 'ar');
                    }}
                    style={{ height: 30, padding: '0 10px', borderRadius: 8, border: 'none', backgroundColor: 'var(--white)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, cursor: 'pointer', boxShadow: 'var(--shadow-sm)', fontSize: 11, fontWeight: 700, color: 'var(--deep-forest)' }}
                  >
                    <Languages size={12} />
                    <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
                  </button>
                </div>

                <h1 className="ar-text-rtl-left" style={{ fontSize: 24, fontWeight: 800, color: 'var(--deep-forest)', marginBottom: 6 }}>
                  {authTab === 'login' ? t('login') : t('signup')}
                </h1>
                <p className="ar-text-rtl-left" style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
                  {t('subtitle')}
                </p>

                {/* Login / Signup Tabs */}
                <div style={{ display: 'flex', backgroundColor: 'var(--border-light)', borderRadius: 14, padding: 4, marginBottom: 24 }}>
                  <button 
                    onClick={() => { setAuthTab('login'); setAuthError(''); }}
                    style={{ 
                      flex: 1, 
                      padding: '8px 0', 
                      borderRadius: 10, 
                      border: 'none', 
                      fontSize: 13, 
                      fontWeight: 700, 
                      cursor: 'pointer',
                      backgroundColor: authTab === 'login' ? 'var(--white)' : 'transparent',
                      color: authTab === 'login' ? 'var(--deep-forest)' : 'var(--text-muted)',
                      boxShadow: authTab === 'login' ? 'var(--shadow-sm)' : 'none',
                      transition: 'var(--transition)'
                    }}
                  >
                    {t('login')}
                  </button>
                  <button 
                    onClick={() => { setAuthTab('signup'); setAuthError(''); }}
                    style={{ 
                      flex: 1, 
                      padding: '8px 0', 
                      borderRadius: 10, 
                      border: 'none', 
                      fontSize: 13, 
                      fontWeight: 700, 
                      cursor: 'pointer',
                      backgroundColor: authTab === 'signup' ? 'var(--white)' : 'transparent',
                      color: authTab === 'signup' ? 'var(--deep-forest)' : 'var(--text-muted)',
                      boxShadow: authTab === 'signup' ? 'var(--shadow-sm)' : 'none',
                      transition: 'var(--transition)'
                    }}
                  >
                    {t('signup')}
                  </button>
                </div>

                {/* Auth Form */}
                <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  
                  {authTab === 'signup' && (
                    <div>
                      <label className="ar-text-rtl-left" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--deep-forest)', marginBottom: 6 }}>
                        {lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                      </label>
                      <div style={{ position: 'relative' }}>
                        <User size={16} style={{ position: 'absolute', top: 14, left: 16, color: 'var(--text-muted)' }} />
                        <input 
                          type="text" 
                          className="ar-text-rtl-left"
                          placeholder={t('namePlaceholder')}
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          style={{ 
                            width: '100%', 
                            padding: '12px 14px', 
                            paddingLeft: 42,
                            borderRadius: 14, 
                            border: '1px solid var(--border-light)', 
                            outline: 'none', 
                            fontSize: 14,
                            backgroundColor: 'var(--white)',
                            textAlign: 'start'
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="ar-text-rtl-left" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--deep-forest)', marginBottom: 6 }}>
                      {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={16} style={{ position: 'absolute', top: 14, left: 16, color: 'var(--text-muted)' }} />
                      <input 
                        type="email" 
                        className="ar-text-rtl-left"
                        placeholder={t('emailPlaceholder')}
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        style={{ 
                          width: '100%', 
                          padding: '12px 14px', 
                          paddingLeft: 42,
                          borderRadius: 14, 
                          border: '1px solid var(--border-light)', 
                          outline: 'none', 
                          fontSize: 14,
                          backgroundColor: 'var(--white)',
                          textAlign: 'start'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <label className="ar-text-rtl-left" style={{ fontSize: 12, fontWeight: 700, color: 'var(--deep-forest)' }}>
                        {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                      </label>
                      {authTab === 'login' && (
                        <a href="#" tabIndex={-1} style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'none' }}>
                          {t('forgotPassword')}
                        </a>
                      )}
                    </div>
                    <div style={{ position: 'relative' }}>
                      <LockKeyhole size={16} style={{ position: 'absolute', top: 14, left: 16, color: 'var(--text-muted)' }} />
                      <input 
                        type="password" 
                        className="ar-text-rtl-left"
                        placeholder={t('passwordPlaceholder')}
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        style={{ 
                          width: '100%', 
                          padding: '12px 14px', 
                          paddingLeft: 42,
                          borderRadius: 14, 
                          border: '1px solid var(--border-light)', 
                          outline: 'none', 
                          fontSize: 14,
                          backgroundColor: 'var(--white)',
                          textAlign: 'start'
                        }}
                      />
                    </div>
                  </div>

                  {authError && (
                    <div className="ar-text-rtl-left" style={{ color: '#ef4444', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-start' }}>
                      <AlertTriangle size={14} style={{ flexShrink: 0 }} />
                      <span>{authError}</span>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn-ripple pulse-neon"
                    style={{ 
                      width: '100%', 
                      padding: '14px 20px', 
                      borderRadius: 14, 
                      border: 'none', 
                      backgroundColor: 'var(--accent-neon)', 
                      color: 'var(--deep-forest)', 
                      fontSize: 14, 
                      fontWeight: 700, 
                      cursor: 'pointer', 
                      marginTop: 10,
                      boxShadow: '0 6px 12px rgba(62, 222, 165, 0.2)'
                    }}
                  >
                    {authTab === 'login' ? t('login') : t('signup')}
                  </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: 24 }}>
                  <button 
                    onClick={() => { setAuthTab(authTab === 'login' ? 'signup' : 'login'); setAuthError(''); }}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}
                  >
                    {authTab === 'login' ? t('noAccount') : t('hasAccount')}
                  </button>
                </div>
              </div>
            )}

            {/* DASHBOARD SCREEN */}
            {viewState === 'dashboard' && user && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                
                {/* Header Profile Greeting */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: 'var(--primary-mint)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 800, color: 'var(--deep-forest)', fontSize: 16 }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="ar-text-rtl-left" style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>{t('welcome')}</span>
                      <span className="ar-text-rtl-left" style={{ fontSize: 15, fontWeight: 800, color: 'var(--deep-forest)', display: 'block' }}>{user.name}</span>
                    </div>
                  </div>
                  
                  {/* Premium Brand Badge */}
                  <div style={{ 
                    padding: '6px 12px', 
                    borderRadius: 20, 
                    backgroundColor: 'rgba(62, 222, 165, 0.12)', 
                    border: '1.5px solid var(--accent-neon)', 
                    fontSize: 11, 
                    fontWeight: 800, 
                    color: 'var(--deep-forest)',
                    boxShadow: '0 2px 8px rgba(62, 222, 165, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}>
                    <Sparkles size={10} style={{ color: 'var(--dark-green)' }} />
                    <span>{t('title')}</span>
                  </div>
                </div>

                {/* Progress Summary Card */}
                <div className="glass-panel" style={{ padding: 18, backgroundColor: 'var(--primary-mint)', border: 'none', borderRadius: 20, marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <h3 className="ar-text-rtl-left" style={{ fontSize: 14, fontWeight: 800, color: 'var(--deep-forest)', marginBottom: 4 }}>
                      {t('progress')}
                    </h3>
                    <p className="ar-text-rtl-left" style={{ fontSize: 11, color: 'var(--dark-green)', opacity: 0.8, marginBottom: 14 }}>
                      {lang === 'ar' 
                        ? `تم تفعيل ${unlockedTopicsCount} من أصل ${totalTopics} مواضيع تحضيرية` 
                        : `Unlocked ${unlockedTopicsCount} of ${totalTopics} preparation topics`}
                    </p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ flex: 1, height: 8, backgroundColor: 'rgba(13,36,28,0.1)', borderRadius: 10, overflow: 'hidden' }}>
                        <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: 'var(--accent-neon)', borderRadius: 10 }}></div>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--deep-forest)' }}>
                        {progressPercent}%
                      </span>
                    </div>
                  </div>
                  {/* Subtle design elements */}
                  <div style={{ position: 'absolute', right: -20, bottom: -20, width: 90, height: 90, borderRadius: '50%', backgroundColor: 'rgba(62,222,165,0.2)' }}></div>
                </div>

                {/* Modules Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <h3 className="ar-text-rtl-left" style={{ fontSize: 14, fontWeight: 800, color: 'var(--deep-forest)', borderBottom: '1px solid var(--border-light)', paddingBottom: 8 }}>
                    {t('modules')}
                  </h3>

                  {examModules.map((mod) => {
                    const isUnlocked = unlockedModules.includes(mod.id);
                    const isShaking = shakeLockedId === mod.id;
                    return (
                      <div 
                        key={mod.id}
                        onClick={() => handleModuleClick(mod)}
                        className={`glass-panel btn-ripple ${isShaking ? 'shake-lock' : ''}`}
                        style={{ 
                          padding: '14px 16px', 
                          cursor: 'pointer', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          gap: 12,
                          backgroundColor: isUnlocked ? 'var(--white)' : 'rgba(255, 255, 255, 0.45)',
                          border: isUnlocked ? '1.5px solid var(--primary-mint)' : '1px dashed var(--border-light)',
                          opacity: isUnlocked ? 1 : 0.85,
                          width: '100%',
                          minWidth: 0
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
                          {/* Module Symbol */}
                          <div style={{ 
                            width: 40, 
                            height: 40, 
                            borderRadius: 12, 
                            backgroundColor: isUnlocked ? 'var(--primary-mint)' : 'var(--border-light)', 
                            color: 'var(--deep-forest)',
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            flexShrink: 0
                          }}>
                            {mod.icon === 'Award' && <Sparkles size={20} />}
                            {mod.icon === 'Shield' && <Shield size={20} />}
                            {mod.icon === 'BookOpen' && <BookOpen size={20} />}
                          </div>

                          <div style={{ textAlign: 'start', flex: 1, minWidth: 0 }}>
                            <h4 className="ar-text-rtl-left" style={{ fontSize: 13, fontWeight: 800, color: 'var(--deep-forest)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {lang === 'ar' ? mod.titleAr : mod.titleEn}
                            </h4>
                            <p className="ar-text-rtl-left" style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {lang === 'ar' ? mod.descriptionAr : mod.descriptionEn}
                            </p>
                          </div>
                        </div>

                        {/* Status indicators */}
                        <div style={{ flexShrink: 0 }}>
                          {isUnlocked ? (
                            <div style={{ 
                              padding: '4px 8px', 
                              backgroundColor: 'rgba(62, 222, 165, 0.15)', 
                              color: 'var(--dark-green)', 
                              fontSize: 10, 
                              fontWeight: 700, 
                              borderRadius: 8, 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 4 
                            }}>
                              <Unlock size={10} style={{ color: '#0f766e' }} />
                              <span>{t('unlockedBadge')}</span>
                            </div>
                          ) : (
                            <div style={{ 
                              padding: '4px 8px', 
                              backgroundColor: 'var(--border-light)', 
                              color: 'var(--text-muted)', 
                              fontSize: 10, 
                              fontWeight: 700, 
                              borderRadius: 8, 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 4 
                            }}>
                              <Lock size={10} />
                              <span>{t('lockedBadge')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Dashboard Bottom Action Bar (Language Switcher next to Exit button) */}
                <div style={{ 
                  display: 'flex', 
                  gap: 12, 
                  marginTop: 24, 
                  paddingTop: 16, 
                  borderTop: '1.5px solid var(--border-light)', 
                  justifyContent: 'center', 
                  alignItems: 'center' 
                }}>
                  {/* Language Switcher */}
                  <button 
                    onClick={() => {
                      setLang(lang === 'ar' ? 'en' : 'ar');
                      localStorage.setItem('lang',lang === 'ar' ? 'en' : 'ar');
                    }} 
                    className="btn-ripple"
                    style={{ 
                      flex: 1, 
                      height: 42, 
                      borderRadius: 12, 
                      border: '1px solid var(--border-light)', 
                      backgroundColor: 'var(--white)', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      gap: 8, 
                      cursor: 'pointer', 
                      boxShadow: 'var(--shadow-sm)', 
                      fontSize: 13, 
                      fontWeight: 800, 
                      color: 'var(--deep-forest)' 
                    }}
                  >
                    <Languages size={16} />
                    <span>{lang === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
                  </button>
                  
                  {/* Exit (Sign Out) Button */}
                  <button 
                    onClick={handleLogout}
                    className="btn-ripple"
                    style={{ 
                      flex: 1, 
                      height: 42, 
                      borderRadius: 12, 
                      border: '1px solid #fee2e2', 
                      backgroundColor: '#fef2f2', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      gap: 8, 
                      cursor: 'pointer', 
                      boxShadow: 'var(--shadow-sm)', 
                      fontSize: 13, 
                      fontWeight: 800, 
                      color: '#ef4444' 
                    }}
                  >
                    <LogOut size={16} />
                    <span>{lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}</span>
                  </button>
                </div>

              </div>
            )}

            {/* TOPICS SCREEN */}
            {viewState === 'topics' && activeModule && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                
                {/* Back to Dashboard Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: 12, marginBottom: 14 }}>
                  <button 
                    onClick={() => setViewState('dashboard')}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--deep-forest)', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
                  >
                    <ChevronLeft size={16} />
                    <span>{lang === 'ar' ? 'الرئيسية' : 'Dashboard'}</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      setLang(lang === 'ar' ? 'en' : 'ar');
                      localStorage.setItem('lang',lang === 'ar' ? 'en' : 'ar');
                    }}
                    style={{ height: 26, padding: '0 8px', borderRadius: 6, border: 'none', backgroundColor: 'var(--white)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, cursor: 'pointer', boxShadow: 'var(--shadow-sm)', fontSize: 10, fontWeight: 800, color: 'var(--deep-forest)' }}
                  >
                    <Languages size={10} />
                    <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
                  </button>
                </div>

                {/* Module Details */}
                <div style={{ textAlign: 'start', marginBottom: 20 }}>
                  <h2 className="ar-text-rtl-left" style={{ fontSize: 18, fontWeight: 800, color: 'var(--deep-forest)' }}>
                    {lang === 'ar' ? activeModule.titleAr : activeModule.titleEn}
                  </h2>
                  <p className="ar-text-rtl-left" style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                    {lang === 'ar' ? activeModule.descriptionAr : activeModule.descriptionEn}
                  </p>
                </div>

                {/* Unlock Module Banner if not unlocked */}
                {!unlockedModules.includes(activeModule.id) && (
                  <div 
                    onClick={() => {
                      setCheckoutModule(activeModule);
                      setCheckoutTopic(null);
                      setCheckoutType('module');
                      setCheckoutError('');
                    }}
                    className="glass-panel btn-ripple" 
                    style={{ 
                      padding: '14px 16px', 
                      backgroundColor: 'var(--primary-mint)', 
                      border: '1.5px solid var(--accent-neon)', 
                      borderRadius: 16, 
                      marginBottom: 20, 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12
                    }}
                  >
                    <div style={{ textAlign: 'start' }}>
                      <h4 className="ar-text-rtl-left" style={{ fontSize: 13, fontWeight: 800, color: 'var(--deep-forest)' }}>
                        {lang === 'ar' ? 'تفعيل كامل الحقيبة' : 'Unlock Complete Suite'}
                      </h4>
                      <p className="ar-text-rtl-left" style={{ fontSize: 11, color: 'var(--dark-green)', opacity: 0.8, marginTop: 2 }}>
                        {lang === 'ar' ? `احصل على كل المواضيع بـ ${activeModule.price} ريال فقط` : `Get all topics for just ${activeModule.price} SAR`}
                      </p>
                    </div>
                    <Sparkles size={20} style={{ color: 'var(--deep-forest)', flexShrink: 0 }} />
                  </div>
                )}

                {/* Topics List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <h3 className="ar-text-rtl-left" style={{ fontSize: 13, fontWeight: 800, color: 'var(--deep-forest)', borderBottom: '1px solid var(--border-light)', paddingBottom: 6 }}>
                    {lang === 'ar' ? 'مواضيع الحقيبة' : 'Suite Topics'}
                  </h3>

                  {activeModule.topics.map((topic) => {
                    const isUnlocked = unlockedModules.includes(activeModule.id) || unlockedTopics.includes(topic.id);
                    const isShaking = shakeLockedId === topic.id;
                    return (
                      <div 
                        key={topic.id}
                        onClick={() => handleTopicClick(topic)}
                        className={`glass-panel btn-ripple ${isShaking ? 'shake-lock' : ''}`}
                        style={{ 
                          padding: '12px 14px', 
                          cursor: 'pointer', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between',
                          gap: 12,
                          backgroundColor: isUnlocked ? 'var(--white)' : 'rgba(255, 255, 255, 0.45)',
                          border: isUnlocked ? '1px solid var(--primary-mint)' : '1px dashed var(--border-light)',
                          opacity: isUnlocked ? 1 : 0.85,
                          width: '100%'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                          <div style={{ 
                            width: 32, 
                            height: 32, 
                            borderRadius: 10, 
                            backgroundColor: isUnlocked ? 'var(--primary-mint)' : 'var(--border-light)', 
                            color: 'var(--deep-forest)',
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            flexShrink: 0
                          }}>
                            {isUnlocked ? <Unlock size={16} /> : <Lock size={16} />}
                          </div>

                          <div style={{ textAlign: 'start', flex: 1, minWidth: 0 }}>
                            <h4 className="ar-text-rtl-left" style={{ fontSize: 12, fontWeight: 800, color: 'var(--deep-forest)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {lang === 'ar' ? topic.titleAr : topic.titleEn}
                            </h4>
                            <p className="ar-text-rtl-left" style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {lang === 'ar' ? topic.descriptionAr : topic.descriptionEn}
                            </p>
                          </div>
                        </div>

                        {/* Status/Price Indicator */}
                        <div style={{ flexShrink: 0 }}>
                          {isUnlocked ? (
                            <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--dark-green)' }}>
                              {lang === 'ar' ? 'متاح' : 'Free/Unlocked'}
                            </span>
                          ) : (
                            <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--deep-forest)', opacity: 0.8, backgroundColor: 'var(--primary-mint)', padding: '2px 6px', borderRadius: 6 }}>
                              {topic.price} SAR
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* SECURE VIEWER SCREEN */}
            {viewState === 'viewer' && user && activeTopic && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                
                {/* Watermarks for Security screen overlay */}
                {renderWatermarks()}

                {/* Back to Topics List Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: 12, marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button 
                      onClick={() => setViewState('topics')}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--deep-forest)', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}
                    >
                      <ChevronLeft size={16} />
                      <span>{lang === 'ar' ? 'المواضيع' : 'Topics'}</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        setLang(lang === 'ar' ? 'en' : 'ar');
                        localStorage.setItem('lang',lang === 'ar' ? 'en' : 'ar');
                      }}
                      style={{ height: 26, padding: '0 8px', borderRadius: 6, border: 'none', backgroundColor: 'var(--white)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, cursor: 'pointer', boxShadow: 'var(--shadow-sm)', fontSize: 10, fontWeight: 800, color: 'var(--deep-forest)', marginInlineStart: 8 }}
                    >
                      <Languages size={10} />
                      <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--dark-green)', fontSize: 10, fontWeight: 800 }}>
                    <Shield size={12} className="text-emerald-600" style={{ color: '#059669' }} />
                    <span>{t('secureViewerActive')}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'start', marginBottom: 16 }}>
                  <h2 className="ar-text-rtl-left" style={{ fontSize: 18, fontWeight: 800, color: 'var(--deep-forest)' }}>
                    {lang === 'ar' ? activeTopic.titleAr : activeTopic.titleEn}
                  </h2>
                </div>

                {/* View Tabs Selector */}
                <div style={{ display: 'flex', backgroundColor: 'var(--border-light)', borderRadius: 12, padding: 3, marginBottom: 16 }}>
                  {(['materials', 'quiz', 'concepts'] as const).map((tab) => {
                    let tabLabel = '';
                    if (tab === 'materials') tabLabel = t('studyGuideTab');
                    if (tab === 'quiz') tabLabel = t('takeQuizTab');
                    if (tab === 'concepts') tabLabel = t('conceptsTab');

                    return (
                      <button 
                        key={tab}
                        onClick={() => setViewerTab(tab)}
                        style={{ 
                          flex: 1, 
                          padding: '8px 0', 
                          borderRadius: 8, 
                          border: 'none', 
                          fontSize: 11, 
                          fontWeight: 700, 
                          cursor: 'pointer',
                          backgroundColor: viewerTab === tab ? 'var(--white)' : 'transparent',
                          color: viewerTab === tab ? 'var(--deep-forest)' : 'var(--text-muted)',
                          boxShadow: viewerTab === tab ? 'var(--shadow-sm)' : 'none',
                          transition: 'var(--transition)'
                        }}
                      >
                        {tabLabel}
                      </button>
                    );
                  })}
                </div>

                {/* VIEW-ONLY CONTENT CONTAINER */}
                <div className={`glass-panel ${isBlurred ? 'security-blur' : ''}`} style={{ flex: 1, padding: 16, backgroundColor: 'var(--white)', overflowY: 'auto', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  
                  {/* WATERMARK BACKGROUND EFFECT IN TEXT */}
                  <div style={{ position: 'relative', zIndex: 5 }}>
                    
                    {/* TAB 1: STUDY MATERIALS */}
                    {viewerTab === 'materials' && (
                      <div style={{ textAlign: 'start' }}>
                        {activeTopic.materialsEn.map((item, idx) => {
                          const content = lang === 'ar' ? activeTopic.materialsAr[idx] : item;
                          return (
                            <p key={idx} className="ar-text-rtl-left" style={{ fontSize: 13, lineHeight: '150%', color: 'var(--text-primary)', marginBottom: 14, borderLeft: '3px solid var(--accent-neon)', paddingLeft: 10 }}>
                              {content}
                            </p>
                          );
                        })}
                        
                        {/* Security notice block */}
                        <div style={{ marginTop: 24, padding: 12, backgroundColor: 'var(--light-gray)', borderRadius: 12, border: '1px solid var(--border-light)' }}>
                          <h5 style={{ fontSize: 11, fontWeight: 700, color: 'var(--deep-forest)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Shield size={12} style={{ color: 'var(--accent-neon)' }} />
                            <span className="ar-text-rtl-left">{t('securityWarningTitle')}</span>
                          </h5>
                          <p className="ar-text-rtl-left" style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: '140%' }}>
                            {t('securityWarningDesc')}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* TAB 2: INTERACTIVE QUIZ PRACTICE */}
                    {viewerTab === 'quiz' && (
                      <div style={{ textAlign: 'start' }}>
                        {activeTopic.questions.map((q, qIdx) => (
                          <div key={q.id} style={{ marginBottom: 20, borderBottom: qIdx !== activeTopic.questions.length - 1 ? '1px solid var(--border-light)' : 'none', paddingBottom: 16 }}>
                            <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 800 }}>
                              {lang === 'ar' ? `السؤال ${qIdx + 1}` : `QUESTION ${qIdx + 1}`}
                            </span>
                            <h4 className="ar-text-rtl-left" style={{ fontSize: 13, fontWeight: 700, color: 'var(--deep-forest)', margin: '4px 0 12px' }}>
                              {lang === 'ar' ? q.questionAr : q.questionEn}
                            </h4>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                              {q.optionsEn.map((opt, optIdx) => {
                                const optionText = lang === 'ar' ? q.optionsAr[optIdx] : opt;
                                const isSelected = currentQuestionAnswers[q.id] === optIdx;
                                const showFeedback = quizScore !== null;
                                const isCorrect = optIdx === q.correctIndex;

                                let borderStyle = '1px solid var(--border-light)';
                                let bgStyle = 'var(--white)';
                                
                                if (isSelected) {
                                  borderStyle = '1.5px solid var(--deep-forest)';
                                  bgStyle = 'var(--primary-mint)';
                                }
                                if (showFeedback) {
                                  if (isCorrect) {
                                    borderStyle = '1.5px solid #10b981';
                                    bgStyle = '#d1fae5';
                                  } else if (isSelected) {
                                    borderStyle = '1.5px solid #ef4444';
                                    bgStyle = '#fee2e2';
                                  }
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    disabled={quizScore !== null}
                                    onClick={() => handleAnswerSelect(q.id, optIdx)}
                                    style={{ 
                                      width: '100%', 
                                      padding: '10px 14px', 
                                      borderRadius: 10, 
                                      border: borderStyle,
                                      backgroundColor: bgStyle,
                                      textAlign: 'start', 
                                      fontSize: 12, 
                                      fontWeight: 600,
                                      color: 'var(--text-primary)',
                                      cursor: quizScore !== null ? 'default' : 'pointer',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      transition: 'var(--transition)'
                                    }}
                                  >
                                    <span className="ar-text-rtl-left">{optionText}</span>
                                    {showFeedback && isCorrect && <Check size={14} style={{ color: '#10b981' }} />}
                                    {showFeedback && !isCorrect && isSelected && <X size={14} style={{ color: '#ef4444' }} />}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Show Explanation if graded */}
                            {quizScore !== null && (
                              <div style={{ marginTop: 12, padding: 10, backgroundColor: 'var(--light-gray)', borderRadius: 8, borderLeft: '3px solid #10b981' }}>
                                <span className="ar-text-rtl-left" style={{ fontSize: 11, fontWeight: 700, color: 'var(--deep-forest)', display: 'block', marginBottom: 2 }}>
                                  {t('questionExplanation')}:
                                </span>
                                <p className="ar-text-rtl-left" style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: '140%' }}>
                                  {lang === 'ar' ? q.explanationAr : q.explanationEn}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Grading buttons */}
                        {quizScore === null ? (
                          <button
                            onClick={handleGradeQuiz}
                            disabled={Object.keys(currentQuestionAnswers).length !== activeTopic.questions.length}
                            className="btn-ripple"
                            style={{
                              width: '100%',
                              padding: '12px 0',
                              borderRadius: 12,
                              border: 'none',
                              backgroundColor: Object.keys(currentQuestionAnswers).length === activeTopic.questions.length ? 'var(--accent-neon)' : 'var(--border-light)',
                              color: Object.keys(currentQuestionAnswers).length === activeTopic.questions.length ? 'var(--deep-forest)' : 'var(--text-muted)',
                              fontWeight: 700,
                              fontSize: 13,
                              cursor: Object.keys(currentQuestionAnswers).length === activeTopic.questions.length ? 'pointer' : 'default',
                              boxShadow: 'var(--shadow-sm)',
                              marginTop: 10
                            }}
                          >
                            {lang === 'ar' ? 'تصحيح الإجابات' : 'Submit Answers'}
                          </button>
                        ) : (
                          <div style={{ textAlign: 'center', marginTop: 14 }}>
                            <div style={{ padding: 12, backgroundColor: 'var(--primary-mint)', borderRadius: 12, marginBottom: 12 }}>
                              <span className="ar-text-rtl-center" style={{ fontSize: 12, fontWeight: 800, color: 'var(--deep-forest)', display: 'block' }}>
                                {t('quizCompleted')}
                              </span>
                              <span className="ar-text-rtl-center" style={{ fontSize: 20, fontWeight: 800, color: 'var(--deep-forest)', marginTop: 4, display: 'block' }}>
                                {quizScore} / {activeTopic.questions.length}
                              </span>
                            </div>
                            <button
                              onClick={() => {
                                setQuizScore(null);
                                setCurrentQuestionAnswers({});
                              }}
                              className="btn-ripple"
                              style={{
                                width: '100%',
                                padding: '10px 0',
                                borderRadius: 12,
                                border: '1px solid var(--border-light)',
                                backgroundColor: 'var(--white)',
                                color: 'var(--deep-forest)',
                                fontWeight: 700,
                                fontSize: 12,
                                cursor: 'pointer'
                              }}
                            >
                              {t('resetQuiz')}
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB 3: KEY CONCEPTS GLOSSARY */}
                    {viewerTab === 'concepts' && (
                      <div style={{ textAlign: 'start', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {activeTopic.conceptsEn.map((item, idx) => {
                          const concept = lang === 'ar' ? activeTopic.conceptsAr[idx] : item;
                          return (
                            <div key={idx} style={{ padding: 12, border: '1px solid var(--border-light)', borderRadius: 12, backgroundColor: 'var(--light-gray)' }}>
                              <h4 className="ar-text-rtl-left" style={{ fontSize: 13, fontWeight: 800, color: 'var(--deep-forest)', marginBottom: 4 }}>
                                {concept.term}
                              </h4>
                              <p className="ar-text-rtl-left" style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: '140%' }}>
                                {concept.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}

                  </div>
                </div>

              </div>
            )}
          </div>

          {/* SIMULATED PURCHASE / PAYMENT MODAL */}
          {checkoutModule && (
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              backgroundColor: 'rgba(13,36,28,0.75)', 
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              zIndex: 500, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'flex-end' 
            }}>
              
              <div 
                className="custom-scroll"
                style={{ 
                  backgroundColor: 'var(--white)', 
                  borderTopLeftRadius: 32, 
                  borderTopRightRadius: 32, 
                  padding: '24px 20px', 
                  maxHeight: '85%', 
                  overflowY: 'auto',
                  boxShadow: '0 -10px 25px rgba(0,0,0,0.3)',
                  animation: 'slideUp 0.3s ease-out'
                }}
              >
                {/* Confetti celebration panel */}
                {showConfetti && (
                  <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    backgroundColor: 'var(--white)', 
                    borderRadius: 32, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    zIndex: 10, 
                    textAlign: 'center',
                    padding: 24 
                  }}>
                    <div style={{ width: 70, height: 70, borderRadius: '50%', backgroundColor: 'rgba(62,222,165,0.15)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 16 }} className="pulse-neon">
                      <CheckCircle2 size={38} style={{ color: '#10b981' }} />
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--deep-forest)', marginBottom: 6 }}>
                      {t('paymentSuccess')}
                    </h3>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {lang === 'ar' ? 'جاري توجيهك إلى المحتوى الآمن...' : 'Opening secure study portal...'}
                    </p>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--deep-forest)' }}>
                    {checkoutTopic 
                      ? (lang === 'ar' ? 'تفعيل المحتوى المميز' : 'Unlock Premium Content')
                      : t('checkoutTitle')}
                  </h3>
                  <button 
                    onClick={() => { setCheckoutModule(null); setCheckoutTopic(null); setCheckoutError(''); }}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    <X size={20} />
                  </button>
                </div>

                <p className="ar-text-rtl-left" style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16, textAlign: 'start' }}>
                  {checkoutTopic 
                    ? (lang === 'ar' 
                        ? `اختر خيار تفعيل المحتوى لـ: ${checkoutTopic.titleAr}` 
                        : `Choose unlock option for: ${checkoutTopic.titleEn}`)
                    : `${t('checkoutSubtitle')} (${lang === 'ar' ? checkoutModule.titleAr : checkoutModule.titleEn})`}
                </p>

                {/* Purchase Type Selector */}
                {checkoutTopic && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                    <label className="ar-text-rtl-left" style={{ fontSize: 11, fontWeight: 700, color: 'var(--deep-forest)', textAlign: 'start' }}>
                      {lang === 'ar' ? 'اختر خيار التفعيل:' : 'Select unlock option:'}
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <button 
                        type="button"
                        onClick={() => setCheckoutType('topic')}
                        style={{ 
                          padding: '12px 14px', 
                          borderRadius: 12, 
                          border: checkoutType === 'topic' ? '2.5px solid var(--accent-neon)' : '1px solid var(--border-light)',
                          backgroundColor: checkoutType === 'topic' ? 'rgba(62,222,165,0.08)' : 'var(--white)',
                          color: 'var(--deep-forest)',
                          textAlign: 'start',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <span className="ar-text-rtl-left" style={{ fontSize: 12, fontWeight: 800, display: 'block' }}>
                            {lang === 'ar' ? 'تفعيل هذا الموضوع فقط' : 'Unlock this topic only'}
                          </span>
                          <span className="ar-text-rtl-left" style={{ fontSize: 10, color: 'var(--text-muted)', display: 'block', marginTop: 2 }}>
                            {lang === 'ar' ? `الوصول لهذا الموضوع بـ ${checkoutTopic.price} ريال` : `Access this topic for ${checkoutTopic.price} SAR`}
                          </span>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 800 }}>{checkoutTopic.price} SAR</span>
                      </button>

                      <button 
                        type="button"
                        onClick={() => setCheckoutType('module')}
                        style={{ 
                          padding: '12px 14px', 
                          borderRadius: 12, 
                          border: checkoutType === 'module' ? '2.5px solid var(--accent-neon)' : '1px solid var(--border-light)',
                          backgroundColor: checkoutType === 'module' ? 'rgba(62,222,165,0.08)' : 'var(--white)',
                          color: 'var(--deep-forest)',
                          textAlign: 'start',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <span className="ar-text-rtl-left" style={{ fontSize: 12, fontWeight: 800, display: 'block' }}>
                            {lang === 'ar' ? 'تفعيل الحقيبة كاملة' : 'Unlock entire suite'}
                          </span>
                          <span className="ar-text-rtl-left" style={{ fontSize: 10, color: 'var(--text-muted)', display: 'block', marginTop: 2 }}>
                            {lang === 'ar' ? `كل المواضيع مدى الحياة بـ ${checkoutModule.price} ريال` : `All topics lifetime access for ${checkoutModule.price} SAR`}
                          </span>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 800 }}>{checkoutModule.price} SAR</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Cost Card */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  backgroundColor: 'var(--primary-mint)', 
                  padding: '14px 18px', 
                  borderRadius: 14, 
                  marginBottom: 20 
                }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--deep-forest)' }}>
                    {lang === 'ar' 
                      ? `التكلفة: ${checkoutType === 'topic' ? checkoutTopic?.price : checkoutModule?.price} ريال سعودي` 
                      : `Price: ${checkoutType === 'topic' ? checkoutTopic?.price : checkoutModule?.price} SAR`}
                  </span>
                  <span style={{ fontSize: 10, padding: '4px 8px', backgroundColor: 'var(--deep-forest)', color: 'var(--white)', borderRadius: 8, fontWeight: 800 }}>
                    {lang === 'ar' ? 'مدى الحياة' : 'LIFETIME ACCESS'}
                  </span>
                </div>

                {/* Checkout selection tabs */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                  <button 
                    onClick={() => { setPaymentMethod('mada'); setCheckoutError(''); }}
                    style={{ 
                      flex: 1, 
                      padding: '12px 0', 
                      borderRadius: 12, 
                      border: paymentMethod === 'mada' ? '2px solid var(--accent-neon)' : '1px solid var(--border-light)',
                      backgroundColor: paymentMethod === 'mada' ? 'rgba(62,222,165,0.08)' : 'var(--white)',
                      color: 'var(--deep-forest)',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 6,
                      transition: 'var(--transition)'
                    }}
                  >
                    <CreditCard size={14} />
                    <span>{t('madaPayment')}</span>
                  </button>

                  <button 
                    onClick={() => { setPaymentMethod('apple'); setCheckoutError(''); }}
                    style={{ 
                      flex: 1, 
                      padding: '12px 0', 
                      borderRadius: 12, 
                      border: paymentMethod === 'apple' ? '2px solid #000' : '1px solid var(--border-light)',
                      backgroundColor: paymentMethod === 'apple' ? '#000' : 'var(--white)',
                      color: paymentMethod === 'apple' ? 'var(--white)' : 'var(--deep-forest)',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 6,
                      transition: 'var(--transition)'
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 800 }}></span>
                    <span>{t('applePay')}</span>
                  </button>
                </div>

                {/* MADA CREDIT CARD FORM */}
                {paymentMethod === 'mada' ? (
                  <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'start' }}>
                    <div>
                      <label className="ar-text-rtl-left" style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--deep-forest)', marginBottom: 4 }}>
                        {t('cardHolderName')}
                      </label>
                      <input 
                        type="text" 
                        className="ar-text-rtl-left"
                        placeholder="Mohammad Al-Saudi" 
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border-light)', outline: 'none', fontSize: 13 }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--deep-forest)', marginBottom: 4 }}>
                        {t('cardNumber')}
                      </label>
                      <input 
                        type="text" 
                        placeholder="4000 1234 5678 9010" 
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => {
                          // Format with spaces
                          const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                          setCardNumber(val);
                        }}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border-light)', outline: 'none', fontSize: 13 }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--deep-forest)', marginBottom: 4 }}>
                          {t('expiryDate')}
                        </label>
                        <input 
                          type="text" 
                          placeholder="12/28" 
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '');
                            if (val.length > 2) {
                              val = val.substring(0, 2) + '/' + val.substring(2, 4);
                            }
                            setCardExpiry(val);
                          }}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border-light)', outline: 'none', fontSize: 13 }}
                        />
                      </div>

                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--deep-forest)', marginBottom: 4 }}>
                          {t('cvv')}
                        </label>
                        <input 
                          type="password" 
                          placeholder="•••" 
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border-light)', outline: 'none', fontSize: 13 }}
                        />
                      </div>
                    </div>

                    {checkoutError && (
                      <span className="ar-text-rtl-left" style={{ color: '#ef4444', fontSize: 11, fontWeight: 600 }}>
                        {checkoutError}
                      </span>
                    )}

                    <button 
                      type="submit" 
                      disabled={isProcessingPayment}
                      className="btn-ripple"
                      style={{ 
                        width: '100%', 
                        padding: '14px 0', 
                        borderRadius: 14, 
                        border: 'none', 
                        backgroundColor: 'var(--accent-neon)', 
                        color: 'var(--deep-forest)', 
                        fontSize: 13, 
                        fontWeight: 800, 
                        cursor: isProcessingPayment ? 'default' : 'pointer',
                        marginTop: 10 
                      }}
                    >
                      {isProcessingPayment ? t('paymentProcessing') : t('payNow')}
                    </button>
                  </form>
                ) : (
                  
                  /* Apple Pay simulation view */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <button
                      onClick={handleApplePaySimulate}
                      disabled={isProcessingPayment}
                      style={{
                        width: '100%',
                        padding: '14px 0',
                        borderRadius: 14,
                        border: 'none',
                        backgroundColor: '#000',
                        color: 'var(--white)',
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: isProcessingPayment ? 'default' : 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 6
                      }}
                    >
                      {isProcessingPayment ? (
                        <span>{t('paymentProcessing')}</span>
                      ) : (
                        <>
                          <span style={{ fontSize: 16, fontWeight: 800 }}></span>
                          <span>{t('applePay')}</span>
                        </>
                      )}
                    </button>
                  </div>

                )}

                <button 
                  onClick={() => { setCheckoutModule(null); setCheckoutTopic(null); setCheckoutError(''); }}
                  style={{ 
                    width: '100%', 
                    padding: '10px 0', 
                    borderRadius: 12, 
                    border: '1px solid var(--border-light)', 
                    backgroundColor: 'var(--light-gray)', 
                    color: 'var(--text-muted)', 
                    fontSize: 11, 
                    fontWeight: 700, 
                    cursor: 'pointer',
                    marginTop: 12
                  }}
                >
                  {t('paymentCancel')}
                </button>
              </div>
            </div>
          )}

          {/* CUSTOM ACCESS BLOCKED TOAST MESSAGE */}
          <div className={`security-toast ${showSecurityToast ? 'show' : ''}`}>
            <AlertTriangle size={18} style={{ color: 'var(--accent-neon)', flexShrink: 0 }} />
            <span className="ar-text-rtl-left" style={{ textAlign: 'start', lineHeight: '130%', flex: 1 }}>{t('protectionToast')}</span>
          </div>

          {/* Home indicator bar (Simulated mobile) */}
          <div className="home-indicator-bar"></div>
        </div>
      </div>
    </div>
  );
}
