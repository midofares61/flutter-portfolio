import {
  SiFlutter,
  SiDart,
  SiFirebase,
  SiAndroid,
  SiApple,
  SiSqlite,
  SiGithub,
  SiGithubactions,
  SiGit,
  SiLaravel,
  SiGoogleplay,
  SiAppstore,
  SiSupabase,
  SiGraphql,
  SiRive,
  SiJson,
} from "react-icons/si";
import {
  MdDns,
  MdColorLens,
  MdFlashOn,
  MdAccountTree,
  MdStorage,
  MdRocketLaunch,
  MdLayers,
  MdPhoneIphone,
  MdLock,
  MdWidgets,
  MdPayment,
  MdAnimation,
} from "react-icons/md";
import images from "./images";

/* -------------------------------------------------------------------------- */
/*  SKILLS                                                                     */
/*  Mirrors the Technical Skills table in the CV - nothing claimed beyond it.  */
/* -------------------------------------------------------------------------- */

const skillCategories = [
  {
    title: "Flutter & Dart",
    skills: [
      { name: "Flutter", icon: SiFlutter },
      { name: "Dart", icon: SiDart },
      { name: "Android", icon: SiAndroid },
      { name: "iOS", icon: SiApple },
      { name: "Cross-platform", icon: MdPhoneIphone },
    ],
  },
  {
    title: "State Management",
    skills: [
      { name: "BLoC", icon: MdFlashOn },
      { name: "Cubit", icon: MdFlashOn },
      { name: "Provider", icon: MdLayers },
    ],
  },
  {
    title: "Architecture & Code",
    skills: [
      { name: "Clean Architecture", icon: MdAccountTree },
      { name: "Scalable Structure", icon: MdLayers },
      { name: "Reusable Widgets", icon: MdWidgets },
    ],
  },
  {
    title: "Backend Integration",
    skills: [
      { name: "RESTful APIs", icon: MdDns },
      { name: "JSON Serialization", icon: SiJson },
      { name: "Laravel APIs", icon: SiLaravel },
      { name: "Serverpod", icon: MdDns },
      { name: "GraphQL", icon: SiGraphql },
      { name: "Supabase", icon: SiSupabase },
      { name: "Paymob", icon: MdPayment },
    ],
  },
  {
    title: "Data & Auth",
    skills: [
      { name: "Firebase Firestore", icon: SiFirebase },
      { name: "Firebase Auth", icon: SiFirebase },
      { name: "OAuth", icon: MdLock },
      { name: "SQLite", icon: SiSqlite },
      { name: "Drift", icon: MdStorage },
      { name: "Hive", icon: MdStorage },
    ],
  },
  {
    title: "UI / UX",
    skills: [
      { name: "Material Design", icon: MdColorLens },
      { name: "Responsive Design", icon: MdPhoneIphone },
      { name: "Custom Widgets", icon: MdWidgets },
      { name: "Rive", icon: SiRive },
      { name: "Animations", icon: MdAnimation },
    ],
  },
  {
    title: "DevOps & Delivery",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "Fastlane", icon: MdRocketLaunch },
      { name: "Google Play", icon: SiGoogleplay },
      { name: "App Store", icon: SiAppstore },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  EXPERIENCE                                                                 */
/* -------------------------------------------------------------------------- */

const experiences = [
  {
    title: "Flutter Developer",
    company: "Lawyer Support (\u062f\u0639\u0645 \u0627\u0644\u0645\u062d\u0627\u0645\u064a)",
    date: "Sep 2025 - Present",
    location: "Giza, Egypt",
    type: "Full-time | Remote",
    points: [
      "Building and maintaining Daam Lawyer, a comprehensive legal management platform for lawyers.",
      "Implemented case tracking and client management modules backed by a scalable BLoC/Cubit architecture.",
      "Built secure authentication and session handling using Firebase Auth and OAuth.",
      "Integrated the Paymob payment gateway to handle online subscriptions and in-app payments.",
      "Delivered responsive Arabic-first RTL interfaces with reusable custom widgets.",
    ],
    link: null,
  },
  {
    title: "Flutter Developer",
    company: "Bird Technology",
    date: "Feb 2024 - Aug 2025",
    location: "Haram, Giza, Egypt",
    type: "Full-time",
    points: [
      "Developed and maintained a mobile application for creating and managing social media advertising campaigns.",
      "Integrated local payment methods including Vodafone Cash, Etisalat Cash, and InstaPay.",
      "Implemented refund and coupon functionality to improve campaign flexibility.",
      "Published the application on Google Play, reaching 1K+ downloads.",
    ],
    link: null,
  },
  {
    title: "Flutter Developer",
    company: "Sintac Code",
    date: "May 2022 - Jan 2024",
    location: "Haram, Giza, Egypt",
    type: "Full-time",
    points: [
      "Built and deployed multiple cross-platform applications for clients across e-commerce and service businesses.",
      "Implemented scalable state management using BLoC and Cubit.",
      "Collaborated with backend developers to integrate REST APIs and improve application performance by 20%.",
    ],
    link: null,
  },
];

/* -------------------------------------------------------------------------- */
/*  EDUCATION                                                                  */
/* -------------------------------------------------------------------------- */

const education = [
  {
    title: "Professional Diploma in Mobile Application Development (Flutter)",
    institution: "Information Technology Institute (ITI)",
    year: "2024",
    grade: "",
  },
  {
    title: "Bachelor's Degree in Sociology",
    institution: "Helwan University",
    year: "2024",
    grade: "",
  },
];

/* -------------------------------------------------------------------------- */
/*  PROJECTS                                                                   */
/*                                                                             */
/*  To add a screenshot: drop the file in /public/Projects, register it in     */
/*  ./images.js, then set `img: images.<yourKey>` below.                       */
/* -------------------------------------------------------------------------- */

const projectCategories = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "package", label: "Packages" },
  { id: "ui", label: "UI / Clones" },
];

