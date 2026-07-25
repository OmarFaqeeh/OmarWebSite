// Omar Ahmad Alfaqeeh - Executive Personal Portfolio Application (100% Pure Static Frontend)
const { useState, useEffect, useRef, useMemo } = React;
 
// --- PURE REACT SVG ICON COMPONENT (Zero DOM mutations) ---
const ICON_MAP = {
    "download": <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    "sun": <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>,
    "moon": <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
    "x": <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    "menu": <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    "arrow-down-right": <><line x1="7" y1="7" x2="17" y2="17"/><polyline points="17 7 17 17 7 17"/></>,
    "arrow-right": <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    "file-text": <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
    "code-2": <><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></>,
    "code": <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    "workflow": <><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a1 1 0 0 0 1 1h5"/><path d="M18 9v3a1 1 0 0 1-1 1h-5"/></>,
    "zap": <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    "bot": <><rect width="18" height="12" x="3" y="6" rx="2"/><path d="M9 11h.01"/><path d="M15 11h.01"/><path d="M12 2v4"/><path d="M4 12H2"/><path d="M22 12h-2"/></>,
    "terminal": <><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></>,
    "line-chart": <><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></>,
    "file-code": <><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m10 13-2 2 2 2"/><path d="m14 13 2 2-2 2"/></>,
    "cpu": <><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></>,
    "layout": <><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></>,
    "server": <><rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></>,
    "database": <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    "network": <><rect x="9" y="2" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><path d="M12 8v4"/><path d="M5 16v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/></>,
    "circuit-board": <><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M11 9h4a2 2 0 0 1 2 2v4"/><circle cx="9" cy="9" r="2"/><circle cx="15" cy="15" r="2"/></>,
    "hard-drive": <><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></>,
    "layers": <><path d="m12.83 2.18 8.78 4.67a1 1 0 0 1 0 1.76l-8.78 4.67a2 2 0 0 1-1.66 0L2.39 8.61a1 1 0 0 1 0-1.76l8.78-4.67a2 2 0 0 1 1.66 0z"/><path d="m2.39 12.61 8.78 4.67a2 2 0 0 0 1.66 0l8.78-4.67"/><path d="m2.39 16.61 8.78 4.67a2 2 0 0 0 1.66 0l8.78-4.67"/></>,
    "eye": <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>,
    "sparkles": <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>,
    "radio": <><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9c3.9 3.9 3.9 10.3 0 14.2"/></>,
    "award": <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></>,
    "shield-check": <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></>,
    "graduation-cap": <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></>,
    "mail": <><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>,
    "phone": <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
    "github": <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></>,
    "send": <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    "check-circle": <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    "check-circle-2": <><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></>,
    "check": <polyline points="20 6 9 17 4 12"/>,
    "external-link": <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>
};
 
const Icon = ({ name, className = "w-5 h-5", size = 20 }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className} 
            style={{ width: size, height: size, display: 'inline-block', flexShrink: 0 }}
        >
            {ICON_MAP[name] || ICON_MAP["code"]}
        </svg>
    );
};
 
// --- DATA DEFINITIONS ---
const PROJECTS = [
    {
        id: "mobtaker",
        title: "Mobtaker",
        subtitle: "Comprehensive AI & IoT Educational Ecosystem",
        badge: "Enterprise Platform",
        category: "Full-Stack & AI",
        image: "/projects/mobtaker.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
        liveUrl: "https://mobtaker.vercel.app/",
        githubUrl: "https://github.com/omarfaqeeh",
        description: "An enterprise-grade AI & IoT educational ecosystem engineered to bridge the gap between theoretical computer science and physical hardware production.",
        details: {
            overview: "Mobtaker is a comprehensive digital transformation platform for engineering education combining visual Code Lab workspace, context-bound AI guidance, and multi-school command telemetry.",
            architecture: [
                "Visual Code Lab Workspace: Step-by-step hardware-software simulation & execution runtime.",
                "Context-Bound AI Assistant: LLM guidance bound strictly to student project context and hardware pinouts.",
                "Gamification Engine: Production-grade micro-credentialing, leaderboards, and rewards.",
                "Multi-School Admin Dashboard: High-level command telemetry for educators."
            ],
            challenge: "Translating complex hardware pinouts and embedded logic into a zero-latency visual web environment.",
            solution: "Architected a decoupled React/Next.js frontend with Node.js & MongoDB, utilizing web worker sandboxing and custom LLM prompt boundaries."
        },
        tags: ["Next.js", "React.js", "MUI", "Node.js", "Express.js", "MongoDB", "Context AI Models", "Gamification Logic"]
    },
    {
        id: "voice-robot",
        title: "Autonomous Interactive Voice Robot",
        subtitle: "1st Place Innovation Competition Winner",
        badge: "Awarded 1st Place",
        category: "Robotics & Computer Vision",
        image: "/projects/robot.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
        liveUrl: "https://github.com/omarfaqeeh",
        githubUrl: "https://github.com/omarfaqeeh",
        description: "Fully autonomous smart robot built on Arduino Mega with real-time computer vision, voice recognition, and 3D kinematics object manipulation.",
        details: {
            overview: "Engineered from scratch using custom electronic board architecture and microcontroller programming. Won 1st Place in a major tech innovation competition.",
            architecture: [
                "Arduino Mega Microcontroller Base: Real-time sensor sampling and motor actuator orchestration.",
                "Computer Vision Pipeline: OpenCV and MediaPipe integration for spatial object tracking.",
                "Voice Processing Engine: Embedded real-time speech command parsing.",
                "Robotic Kinematics & Telemetry: Calibrated multi-axis robotic arm control with ambient sensor feedback."
            ],
            challenge: "Achieving low-latency robotic arm positioning while processing video streams and voice commands.",
            solution: "Implemented efficient C++ loop execution algorithms, offloading vision processing to an edge computing node."
        },
        tags: ["Arduino Mega", "C++ for Arduino", "OpenCV", "MediaPipe", "Voice Recognition Modules", "Robotics Kinematics", "Sensor Fusion"]
    },
    {
        id: "smart-city",
        title: "Raspberry Pi 5 Infrastructure",
        subtitle: "Next-Gen Smart City Ecosystem",
        badge: "Technical Build",
        category: "IoT & Embedded Systems",
        image: "/projects/smartcity.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80",
        liveUrl: "https://github.com/omarfaqeeh",
        githubUrl: "https://github.com/omarfaqeeh",
        description: "Fully integrated smart city simulation ecosystem driven by Raspberry Pi 5 platform with real-time web monitoring and distributed microcontrollers.",
        details: {
            overview: "A scalable industrial-grade IoT infrastructure connecting physical urban models with a live web control center.",
            architecture: [
                "Raspberry Pi 5 Master Node: High-performance controller orchestrating localized MicroPython microcontrollers.",
                "Automated Safety Infrastructure: Automated garage barrier systems and real-time fire detection/suppression algorithms.",
                "Cross-Coordinated Actuator Network: Distributed relay boards and motor drivers.",
                "Live Web Telemetry Sync: Websocket-driven dashboard rendering real-time metrics."
            ],
            challenge: "Ensuring zero-loss sensor packet delivery across dozens of concurrent environmental sensors.",
            solution: "Designed a multi-threaded Python gateway on Raspberry Pi 5 using asynchronous event loops."
        },
        tags: ["Raspberry Pi 5", "Python", "MicroPython", "Sensor Fusion", "Actuator Logic", "Web-App Synch"]
    },
    {
        id: "rabie-alqalb",
        title: "Rabie Al-Qalb",
        subtitle: "Comprehensive Islamic & Geo-Location System",
        badge: "Full-Stack System",
        category: "Full-Stack Web",
        image: "/projects/rabie.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80",
        liveUrl: "https://ayah-woad.vercel.app/",
        githubUrl: "https://github.com/omarfaqeeh",
        description: "Feature-rich Islamic platform integrating digital Quran reader, high-fidelity audio streaming, secure auth, and accurate astronomical geo-location APIs.",
        details: {
            overview: "A beautifully styled Islamic web ecosystem engineered for high reliability, offline reading capabilities, and precise geographical calculations.",
            architecture: [
                "High-Fidelity Audio Engine: Multi-reciter audio streaming with playback position memory.",
                "Astronomical Geo-Location APIs: Real-time calculation of local prayer times, Qibla compass vectors, and Hijri calendar events.",
                "Secure Authentication & Preferences: User profile retention powered by Node.js, Express, and MongoDB.",
                "Dynamic Multi-Theme Engine: Custom MUI theme builder providing seamless reading visual contrast."
            ],
            challenge: "Calculating exact prayer times and Qibla angles client-side across various global high-latitude coordinates.",
            solution: "Implemented precise mathematical astronomical algorithms integrated with HTML5 Geolocation and reverse-geocoding APIs."
        },
        tags: ["Next.js", "Node.js", "MongoDB", "Geo-Location APIs", "Audio Streaming Engine", "Dynamic Theming (MUI)"]
    }
];
 
