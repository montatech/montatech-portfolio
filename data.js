/* ======================================================================
   CONTENT SETTINGS — edit this file to update the portfolio.
   All names, project cards, skill groups and awards are rendered from here.
   ====================================================================== */

const PROFILE = {
  firstName: "Mahdi",
  lastName: "Montazeri",
  fullName: "Mahdi Montazeri Najafabadi",
  surnameExtra: "Najafabadi",
  role: "Aspiring Computer Science & AI Undergraduate",
  tagline: "Practical experience building Android applications, web platforms, and software for robotics and environmental-monitoring projects.",
  status: "Aspiring CS / AI Undergraduate",
  location: "Isfahan, Iran",
  email: "mahdimont67@gmail.com",
  github: "https://github.com/montatech",
  cv: "assets/Mahdi_Montazeri_CV.pdf",
};

/* Add or remove project objects here. Set link to an actual project URL when available. */
const PROJECTS = [
  {
    id: "hamrahmadrese",
    title: "HamrahMadrese",
    subtitle: "Educational marketplace",
    description: "Developed and deployed an educational marketplace using Django, Python and MySQL. Implemented account authentication, phone OTP verification, educational product and content management, Zarinpal payments, digital purchases and downloads, and production deployment and maintenance.",
    category: "web",
    tags: ["Python", "Django", "MySQL", "Zarinpal"],
    year: "2026",
    status: "Deployed platform",
    visual: "commerce",
    link: "",
  },
  {
    id: "focus-leaf",
    title: "Focus Leaf",
    subtitle: "Android productivity app",
    description: "An Android app designed to help users manage focus goals and reduce distractions. Documented features include timed focus sessions, Deep Focus mode, allowed-app selection, short breaks, emergency unlock and a dark UI.",
    category: "android",
    tags: ["Kotlin", "Android", "Focus sessions"],
    year: "2026",
    status: "Independent project",
    visual: "mobile",
    link: "",
  },
  {
    id: "first-global",
    title: "FIRST Global Challenge",
    subtitle: "Robot software · Team Iran",
    description: "Contributed software for Team Iran's competition robots across two seasons. Work included Java and OnBot Java, motor and servo control, holonomic drive, IMU-based movement, AprilTag-related functions and autonomous robot behaviour.",
    category: "robotics",
    tags: ["Java", "OnBot Java", "IMU", "AprilTag"],
    year: "2025–2026",
    status: "Team project",
    visual: "robot",
    link: "",
  },
  {
    id: "pyroguard",
    title: "PyroGuard",
    subtitle: "Wildfire sensor / IoT project",
    description: "A team environmental-monitoring concept. Contributed to sensor-node communication and embedded IoT software using Arduino/C++ and sensor-data transmission.",
    category: "robotics",
    tags: ["Arduino", "C++", "IoT"],
    year: "2025",
    status: "Team project",
    visual: "sensors",
    link: "",
  },
  {
    id: "simorgh",
    title: "Simorgh",
    subtitle: "Wildfire-risk monitoring platform",
    description: "Developed web-platform components for an environmental-monitoring project, including a sensor dashboard and wildfire-risk visualisation features. The project concept combines field sensor readings with vegetation information for risk awareness.",
    category: "web",
    tags: ["Web platform", "Dashboard", "Data visualisation"],
    year: "2026",
    status: "Team project",
    visual: "dashboard",
    link: "",
  },
  {
    id: "smart-boom",
    title: "Smart Boom",
    subtitle: "University of Isfahan internship",
    description: "Implemented Kotlin login and registration interfaces as part of an internship project under supervision.",
    category: "android",
    tags: ["Kotlin", "Android UI", "Internship"],
    year: "2024",
    status: "Internship project",
    visual: "mobile-alt",
    link: "",
  },
  {
    id: "flower-plant-shop",
    title: "Flower & Plant Shop",
    subtitle: "Android shopping app",
    description: "A personal Android shopping application developed using Kotlin.",
    category: "android",
    tags: ["Kotlin", "Android"],
    year: "Personal project",
    status: "Personal project",
    visual: "shop",
    link: "",
  },
  {
    id: "currency-notes",
    title: "Currency Tracker & Notes",
    subtitle: "Small Android applications",
    description: "A pair of personal Android applications: one for tracking currency information and another for managing notes.",
    category: "android",
    tags: ["Kotlin", "Android", "SQLite"],
    year: "Personal projects",
    status: "Personal projects",
    visual: "apps",
    link: "",
  },
];

const CATEGORY_META = {
  all: { label: "All work" },
  web: { label: "Web" },
  android: { label: "Android" },
  robotics: { label: "Robotics & IoT" },
};

/* Skills are kept factual; learning areas are labelled as learning. */
const SKILLS = [
  {
    id: "software",
    number: "01",
    title: "Software & web",
    summary: "Building web platforms and the server-side functionality behind them.",
    description: "Practical project experience with a deployed educational marketplace, including accounts, phone verification, content management and payment integration.",
    tools: ["Python", "Django", "Java", "Spring Boot", "MySQL"],
  },
  {
    id: "android",
    number: "02",
    title: "Android development",
    summary: "Native Android applications and user-facing mobile features.",
    description: "Built Android applications and interfaces using Kotlin, including productivity, shopping, login and registration experiences.",
    tools: ["Kotlin", "Android", "Jetpack Compose", "SQLite"],
  },
  {
    id: "robotics",
    number: "03",
    title: "Robotics & embedded",
    summary: "Robot control software and embedded sensor projects.",
    description: "Competition robotics work involving motor and servo control, holonomic drive, IMU-based movement and AprilTag-related functions, alongside Arduino/C++ sensor-node work.",
    tools: ["Java", "OnBot Java", "C++", "Arduino", "ESP32", "PlatformIO"],
  },
  {
    id: "ai",
    number: "04",
    title: "Data science & AI",
    summary: "A growing focus on data science and machine learning.",
    description: "Currently learning data science and machine learning, with a longer-term academic interest in Computer Science and Artificial Intelligence.",
    tools: ["Data Science", "Machine Learning — learning"],
  },
];

const OTHER_TOOLS = ["SQLite", "Git & GitHub", "Postman", "Android Studio", "IntelliJ IDEA", "VS Code"];

/* Only the three international awards listed in the CV are shown here. */
const ACHIEVEMENTS = {
  statNumber: "03",
  statLabel: "INTERNATIONAL\nAWARDS",
  medals: [
    {
      number: "01",
      title: "Silver Medal",
      event: "International Tournament of Engineering · London",
      year: "2023",
      note: "Team award",
      mark: "ITE",
    },
    {
      number: "02",
      title: "Silver Award",
      event: "New Tech Experience · FIRST Global Challenge",
      year: "2025",
      note: "Team Iran",
      mark: "NTE",
    },
    {
      number: "03",
      title: "Silver Award",
      event: "Courageous Achievement · FIRST Global Challenge",
      year: "2025",
      note: "Team Iran",
      mark: "FGC",
    },
  ],
};

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/montatech", type: "github" },
  { label: "Email", href: "mailto:mahdimont67@gmail.com", type: "email" },
  { label: "CV", href: "assets/Mahdi_Montazeri_CV.pdf", type: "cv" },
];