const projects = [
  {
    name: "Bird Ads",
    description:
      "Mobile platform for creating and managing sponsored social-media advertising campaigns, with local payment methods, coupons and refunds. Live on Google Play with 1K+ downloads.",
    img: images.birdAds,
    category: "mobile",
    featured: true,
    tech: ["Flutter", "Dart", "BLoC", "REST APIs", "Payments"],
    playStore:
      "https://play.google.com/store/apps/details?id=com.yourcompany.newbirdy",
    appStore: null,
    github: null,
    website: null,
  },
  {
    name: "Daam Lawyer",
    description:
      "Comprehensive legal management platform for lawyers, built at Lawyer Support: case tracking, client management, secure authentication, and online payments through the Paymob gateway.",
    img: images.daamLawyer,
    category: "mobile",
    featured: true,
    tech: ["Flutter", "Dart", "Cubit", "Firebase Auth", "Paymob"],
    playStore:
      "https://play.google.com/store/apps/details?id=com.admin.law_app",
    appStore: null,
    github: null,
    website: null,
  },
];

/* -------------------------------------------------------------------------- */
/*  PERSONAL INFO                                                              */
/* -------------------------------------------------------------------------- */

const personalInfo = {
  name: "Mohamed Fares Samir",
  title: "Flutter Developer",
  phone: "+201127502002",
  email: "mhmedfares61@gmail.com",
  location: "Giza, Egypt",
  linkedin: "https://www.linkedin.com/in/mohamed-fares-a98179218",
  github: "https://github.com/midofares61",
  birthdate: "2002-05-04",
  yearsOfExperience: "4+",
  cv: "/CV.pdf",
  cvViewUrl: "",
  bio: "Flutter Developer with 4+ years of professional experience building and deploying cross-platform mobile applications for Android and iOS. Experienced in Flutter, Dart, BLoC/Cubit, REST APIs, Firebase, Git/GitHub, CI/CD, and production app delivery. Comfortable working with existing codebases, integrating backend services, improving performance, and delivering clean, maintainable features. Particularly interested in real-time, AI-powered, and SaaS products.",
  strengths: [
    "Problem-solving",
    "Team collaboration",
    "Strong communication",
    "Production-focused development",
    "API integration",
    "Performance optimization",
    "AI-assisted development",
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Conversational" },
  ],
};

/* -------------------------------------------------------------------------- */

const data = {
  skillCategories,
  experiences,
  education,
  projects,
  projectCategories,
  personalInfo,
};

export {
  skillCategories,
  experiences,
  education,
  projects,
  projectCategories,
  personalInfo,
  data,
};
export default data;