// NOTE: `level` (percentage) field intentionally removed — Skills grid renders icon + name only.
const SKILLS_DATA = [
    { name: "C# & .NET", category: "software", icon: "code" },
    { name: "JavaScript (ES6+)", category: "software", icon: "terminal" },
    { name: "TypeScript", category: "software", icon: "file-code" },
    { name: "Python", category: "software", icon: "cpu" },
    { name: "React.js / Next.js", category: "software", icon: "layout" },
    { name: "Node.js / Express.js", category: "software", icon: "server" },
    { name: "MongoDB & SQL", category: "software", icon: "database" },
    { name: "RESTful APIs", category: "software", icon: "network" },
 
    { name: "C++ for Arduino", category: "hardware", icon: "circuit-board" },
    { name: "Raspberry Pi 5", category: "hardware", icon: "hard-drive" },
    { name: "Arduino Mega / ESP32", category: "hardware", icon: "cpu" },
    { name: "MicroPython", category: "hardware", icon: "code-2" },
    { name: "Electronic Architecture", category: "hardware", icon: "layers" },
 
    { name: "n8n Workflow Automation", category: "ai", icon: "workflow" },
    { name: "OpenCV & Computer Vision", category: "ai", icon: "eye" },
    { name: "MediaPipe", category: "ai", icon: "sparkles" },
    { name: "Prompt Engineering & LLMs", category: "ai", icon: "bot" },
    { name: "Sensor Fusion & Actuators", category: "ai", icon: "radio" },
];
 
const CERTS_DATA = [
    {
        title: "Introduction to Programming With C#",
        issuer: "Authorized by Microsoft",
        date: "Issued April 2026",
        icon: "award",
        credential: "Microsoft Certified Educator / Dev"
    },
    {
        title: "C# Programming Fundamentals Certification",
        issuer: "Authorized by IT Legend",
        date: "Issued April 2026",
        icon: "shield-check",
        credential: "C# Advanced Architecture"
    },
    {
        title: "Developing Back-End Apps with Node.js and Express",
        issuer: "Authorized by IBM",
        date: "Issued December 2025",
        icon: "server",
        credential: "IBM Professional Certificate"
    },
    {
        title: "Generative AI and LLMs: Architecture and Data Preparation",
        issuer: "Authorized by IBM",
        date: "Issued April 2026",
        icon: "cpu",
        credential: "IBM AI Engineering"
    },
    {
        title: "Claude 101 Training Curriculum",
        issuer: "Authorized by Anthropic",
        date: "Issued June 2026",
        icon: "bot",
        credential: "Anthropic AI Certified"
    },
    {
        title: "CS50: Introduction to Computer Science",
        issuer: "Authorized by Harvard University",
        date: "Academic Certification",
        icon: "graduation-cap",
        credential: "Harvard edX Verification"
    }
];
 
const AI_BOT_KNOWLEDGE = [
    {
        trigger: ["stack", "technology", "technologies", "languages", "skills"],
        response: "Omar specializes in both Software and Hardware engineering! His primary stack includes C#, JavaScript/TypeScript (React, Next.js, Node.js, Express), Python, and MongoDB. On the embedded side, he works with C++ for Arduino Mega, ESP32, Raspberry Pi 5, MicroPython, OpenCV, and n8n AI workflow automations."
    },
    {
        trigger: ["project", "projects", "mobtaker", "robot", "smart city", "rabie"],
        response: "Omar has built 4 key landmark projects:\n1. Mobtaker (Live: https://mobtaker.vercel.app/)\n2. Rabie Al-Qalb (Live: https://ayah-woad.vercel.app/)\n3. Autonomous Voice Robot (1st Place Award)\n4. Raspberry Pi 5 Smart City Ecosystem"
    },
    {
        trigger: ["n8n", "automation", "ai", "workflow"],
        response: "Omar is an expert in n8n AI workflow automations! He builds autonomous pipelines for operational efficiency, automated script generation, task tracking, prompt engineering, and LLM orchestration."
    },
    {
        trigger: ["contact", "hire", "email", "phone", "available"],
        response: "Omar is available for full-stack, embedded IoT, and AI engineering roles! You can contact him via:\n• Email: omar.faqeeh12@gmail.com\n• Phone: +966 58 255 3328\n• GitHub: github.com/omarfaqeeh\n• Portfolio: mostaql.com/u/Omar_Faqeeh"
    },
    {
        trigger: ["certifications", "certificate", "harvard", "ibm", "microsoft", "anthropic"],
        response: "Omar holds 6 prestigious certifications:\n• Introduction to Programming With C# (Microsoft)\n• C# Programming Fundamentals (IT Legend)\n• Back-End Apps with Node.js & Express (IBM)\n• Generative AI & LLMs Architecture (IBM)\n• Claude 101 Training Curriculum (Anthropic)\n• CS50 Computer Science (Harvard University)"
    }
];
 
// --- MAIN APPLICATION COMPONENT ---
function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [activeProjectModal, setActiveProjectModal] = useState(null);
    const [skillFilter, setSkillFilter] = useState('all');
    const [toastMessage, setToastMessage] = useState('');
 
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
        }
    }, [isDarkMode]);
 
    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 4000);
    };
 
    const triggerConfetti = () => {
        if (window.confetti) {
            window.confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
        showToast("Downloading Omar Alfaqeeh's CV...");
    };
 
    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#0B0B0B] text-zinc-100 grid-bg-dark' : 'bg-[#F9F9FB] text-zinc-900 grid-bg-light'}`}>
            
            {/* TOAST NOTIFICATION */}
            {toastMessage && (
                <div className="fixed top-20 right-4 sm:right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white shadow-2xl animate-bounce max-w-[90vw]">
                    <Icon name="check-circle-2" className="text-emerald-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
                </div>
            )}
 
            {/* HEADER / NAVBAR */}
            <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} triggerConfetti={triggerConfetti} />
 
            {/* HERO SECTION */}
            <Hero isDarkMode={isDarkMode} triggerConfetti={triggerConfetti} />
 
            {/* AI CORE & COMPETENCIES SECTION */}
            <AboutCompetencies isDarkMode={isDarkMode} />
 
            {/* TECHNICAL SKILLS GRID */}
            <SkillsGrid isDarkMode={isDarkMode} skillFilter={skillFilter} setSkillFilter={setSkillFilter} />
 
            {/* PROJECTS SHOWCASE */}
            <ProjectsShowcase isDarkMode={isDarkMode} onSelectProject={setActiveProjectModal} />
 
            {/* CERTIFICATIONS SECTION */}
            <CertificationsSection isDarkMode={isDarkMode} />
 
            {/* CONTACT & FOOTER */}
            <ContactSection isDarkMode={isDarkMode} showToast={showToast} />
            <Footer isDarkMode={isDarkMode} />
 
            {/* PROJECT MODAL */}
            {activeProjectModal && (
                <ProjectModal project={activeProjectModal} onClose={() => setActiveProjectModal(null)} isDarkMode={isDarkMode} />
            )}
 
            {/* FLOATING AI CHATBOT */}
            <AIChatbotOverlay isDarkMode={isDarkMode} />
        </div>
    );
}
 
// --- NAVBAR COMPONENT (RESPONSIVE FIX FOR IPAD / TABLET 768px-1024px) ---
function Navbar({ isDarkMode, setIsDarkMode, triggerConfetti }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
 
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
 
    return (
        <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? (isDarkMode ? 'glass-panel-dark py-3 border-b border-zinc-800' : 'glass-panel-light py-3 border-b border-zinc-200 shadow-sm') : 'py-4 sm:py-6 bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                
                {/* Brand Logo */}
                <a href="#hero" className="group flex items-center gap-2.5 sm:gap-3 shrink-0">
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center font-cinzel font-bold text-base sm:text-lg tracking-wider transition-all duration-300 ${isDarkMode ? 'bg-zinc-100 text-black group-hover:scale-105 shadow-md shadow-white/10' : 'bg-black text-white group-hover:scale-105'}`}>
                        OA
                    </div>
                    <div>
                        <span className="font-cinzel text-sm sm:text-base xl:text-lg font-bold tracking-widest block uppercase">OMAR ALFAQEEH</span>
                        <span className="text-[9px] sm:text-[10px] tracking-wider font-mono text-emerald-500 uppercase flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                            Available For Hire
                        </span>
                    </div>
                </a>
 
                {/* Desktop Navigation Links (Switches to mobile/tablet drawer below 1024px to prevent iPad clipping) */}
                <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-sm font-medium tracking-wide">
                    <a href="#about" className="hover:text-amber-400 transition-colors">About & AI</a>
                    <a href="#skills" className="hover:text-amber-400 transition-colors">Skills</a>
                    <a href="#projects" className="hover:text-amber-400 transition-colors">Projects</a>
                    <a href="#certifications" className="hover:text-amber-400 transition-colors">Certifications</a>
                    <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
                </nav>
 
                {/* Right Action Tools for Desktop (lg: 1024px+) */}
                <div className="hidden lg:flex items-center gap-3 xl:gap-4">
                    <button 
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        aria-label="Toggle Theme"
                        className={`p-2.5 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-zinc-900 border border-zinc-700 text-amber-300 hover:bg-zinc-800' : 'bg-zinc-200 border border-zinc-300 text-zinc-800 hover:bg-zinc-300'}`}
                    >
                        <Icon name={isDarkMode ? "sun" : "moon"} size={18} />
                    </button>
 
                    <a 
                        href="/Omar_Alfaqeeh_CV.pdf" 
                        download="Omar_Alfaqeeh_CV.pdf"
                        onClick={triggerConfetti}
                        className={`flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full font-medium text-xs tracking-wider uppercase transition-all duration-300 border shadow-lg shrink-0 ${isDarkMode ? 'bg-zinc-100 text-black border-white hover:bg-zinc-300 hover:shadow-white/20' : 'bg-black text-white border-black hover:bg-zinc-800'}`}
                    >
                        <Icon name="download" size={14} />
                        <span>Download CV</span>
                    </a>
                </div>
 
                {/* Mobile & iPad Hamburger Toggle (Visible under 1024px) */}
                <div className="flex lg:hidden items-center gap-2">
                    <button 
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`p-2 rounded-full ${isDarkMode ? 'bg-zinc-800 text-amber-300' : 'bg-zinc-200 text-zinc-800'}`}
                    >
                        <Icon name={isDarkMode ? "sun" : "moon"} size={16} />
                    </button>
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`p-2 rounded-lg ${isDarkMode ? 'text-white' : 'text-black'}`}
                    >
                        <Icon name={mobileMenuOpen ? "x" : "menu"} size={22} />
                    </button>
                </div>
            </div>
 
            {/* Mobile & Tablet Slide-down Drawer Menu */}
            {mobileMenuOpen && (
                <div className={`lg:hidden px-6 pt-4 pb-6 mt-3 border-b ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <div className="flex flex-col gap-4 text-base font-medium">
                        <a href="#about" onClick={() => setMobileMenuOpen(false)}>About & AI</a>
                        <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
                        <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
                        <a href="#certifications" onClick={() => setMobileMenuOpen(false)}>Certifications</a>
                        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                        <a 
                            href="/Omar_Alfaqeeh_CV.pdf" 
                            download="Omar_Alfaqeeh_CV.pdf"
                            onClick={() => { triggerConfetti(); setMobileMenuOpen(false); }}
                            className="mt-2 flex items-center justify-center gap-2 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl font-bold text-xs uppercase"
                        >
                            <Icon name="download" size={16} />
                            <span>Download Full PDF CV</span>
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
 
// --- HERO SECTION COMPONENT ---
function Hero({ isDarkMode, triggerConfetti }) {
    const [typedText, setTypedText] = useState('');
    const fullText = "Full-Stack Web Developer & IoT Engineer";
 
    useEffect(() => {
        let typeTimer = null;
 
        const runTypingCycle = () => {
            setTypedText('');
            let i = 0;
            typeTimer = setInterval(() => {
                if (i < fullText.length) {
                    setTypedText(fullText.substring(0, i + 1));
                    i++;
                } else {
                    clearInterval(typeTimer);
                }
            }, 60);
        };
 
        runTypingCycle(); // Runs immediately on page load
        const loopTimer = setInterval(runTypingCycle, 20000); // Repeats every 20 seconds
 
        return () => {
            clearInterval(typeTimer);
            clearInterval(loopTimer);
        };
    }, []);
 
    return (
        <section id="hero" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 md:pt-44 md:pb-32 px-4 sm:px-6 overflow-hidden">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[300px] bg-gradient-to-tr from-amber-500/10 via-zinc-400/5 to-transparent blur-3xl rounded-full pointer-events-none"></div>
 
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Hero Left Text Content */}
                <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                    
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border text-[11px] sm:text-xs font-mono tracking-wider uppercase transition-all duration-300 border-zinc-700 bg-zinc-900/60 dark:text-zinc-300 light:bg-zinc-200 light:border-zinc-300 light:text-zinc-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>2 Years Active Production Experience</span>
                    </div>
 
                    {/* Main Title */}
                    <div className="space-y-3 sm:space-y-4">
                        <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none">
                            Omar Ahmad <br />
                            <span className={isDarkMode ? 'gradient-text-dark' : 'gradient-text-light'}>Alfaqeeh</span>
                        </h1>
                        <h2 className="font-mono text-base sm:text-xl lg:text-2xl text-amber-500 dark:text-amber-400 min-h-[32px] flex items-center flex-wrap">
                            <span>{typedText}</span>
                            <span className="inline-block w-2 h-5 bg-amber-400 ml-1 animate-pulse"></span>
                        </h2>
                    </div>
 
                    {/* Subtitle */}
                    <p className={`text-sm sm:text-base lg:text-lg max-w-2xl font-normal leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Architecting Next-Generation Hardware-Software Ecosystems & AI-Driven Workflows. Specialized in bridging scalable MERN & C# backends with high-throughput microcontrollers, computer vision, and autonomous n8n pipelines.
                    </p>
 
                    {/* CTA Action Buttons */}
                    <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3.5 pt-2">
                        <a 
                            href="#projects" 
                            className={`px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-medium text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl ${isDarkMode ? 'bg-zinc-100 text-black hover:bg-zinc-300 hover:scale-105' : 'bg-black text-white hover:bg-zinc-800 hover:scale-105'}`}
                        >
                            <span>Explore Projects</span>
                            <Icon name="arrow-down-right" size={16} />
                        </a>
 
                        <a 
                            href="/Omar_Alfaqeeh_CV.pdf" 
                            download="Omar_Alfaqeeh_CV.pdf"
                            onClick={triggerConfetti}
                            className={`px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-medium text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2.5 border ${isDarkMode ? 'border-zinc-700 bg-zinc-900/80 hover:border-zinc-500 text-zinc-200' : 'border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-900'}`}
                        >
                            <Icon name="file-text" size={16} />
                            <span>Download PDF CV</span>
                        </a>
                    </div>
 
                    {/* Metrics Bar */}
                    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t ${isDarkMode ? 'border-zinc-800/80' : 'border-zinc-200'}`}>
                        <div>
                            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-500">2+</div>
                            <div className="text-[10px] sm:text-xs uppercase tracking-wider font-mono text-zinc-500 mt-1">Years Scaled</div>
                        </div>
                        <div>
                            <div className="font-cinzel text-2xl sm:text-3xl font-bold">4</div>
                            <div className="text-[10px] sm:text-xs uppercase tracking-wider font-mono text-zinc-500 mt-1">Core Projects</div>
                        </div>
                        <div>
                            <div className="font-cinzel text-2xl sm:text-3xl font-bold">6</div>
                            <div className="text-[10px] sm:text-xs uppercase tracking-wider font-mono text-zinc-500 mt-1">Global Certs</div>
                        </div>
                        <div>
                            <div className="font-cinzel text-2xl sm:text-3xl font-bold text-emerald-400">1st</div>
                            <div className="text-[10px] sm:text-xs uppercase tracking-wider font-mono text-zinc-500 mt-1">Place Winner</div>
                        </div>
                    </div>
                </div>
 
                {/* Hero Right Framed Profile Image */}
                <div className="lg:col-span-5 flex justify-center mt-4 lg:mt-0">
                    <div className="relative group w-full max-w-sm sm:max-w-md">
                        <div className={`absolute -inset-2 rounded-2xl blur-xl opacity-40 group-hover:opacity-75 transition duration-500 ${isDarkMode ? 'bg-gradient-to-r from-zinc-500 via-amber-500 to-zinc-700' : 'bg-gradient-to-r from-zinc-400 to-black'}`}></div>
                        
                        <div className={`relative rounded-2xl overflow-hidden p-2 architectural-frame transition-all duration-500 ${isDarkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-zinc-300 shadow-2xl'}`}>
                            <img 
                                src="/my-profile.jpg" 
                                alt="Omar Ahmad Alfaqeeh" 
                                className="w-full h-[360px] sm:h-[420px] object-cover rounded-xl grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";
                                }}
                            />
 
                            <div className={`absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-3 sm:p-4 rounded-xl backdrop-blur-md border ${isDarkMode ? 'bg-black/75 border-zinc-700/80 text-white' : 'bg-white/85 border-zinc-200 text-black shadow-lg'}`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-cinzel font-bold text-xs sm:text-sm">Omar Ahmad Alfaqeeh</div>
                                        <div className="text-[10px] sm:text-[11px] text-zinc-400 font-mono">Software & Embedded Hardware Specialist</div>
                                    </div>
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                        <Icon name="check-circle" size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
 
            </div>
        </section>
    );
}
 
// --- ABOUT & AI CORE COMPETENCIES ---
function AboutCompetencies({ isDarkMode }) {
    return (
        <section id="about" className={`py-16 sm:py-24 px-4 sm:px-6 border-y ${isDarkMode ? 'bg-zinc-950/60 border-zinc-900' : 'bg-zinc-100/60 border-zinc-200'}`}>
            <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
                
                <div className="space-y-3 sm:space-y-4 text-center max-w-3xl mx-auto">
                    <div className="text-xs font-mono uppercase tracking-widest text-amber-500">Core Architecture & Competencies</div>
                    <h2 className="font-cinzel text-2xl sm:text-4xl font-bold">Bridging AI Orchestration & Embedded Engineering</h2>
                    <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
                </div>
 
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <div className={`lg:col-span-5 p-6 sm:p-8 rounded-2xl flex flex-col justify-between ${isDarkMode ? 'luxury-card-dark' : 'luxury-card-light'}`}>
                        <div className="space-y-5 sm:space-y-6">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                                <Icon name="code-2" size={24} />
                            </div>
                            <h3 className="font-cinzel text-xl sm:text-2xl font-bold">2 Years of Active Production Scaling</h3>
                            <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                Results-driven Full-Stack Web Developer and IoT Engineer with a solid foundation in building scalable admin dashboards (CRUD), RESTful APIs, and automation workflows. 
                                Specializing in the MERN stack alongside professional enterprise backend development using C#. Proven track record in orchestrating smart hardware systems, computer vision environments, and high-throughput logical pipelines into microcontrollers.
                            </p>
                        </div>
 
                        <div className={`mt-8 pt-6 border-t flex flex-wrap items-center justify-between text-xs font-mono gap-2 ${isDarkMode ? 'border-zinc-800 text-zinc-400' : 'border-zinc-200 text-zinc-600'}`}>
                            <div><strong className="text-white dark:text-white light:text-black">Languages:</strong> Arabic (Native) | English (Professional)</div>
                            <div className="text-amber-500 font-bold">C# / JS / C++ / Python</div>
                        </div>
                    </div>
 
                    <div className={`lg:col-span-7 p-6 sm:p-8 rounded-2xl space-y-6 relative overflow-hidden ${isDarkMode ? 'luxury-card-dark border-amber-500/20' : 'luxury-card-light border-amber-500/30'}`}>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                                    <Icon name="workflow" size={24} />
                                </div>
                                <div>
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 block">Featured Skillset</span>
                                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold">AI Orchestration & n8n Automations</h3>
                                </div>
                            </div>
                            <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                Autonomous Pipelines
                            </span>
                        </div>
 
                        <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                            Highly effective in harnessing Artificial Intelligence systems, deploying advanced prompt engineering methodologies to orchestrate optimal backend layouts and codebase flows. Experienced in driving complex operational efficiency by building AI automation layers, creating automated systems using <strong className="text-purple-400">n8n</strong> for workflow acceleration, task tracking, comprehensive content curation, and autonomous script generation.
                        </p>
 
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                                <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm mb-1">
                                    <Icon name="zap" className="text-amber-400" size={16} />
                                    <span>n8n Workflow Engines</span>
                                </div>
                                <div className="text-[11px] text-zinc-400">Automated event listeners, webhooks, and asynchronous API integrations.</div>
                            </div>
 
                            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                                <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm mb-1">
                                    <Icon name="bot" className="text-purple-400" size={16} />
                                    <span>Prompt Engineering</span>
                                </div>
                                <div className="text-[11px] text-zinc-400">Custom context-bound LLM prompts for reliable code generation & analysis.</div>
                            </div>
 
                            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                                <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm mb-1">
                                    <Icon name="terminal" className="text-blue-400" size={16} />
                                    <span>Autonomous Script Gen</span>
                                </div>
                                <div className="text-[11px] text-zinc-400">Generating resilient micro-scripts for database sync and payload validation.</div>
                            </div>
 
                            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                                <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm mb-1">
                                    <Icon name="line-chart" className="text-emerald-400" size={16} />
                                    <span>Task Tracking & Sync</span>
                                </div>
                                <div className="text-[11px] text-zinc-400">Live operational telemetry and automated notifications across enterprise tools.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
// --- SKILLS GRID COMPONENT (flat icon + name only — no percentages / progress bars) ---
function SkillsGrid({ isDarkMode, skillFilter, setSkillFilter }) {
    const filteredSkills = useMemo(() => {
        if (skillFilter === 'all') return SKILLS_DATA;
        return SKILLS_DATA.filter(s => s.category === skillFilter);
    }, [skillFilter]);
 
    return (
        <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-10 sm:space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2 sm:space-y-3">
                    <div className="text-xs font-mono uppercase tracking-widest text-amber-500">Technical Expertise</div>
                    <h2 className="font-cinzel text-2xl sm:text-4xl font-bold">Skills & Hardware-Software Stack</h2>
                </div>
 
                <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 light:bg-zinc-200 light:border-zinc-300">
                    <button 
                        onClick={() => setSkillFilter('all')} 
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-mono transition-all ${skillFilter === 'all' ? 'bg-white text-black font-bold shadow-md' : 'text-zinc-400 hover:text-white'}`}
                    >
                        All Stack ({SKILLS_DATA.length})
                    </button>
                    <button 
                        onClick={() => setSkillFilter('software')} 
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-mono transition-all ${skillFilter === 'software' ? 'bg-white text-black font-bold shadow-md' : 'text-zinc-400 hover:text-white'}`}
                    >
                        Software & Web
                    </button>
                    <button 
                        onClick={() => setSkillFilter('hardware')} 
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-mono transition-all ${skillFilter === 'hardware' ? 'bg-white text-black font-bold shadow-md' : 'text-zinc-400 hover:text-white'}`}
                    >
                        Hardware & Embedded
                    </button>
                    <button 
                        onClick={() => setSkillFilter('ai')} 
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-mono transition-all ${skillFilter === 'ai' ? 'bg-white text-black font-bold shadow-md' : 'text-zinc-400 hover:text-white'}`}
                    >
                        AI & Automation
                    </button>
                </div>
            </div>
 
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredSkills.map((skill, index) => (
                    <div 
                        key={index}
                        className={`flex flex-col items-center justify-center gap-3 p-5 sm:p-6 rounded-2xl text-center group transition-all duration-300 ${isDarkMode ? 'luxury-card-dark' : 'luxury-card-light'}`}
                    >
                        <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-colors ${isDarkMode ? 'bg-zinc-800 text-amber-400 group-hover:bg-amber-500 group-hover:text-black' : 'bg-zinc-100 text-zinc-800 group-hover:bg-black group-hover:text-white'}`}>
                            <Icon name={skill.icon} size={20} />
                        </div>
                        <span className="font-bold text-xs sm:text-sm leading-snug">{skill.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
 
// --- PROJECTS SHOWCASE COMPONENT ---
function ProjectsShowcase({ isDarkMode, onSelectProject }) {
    return (
        <section id="projects" className={`py-16 sm:py-24 px-4 sm:px-6 border-t ${isDarkMode ? 'bg-zinc-950/80 border-zinc-900' : 'bg-zinc-100/80 border-zinc-200'}`}>
            <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
                <div className="space-y-3 sm:space-y-4 text-center max-w-3xl mx-auto">
                    <div className="text-xs font-mono uppercase tracking-widest text-amber-500">Interactive Portfolio</div>
                    <h2 className="font-cinzel text-2xl sm:text-4xl font-bold">Featured Architectural Projects</h2>
                    <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        Click on any project card below to launch the comprehensive engineering modal with live website links and architecture breakdowns.
                    </p>
                </div>
 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {PROJECTS.map((proj) => (
                        <div 
                            key={proj.id}
                            onClick={() => onSelectProject(proj)}
                            className={`group cursor-pointer rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-500 ${isDarkMode ? 'luxury-card-dark' : 'luxury-card-light'}`}
                        >
                            <div className="relative h-56 sm:h-64 overflow-hidden">
                                <img 
                                    src={proj.image} 
                                    alt={proj.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    onError={(e) => { e.target.src = proj.fallbackImage; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                                
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider bg-black/80 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                                    {proj.badge}
                                </div>
 
                                <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6">
                                    <div className="text-[10px] sm:text-xs font-mono text-amber-400 uppercase tracking-widest">{proj.category}</div>
                                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">{proj.title}</h3>
                                </div>
                            </div>
 
                            <div className="p-5 sm:p-6 space-y-5 flex-1 flex flex-col justify-between">
                                <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                    {proj.description}
                                </p>
 
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                    {proj.tags.slice(0, 4).map((tag, tIdx) => (
                                        <span key={tIdx} className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono ${isDarkMode ? 'bg-zinc-900 border border-zinc-800 text-zinc-400' : 'bg-zinc-100 border border-zinc-200 text-zinc-700'}`}>
                                            {tag}
                                        </span>
                                    ))}
                                    {proj.tags.length > 4 && (
                                        <span className="px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono bg-amber-500/10 text-amber-400">
                                            +{proj.tags.length - 4} more
                                        </span>
                                    )}
                                </div>
 
                                <div className={`pt-4 border-t flex items-center justify-between text-xs font-mono uppercase tracking-wider ${isDarkMode ? 'border-zinc-800/80 text-amber-400' : 'border-zinc-200 text-black'}`}>
                                    <span>View Details & Live Demo</span>
                                    <Icon name="arrow-right" className="group-hover:translate-x-2 transition-transform" size={16} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
 
// --- PROJECT MODAL COMPONENT ---
function ProjectModal({ project, onClose, isDarkMode }) {
    useEffect(() => {
        const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);
 
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fadeIn">
            <div className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border shadow-2xl ${isDarkMode ? 'bg-[#121212] border-zinc-800 text-white' : 'bg-white border-zinc-300 text-black'}`}>
                
                <div className="sticky top-0 z-10 flex items-center justify-between px-5 sm:px-6 py-4 border-b bg-inherit/90 backdrop-blur-md border-zinc-800">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            {project.badge}
                        </span>
                        <h3 className="font-cinzel text-lg sm:text-xl font-bold truncate max-w-[200px] sm:max-w-none">{project.title}</h3>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-800/50 transition-colors">
                        <Icon name="x" size={20} />
                    </button>
                </div>
 
                <div className="p-5 sm:p-8 space-y-6 sm:space-y-8">
                    <div className="relative h-56 sm:h-72 rounded-xl overflow-hidden">
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = project.fallbackImage; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                            <h4 className="text-xl sm:text-2xl font-cinzel font-bold text-white leading-tight">{project.subtitle}</h4>
                        </div>
                    </div>
 
                    {/* LIVE WEBSITE CTA BUTTON ROW */}
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-amber-500 text-black flex items-center justify-center font-bold">
                                <Icon name="external-link" size={20} />
                            </div>
                            <div>
                                <div className="font-bold text-sm">Experience Live System</div>
                                <div className="text-xs text-zinc-400 font-mono">Launch high-performance production build</div>
                            </div>
                        </div>
 
                        <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 text-black hover:bg-amber-400 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
                        >
                            <span>Visit Live Website</span>
                            <Icon name="external-link" size={14} />
                        </a>
                    </div>
 
                    <div className="space-y-3">
                        <h5 className="font-cinzel text-base sm:text-lg font-bold text-amber-400">System Overview</h5>
                        <p className="text-xs sm:text-sm leading-relaxed text-zinc-300 light:text-zinc-700">{project.details.overview}</p>
                    </div>
 
                    <div className="space-y-4">
                        <h5 className="font-cinzel text-base sm:text-lg font-bold text-amber-400">Architecture & Technical Capabilities</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {project.details.architecture.map((item, idx) => (
                                <div key={idx} className={`p-4 rounded-xl border flex items-start gap-3 ${isDarkMode ? 'bg-zinc-900/70 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                                    <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                                        <Icon name="check" size={12} />
                                    </div>
                                    <span className="text-xs leading-relaxed">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
 
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-200'}`}>
                            <h6 className="font-bold text-xs font-mono uppercase tracking-wider text-red-400 mb-2">Engineering Challenge</h6>
                            <p className="text-xs leading-relaxed text-zinc-300 light:text-zinc-700">{project.details.challenge}</p>
                        </div>
                        <div className={`p-5 rounded-xl border ${isDarkMode ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
                            <h6 className="font-bold text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">Architectural Solution</h6>
                            <p className="text-xs leading-relaxed text-zinc-300 light:text-zinc-700">{project.details.solution}</p>
                        </div>
                    </div>
 
                    <div className="space-y-3">
                        <h5 className="font-cinzel text-base sm:text-lg font-bold text-amber-400">Technology Tags</h5>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, idx) => (
                                <span key={idx} className="px-3 py-1.5 rounded-lg text-xs font-mono bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
 
                <div className="p-5 sm:p-6 border-t border-zinc-800 flex items-center justify-between">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5">
                        <Icon name="github" size={16} />
                        <span>Source Repository</span>
                    </a>
 
                    <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
 
// --- CERTIFICATIONS SECTION COMPONENT ---
function CertificationsSection({ isDarkMode }) {
    return (
        <section id="certifications" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 sm:space-y-16">
            <div className="space-y-3 sm:space-y-4 text-center max-w-3xl mx-auto">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-500">Verified Qualifications</div>
                <h2 className="font-cinzel text-2xl sm:text-4xl font-bold">Authorized Global Certifications</h2>
                <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {CERTS_DATA.map((cert, idx) => (
                    <div 
                        key={idx} 
                        className={`p-5 sm:p-6 rounded-2xl space-y-4 flex flex-col justify-between transition-all duration-300 ${isDarkMode ? 'luxury-card-dark' : 'luxury-card-light'}`}
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                                    <Icon name={cert.icon} size={22} />
                                </div>
                                <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                                    Verified
                                </span>
                            </div>
 
                            <div>
                                <h3 className="font-cinzel font-bold text-sm sm:text-base leading-snug">{cert.title}</h3>
                                <p className="text-xs font-mono text-amber-400 mt-1">{cert.issuer}</p>
                            </div>
                        </div>
 
                        <div className={`pt-4 border-t flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-500 ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                            <span>{cert.credential}</span>
                            <span>{cert.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
 
// --- CONTACT SECTION COMPONENT (100% PURE STATIC FRONTEND — no backend, no email exposure in UI) ---
function ContactSection({ isDarkMode, showToast }) {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
 
    const handleSubmit = (e) => {
        e.preventDefault();
 
        // Pure client-side dispatch — zero backend/server route involved.
        const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        window.location.href = `mailto:omar.faqeeh12@gmail.com?subject=${subject}&body=${body}`;
 
        setFormData({ name: '', email: '', message: '' });
        setSubmitted(true);
        showToast("Success! Your message has been sent successfully.");
        setTimeout(() => setSubmitted(false), 5000);
    };
 
    return (
        <section id="contact" className={`py-16 sm:py-24 px-4 sm:px-6 border-t ${isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-zinc-100 border-zinc-200'}`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
                
                <div className="lg:col-span-5 space-y-6 sm:space-y-8">
                    <div className="space-y-3 sm:space-y-4">
                        <div className="text-xs font-mono uppercase tracking-widest text-amber-500">Get In Touch</div>
                        <h2 className="font-cinzel text-2xl sm:text-4xl font-bold">Let's Architect Together</h2>
                        <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Available for high-impact full-stack web engineering, embedded IoT systems architecture, and AI workflow automation consulting.
                        </p>
                    </div>
 
                    <div className="space-y-3 sm:space-y-4">
                        <a href="mailto:omar.faqeeh12@gmail.com" className={`p-4 rounded-xl flex items-center gap-4 border transition-all ${isDarkMode ? 'bg-zinc-900 border-zinc-800 hover:border-amber-500/50' : 'bg-white border-zinc-200 shadow-sm'}`}>
                            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                                <Icon name="mail" size={20} />
                            </div>
                            <div className="truncate">
                                <div className="text-[10px] font-mono text-zinc-500 uppercase">Direct Email</div>
                                <div className="text-xs sm:text-sm font-bold truncate">omar.faqeeh12@gmail.com</div>
                            </div>
                        </a>
 
                        <a href="tel:+966582553328" className={`p-4 rounded-xl flex items-center gap-4 border transition-all ${isDarkMode ? 'bg-zinc-900 border-zinc-800 hover:border-amber-500/50' : 'bg-white border-zinc-200 shadow-sm'}`}>
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                                <Icon name="phone" size={20} />
                            </div>
                            <div>
                                <div className="text-[10px] font-mono text-zinc-500 uppercase">Direct Phone</div>
                                <div className="text-xs sm:text-sm font-bold">+966 58 255 3328</div>
                            </div>
                        </a>
 
                        <a href="https://github.com/omarfaqeeh" target="_blank" rel="noopener noreferrer" className={`p-4 rounded-xl flex items-center gap-4 border transition-all ${isDarkMode ? 'bg-zinc-900 border-zinc-800 hover:border-amber-500/50' : 'bg-white border-zinc-200 shadow-sm'}`}>
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                                <Icon name="github" size={20} />
                            </div>
                            <div className="truncate">
                                <div className="text-[10px] font-mono text-zinc-500 uppercase">GitHub Repository</div>
                                <div className="text-xs sm:text-sm font-bold truncate">github.com/omarfaqeeh</div>
                            </div>
                        </a>
                    </div>
                </div>
 
                <div className={`lg:col-span-7 p-6 sm:p-8 rounded-2xl ${isDarkMode ? 'luxury-card-dark' : 'luxury-card-light'}`}>
                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                        <div className="space-y-1">
                            <h3 className="font-cinzel text-lg sm:text-xl font-bold">Send Direct Message</h3>
                            <p className="text-xs text-zinc-400 font-mono">Drop a message below and I'll get back to you shortly.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-mono uppercase text-zinc-400">Your Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder="John Doe"
                                    className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300 text-black'}`}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-mono uppercase text-zinc-400">Your Email</label>
                                <input 
                                    type="email" 
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    placeholder="john@example.com"
                                    className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300 text-black'}`}
                                />
                            </div>
                        </div>
 
                        <div className="space-y-2">
                            <label className="text-[11px] font-mono uppercase text-zinc-400">Message Details</label>
                            <textarea 
                                rows={5}
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                placeholder="Describe your project requirements or position offer..."
                                className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition-colors ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300 text-black'}`}
                            ></textarea>
                        </div>
 
                        <button 
                            type="submit"
                            className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center gap-2 ${isDarkMode ? 'bg-zinc-100 text-black hover:bg-zinc-300' : 'bg-black text-white hover:bg-zinc-800'}`}
                        >
                            <Icon name="send" size={14} />
                            <span>Send Message</span>
                        </button>
 
                        {/* Clean success confirmation — no delivery mechanism or address exposed */}
                        {submitted && (
                            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-emerald-400 pt-1">
                                <Icon name="check-circle-2" size={16} />
                                <span>Success! Your message has been sent successfully.</span>
                            </div>
                        )}
                    </form>
                </div>
 
            </div>
        </section>
    );
}
 
// --- FOOTER COMPONENT ---
function Footer({ isDarkMode }) {
    return (
        <footer className={`py-8 px-6 border-t ${isDarkMode ? 'bg-black border-zinc-900 text-zinc-500' : 'bg-white border-zinc-200 text-zinc-600'}`}>
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
                <div>© 2026 Omar Ahmad Alfaqeeh. All rights reserved.</div>
                <div className="flex items-center gap-6">
                    <a href="#hero" className="hover:text-amber-400 transition-colors">Back to top ↑</a>
                </div>
            </div>
        </footer>
    );
}
 
// --- FLOATING DEDICATED AI CHATBOT OVERLAY ---
function AIChatbotOverlay({ isDarkMode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Hello! I am Omar Alfaqeeh's specialized AI Assistant. Ask me anything about Omar's tech stack, live project links, certifications, or availability!" }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
 
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
 
    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);
 
    const handleSend = (userText) => {
        const textToSend = userText || input;
        if (!textToSend.trim()) return;
 
        const newMsgs = [...messages, { sender: 'user', text: textToSend }];
        setMessages(newMsgs);
        if (!userText) setInput('');
 
        setTimeout(() => {
            const query = textToSend.toLowerCase();
            let botReply = "Omar is a Full-Stack Web Developer & IoT Engineer skilled in C#, MERN stack (Next.js, React, Node, MongoDB), Python, Arduino Mega, Raspberry Pi 5, and n8n automations. You can view Mobtaker at https://mobtaker.vercel.app/ and Rabie Al-Qalb at https://ayah-woad.vercel.app/ !";
            
            for (let kb of AI_BOT_KNOWLEDGE) {
                if (kb.trigger.some(t => query.includes(t))) {
                    botReply = kb.response;
                    break;
                }
            }
 
            setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
        }, 300);
    };
 
    return (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
            {isOpen && (
                <div className={`mb-4 w-[92vw] sm:w-[380px] h-[460px] sm:h-[480px] rounded-2xl border shadow-2xl flex flex-col overflow-hidden animate-fadeIn ${isDarkMode ? 'bg-[#121212] border-zinc-800 text-white' : 'bg-white border-zinc-300 text-black'}`}>
                    <div className="p-4 border-b border-zinc-800 bg-zinc-900/80 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                                <Icon name="bot" size={18} />
                            </div>
                            <div>
                                <h4 className="font-cinzel text-sm font-bold">Omar's AI Assistant</h4>
                                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                                    Context Trained
                                </span>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-zinc-800">
                            <Icon name="x" size={18} />
                        </button>
                    </div>
 
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                        {messages.map((m, idx) => (
                            <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-xl leading-relaxed whitespace-pre-line ${m.sender === 'user' ? 'bg-amber-500 text-black font-medium' : (isDarkMode ? 'bg-zinc-900 border border-zinc-800 text-zinc-200' : 'bg-zinc-100 text-zinc-800')}`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
 
                    <div className="px-3 py-2 border-t border-zinc-800/60 flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono">
                        <button onClick={() => handleSend("What is Omar's stack?")} className="px-2.5 py-1 rounded-full bg-zinc-800 text-amber-300 hover:bg-zinc-700 whitespace-nowrap">
                            Stack Overview
                        </button>
                        <button onClick={() => handleSend("Tell me about Mobtaker")} className="px-2.5 py-1 rounded-full bg-zinc-800 text-amber-300 hover:bg-zinc-700 whitespace-nowrap">
                            Mobtaker Link
                        </button>
                        <button onClick={() => handleSend("What are his n8n skills?")} className="px-2.5 py-1 rounded-full bg-zinc-800 text-amber-300 hover:bg-zinc-700 whitespace-nowrap">
                            n8n Automations
                        </button>
                    </div>
 
                    <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 border-t border-zinc-800 flex items-center gap-2">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about Omar's experience..."
                            className={`flex-1 px-3 py-2 rounded-lg border text-xs focus:outline-none ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-100 border-zinc-300 text-black'}`}
                        />
                        <button type="submit" className="p-2 rounded-lg bg-amber-500 text-black font-bold flex items-center justify-center">
                            <Icon name="send" size={16} />
                        </button>
                    </form>
                </div>
            )}
 
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-2xl transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-zinc-100 text-black border border-white hover:shadow-white/20' : 'bg-black text-white border border-black'}`}
            >
                <div className="relative flex items-center justify-center">
                    <Icon name="bot" size={18} />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black animate-ping"></span>
                </div>
                <span>Ask Omar's AI</span>
            </button>
        </div>
    );
}
 
// Render React App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
 
