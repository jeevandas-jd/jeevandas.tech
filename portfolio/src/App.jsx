import { useState, useEffect, useRef } from "react";
import dpImage from '/jeevandas_dp.png';
const data = {
  name: "Jeevandas M S",
  role: "AI & Full-Stack Developer",
  location: "Kochi, Kerala",
  email: "jeevandasms2004@gmail.com",
  phone: "+91 95622 25659",
  links: {
    github: "github.com/jeevandas-jd",
    linkedin: "linkedin.com/in/jeevandas-m-s",
    leetcode: "leetcode.com/u/jeevandas-787",
  },
  bio: "I build AI systems that work in the real world — on phones, on edge devices, in fields with no internet. I like hard problems and shipping things that actually run.",
  education: {
    school: "Cochin University of Science and Technology",
    short: "CUSAT",
    degree: "Integrated B.Sc. + M.Sc. — AI & Data Science",
    gpa: "7.4",
    years: "2023 – 2028",
  },
  experience: [
    {
      company: "Lealabs Pvt. Ltd.",
      role: "AI Intern",
      period: "May – Jul 2025",
      points: [
        "Built RAG pipelines for PDF-based Q&A using LangChain, Gemini API, ChromaDB",
        "Full document pipeline: extraction → chunking → embeddings → vector storage → retrieval",
        "Multi-agent workflows via AutoGen for document analysis and summarization",
        "Deployed services on PythonAnywhere; maintained modular pipelines via Git",
      ],
    },
  ],
  projects: [
    {
      id: "agro",
      name: "Agro Sentinel",
      badge: "6th / 540+ · IBM Hackathon 2026",
      type: "CV · Mobile · Edge AI",
      one: "AI crop damage assessment & offline insurance automation for Kerala farmers.",
      stack: ["Flutter", "PyTorch", "TFLite", "Firebase", "Gemini API", "ShuffleNetV2"],
      points: [
        "LightCDC model (3.94 MB) — ShuffleNetV2 on 23k images via PyTorch → ONNX → TFLite FP16",
        "Fully offline on-device inference in Flutter — no internet needed in rural areas",
        "Satellite microservice: GPS + date range → georeferenced before/after NDVI pairs",
        "Gemini API converts structured damage data into bilingual insurance claim narratives",
        "Feature-first Flutter + Provider, 2 devs, 2-week sprint",
      ],
      featured: true,
    },
    {
      id: "smart-home",
      name: "On-Device Smart Home Agent",
      badge: "Edge AI · IoT",
      type: "LLM · Edge · Docker",
      one: "Fine-tuned Mistral 7B running fully offline on Raspberry Pi with Matter protocol.",
      stack: ["Mistral 7B", "QLoRA", "Docker", "Matter Protocol", "React"],
      points: [
        "Fine-tuned on 481 synthetic ReAct trajectories from SimuHome (ICLR 2026)",
        "7/7 on full smart home day scenario; 50% better than baselines on temporal scheduling",
        "Three-service Docker setup: AI agent + Matter simulator + React dashboard",
      ],
      featured: false,
    },
    {
      id: "math",
      name: "Smart Math Tutor",
      badge: "Multi-Agent AI",
      type: "Python · AutoGen · LLM",
      one: "Collaborative agents that solve and verify mathematical problems in a round-robin loop.",
      stack: ["Python", "AutoGen", "SymPy", "Gemini API"],
      points: [
        "Solver Agent (SymPy) + Verifier Agent in AutoGen round-robin workflow",
        "Hybrid: LLM reasoning layered on deterministic symbolic computation",
      ],
      featured: false,
    },
    {
      id: "camprider",
      name: "Camprider",
      badge: "Full-Stack",
      type: "Node.js · MongoDB · AWS",
      one: "Campus ride-sharing platform with real-time matching and production-grade auth.",
      stack: ["Node.js", "MongoDB", "Socket.io", "AWS S3", "Lambda", "EC2"],
      points: [
        "Google OAuth, email verification, password recovery",
        "Real-time matching via WebSocket on EC2; API on Lambda",
        "Frontend on S3 + CloudFront with custom domain",
      ],
      featured: false,
    },
    {
      id: "rag",
      name: "RAG PDF Chatbot",
      badge: "LLM · RAG",
      type: "Python · LangChain · ChromaDB",
      one: "Natural language querying over any PDF via Retrieval-Augmented Generation.",
      stack: ["Python", "LangChain", "ChromaDB", "Gemini API", "PyPDF"],
      points: [
        "Semantic chunking + Google embeddings stored in ChromaDB",
        "Context-aware responses via Gemini API through CLI interface",
      ],
      featured: false,
    },
    {
      id: "pipt",
      name: "PIPT — Parallel Image Toolkit",
      badge: "Systems",
      type: "C++ · OpenMP",
      one: "High-performance image processing using OpenMP parallelism on CPU.",
      stack: ["C++", "OpenMP"],
      points: [
        "Grayscale, box blur, Sobel edge detection via row-wise domain decomposition",
        "4–5× speedup for convolution kernels across 1–16 threads on Ryzen 5",
      ],
      featured: false,
    },
  ],
  skills: {
    "Languages": ["Python", "C++", "Java", "C", "Dart"],
    "AI / ML": ["PyTorch", "TensorFlow", "scikit-learn", "TFLite", "Hugging Face", "LangChain", "RAG"],
    "Mobile": ["Flutter", "Firebase", "Provider"],
    "Agentic": ["AutoGen", "Multi-Agent Systems", "ChromaDB", "Prompt Engineering"],
    "Web / API": ["Django", "Node.js", "React", "REST APIs", "DRF"],
    "Cloud": ["AWS Lambda", "EC2", "S3", "CloudFront", "Google Cloud", "IBM watsonx"],
    "Tools": ["Git", "Docker", "OpenMP", "Pandas", "NumPy", "SymPy"],
  },
};

const accent = "#b5622a";
const accentBg = "#fdf0e8";

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Pill({ label, accent: isAccent }) {
  return (
    <span style={{
      fontSize: 11, letterSpacing: "0.04em",
      border: `1px solid ${isAccent ? accent : "#ddd8d0"}`,
      color: isAccent ? accent : "#8a8178",
      background: isAccent ? accentBg : "transparent",
      padding: "2px 8px", whiteSpace: "nowrap",
      fontFamily: "monospace",
    }}>{label}</span>
  );
}

function Section({ id, label, children }) {
  return (
    <section id={id} style={{ padding: "4rem 0", borderTop: "1px solid #e8e3dc" }}>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "140px 1fr", 
        gap: "2rem", 
        alignItems: "start",
        "@media (max-width: 768px)": {
          gridTemplateColumns: "1fr",
          gap: "0.75rem"
        }
      }}>
        <div style={{ 
          paddingTop: 4, 
          position: "sticky", 
          top: 80,
          "@media (max-width: 768px)": {
            position: "relative",
            top: 0,
            marginBottom: 8
          }
        }}>
          <p style={{ fontFamily: "'Caveat', cursive", fontSize: 15, color: "#aaa49c", letterSpacing: "0.04em" }}>
            {label}
          </p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

function ProjectCard({ p, index }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const inView = useInView(ref);

  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(16px)",
      transition: `opacity 0.45s ease ${index * 80}ms, transform 0.45s ease ${index * 80}ms`,
      border: p.featured ? `1.5px solid ${accent}` : "1px solid #e8e3dc",
      background: p.featured ? accentBg : "#faf8f5",
      marginBottom: 12,
      padding: "1.25rem 1.4rem",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {p.featured && (
            <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: accent, fontWeight: 500, marginBottom: 6 }}>
              {p.badge}
            </div>
          )}
          {!p.featured && (
            <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "#aaa49c", marginBottom: 4, fontFamily: "monospace" }}>
              {p.type}
            </div>
          )}
          <h3 style={{ fontSize: 16, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, marginBottom: 6, lineHeight: 1.3, color: "#1c1916" }}>
            {p.name}
          </h3>
          <p style={{ fontSize: 13, color: "#6b6560", lineHeight: 1.65, marginBottom: 10 }}>{p.one}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {p.stack.map(s => <Pill key={s} label={s} accent={p.featured} />)}
          </div>
        </div>
        <button 
          onClick={() => setOpen(!open)} 
          style={{
            background: "none", 
            border: "none", 
            cursor: "pointer",
            color: "#aaa49c", 
            fontSize: 20, 
            lineHeight: 1, 
            padding: "4px 8px", 
            flexShrink: 0,
            transition: "transform 0.2s", 
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            fontWeight: 300,
          }}
          aria-label={open ? "Close details" : "Open details"}
        >
          +
        </button>
      </div>

      {open && (
        <ul style={{ marginTop: 14, paddingLeft: 0, listStyle: "none", borderTop: `1px solid ${p.featured ? "#e8c9aa" : "#e8e3dc"}`, paddingTop: 12 }}>
          {p.points.map((pt, i) => (
            <li key={i} style={{ fontSize: 12.5, color: "#6b6560", lineHeight: 1.7, paddingLeft: 16, position: "relative", marginBottom: 5 }}>
              <span style={{ position: "absolute", left: 0, color: "#c4b8ac" }}>—</span>
              {pt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Logo components
const GithubLogo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 4 }}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinLogo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 4 }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.222 0 22.225 0z"/>
  </svg>
);

const LeetcodeLogo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 4 }}>
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.902 2.165 8.15 0 .303-.293.566-.624.787-.988.444-.734.647-1.562.647-2.392 0-.831-.203-1.66-.647-2.393a5.31 5.31 0 0 0-.787-.988l-4.279-4.193a1.26 1.26 0 0 0-1.746 0 1.23 1.23 0 0 0 0 1.74l4.279 4.194c.212.208.386.445.511.708.125.263.193.548.193.837 0 .289-.068.574-.193.837-.125.263-.299.5-.511.707a2.47 2.47 0 0 1-1.752.726 2.47 2.47 0 0 1-1.752-.726l-4.278-4.194a2.6 2.6 0 0 1-.51-.707 2.05 2.05 0 0 1-.193-.837c0-.289.068-.574.193-.837.125-.263.298-.5.51-.707l3.846-3.733 3.846 3.733a1.23 1.23 0 0 0 1.746 0 1.23 1.23 0 0 0 0-1.74L14.443 6.226 14.44 6.223l-1.996-1.958a1.27 1.27 0 0 0-1.745 0 1.23 1.23 0 0 0 0 1.74l1.273 1.249-3.846 3.733-3.846-3.733a1.23 1.23 0 0 1 0-1.74 1.27 1.27 0 0 1 1.745 0l3.846 3.733 1.273-1.249-3.846-3.733a3.736 3.736 0 0 0-1.104-.726 3.917 3.917 0 0 0-1.365-.265 4.06 4.06 0 0 0-1.365.265 3.747 3.747 0 0 0-1.104.726L.909 7.544C.34 8.105 0 8.856 0 9.649c0 .793.34 1.544.909 2.105l4.275 4.193 4.279 4.194c1.168 1.149 2.704 1.739 4.275 1.739 1.571 0 3.107-.59 4.275-1.739 1.168-1.149 1.753-2.658 1.753-4.266 0-1.608-.585-3.117-1.753-4.266l-4.279-4.194-1.996-1.958A1.374 1.374 0 0 0 13.483 0z"/>
  </svg>
);

const EmailLogo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 4 }}>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const PhoneLogo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 4 }}>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const LocationLogo = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 4 }}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const EducationLogo = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 4 }}>
    <path d="M12 3L1 9l11 6 11-6-11-6zm0 11.5L6.5 12.09 5 11.25V16c0 2.21 3.13 4 7 4s7-1.79 7-4v-4.75l-1.5.84L12 14.5z"/>
  </svg>
);

export default function Dev() {
  const [active, setActive] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = ["about", "experience", "projects", "skills", "education"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const navItems = ["about", "experience", "projects", "skills", "education"];

  return (
    <div style={{ background: "#faf8f5", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: "#1c1916" }}>

      {/* sticky nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(250,248,245,0.95)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid #e8e3dc",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0.7rem 2rem",
        flexWrap: "wrap",
      }}>
        <a href="/" style={{ fontFamily: "'Caveat', cursive", fontSize: 15, color: "#aaa49c", textDecoration: "none" }}>
          ← jeevandas.tech
        </a>
        
        {/* Desktop Navigation */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "1.6rem",
          "@media (max-width: 768px)": {
            display: mobileMenuOpen ? "flex" : "none",
            flexDirection: "column",
            width: "100%",
            paddingTop: "1rem",
            gap: "1rem"
          }
        }}>
          {navItems.map(item => (
            <a key={item} href={`#${item}`} style={{
              fontSize: 12, letterSpacing: "0.04em",
              color: active === item ? accent : "#9a9289",
              textDecoration: "none",
              borderBottom: active === item ? `1px solid ${accent}` : "1px solid transparent",
              paddingBottom: 1, transition: "color 0.2s, border-color 0.2s",
            }}>{item}</a>
          ))}
          <a href={`mailto:${data.email}`} style={{
            fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
            background: accent, color: "#faf8f5", padding: "6px 16px",
            textDecoration: "none", fontWeight: 500, transition: "opacity 0.15s",
            borderRadius: 2,
          }}>hire me</a>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
            color: "#9a9289",
            "@media (max-width: 768px)": {
              display: "block"
            }
          }}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* main content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 2rem" }}>

        {/* HERO - FIXED */}
        <section id="about" style={{ padding: "5rem 0 3rem" }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr auto", 
            gap: "3rem", 
            alignItems: "start",
            "@media (max-width: 768px)": {
              gridTemplateColumns: "1fr",
              gap: "2rem",
              textAlign: "center"
            }
          }}>
            <div>
              <FadeIn>
                {/* Status indicator - no emoji */}
                <div style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: 8, 
                  marginBottom: 24,
                  background: accentBg,
                  padding: "4px 12px",
                  borderRadius: 20,
                }}>
                  <span style={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: "50%", 
                    background: "#22c55e",
                    animation: "pulse 2s ease-in-out infinite",
                    display: "inline-block" 
                  }} />
                  <span style={{ 
                    fontSize: 11, 
                    letterSpacing: "0.1em", 
                    textTransform: "uppercase", 
                    color: accent, 
                    fontWeight: 600 
                  }}>Open to opportunities</span>
                </div>

                {/* Name - FIXED with gradient */}
                <h1 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(3rem, 7vw, 5rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: 16,
                  color: "#1c1916",
                  letterSpacing: "-0.02em",
                }}>
                  Jeevandas <span style={{ 
                    fontWeight: 600, 
                    color: accent,
                    background: `linear-gradient(135deg, ${accent} 0%, #d4844a 100%)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}>M S</span>
                </h1>

                {/* Role with better visibility */}
                <div style={{ marginBottom: 12 }}>
                  <span style={{
                    fontSize: "clamp(1rem, 3vw, 1.2rem)",
                    fontWeight: 500,
                    color: "#4a4540",
                    borderLeft: `3px solid ${accent}`,
                    paddingLeft: 12,
                  }}>
                    {data.role}
                  </span>
                </div>

                {/* Location & Education - no emojis */}
                <p style={{ 
                  fontSize: 13, 
                  color: "#8a8178", 
                  marginBottom: 28, 
                  fontFamily: "monospace",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  "@media (max-width: 768px)": {
                    justifyContent: "center"
                  }
                }}>
                  <span style={{ display: "inline-flex", alignItems: "center" }}>
                    <LocationLogo /> {data.location}
                  </span>
                  <span>•</span>
                  <span style={{ display: "inline-flex", alignItems: "center" }}>
                    <EducationLogo /> {data.education.short}
                  </span>
                </p>

                {/* Bio */}
                <p style={{ 
                  fontSize: 15, 
                  lineHeight: 1.7, 
                  color: "#3a3530", 
                  maxWidth: 520, 
                  marginBottom: 32,
                  fontWeight: 400,
                  "@media (max-width: 768px)": {
                    marginLeft: "auto",
                    marginRight: "auto"
                  }
                }}>
                  {data.bio}
                </p>

                {/* Links with real logos - no emojis */}
                <div style={{ 
                  display: "flex", 
                  flexWrap: "wrap", 
                  gap: "1.5rem", 
                  alignItems: "center",
                  justifyContent: "center",
                  "@media (max-width: 768px)": {
                    justifyContent: "center"
                  }
                }}>
                  <a key="github" href={`https://${data.links.github}`} target="_blank" rel="noopener noreferrer" style={{
                    fontSize: 12, 
                    color: accent, 
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "opacity 0.15s",
                    display: "inline-flex",
                    alignItems: "center",
                  }}>
                    <GithubLogo /> Github
                  </a>
                  <a key="linkedin" href={`https://${data.links.linkedin}`} target="_blank" rel="noopener noreferrer" style={{
                    fontSize: 12, 
                    color: accent, 
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "opacity 0.15s",
                    display: "inline-flex",
                    alignItems: "center",
                  }}>
                    <LinkedinLogo /> Linkedin
                  </a>
                  <a key="leetcode" href={`https://${data.links.leetcode}`} target="_blank" rel="noopener noreferrer" style={{
                    fontSize: 12, 
                    color: accent, 
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "opacity 0.15s",
                    display: "inline-flex",
                    alignItems: "center",
                  }}>
                    <LeetcodeLogo /> Leetcode
                  </a>
                  <a href={`mailto:${data.email}`} style={{
                    fontSize: 12, 
                    color: accent, 
                    textDecoration: "none",
                    fontWeight: 500,
                    display: "inline-flex",
                    alignItems: "center",
                  }}>
                    <EmailLogo /> Email
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* right col — photo + stats */}
            <FadeIn delay={150} style={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              gap: 16, 
              paddingTop: 8,
              "@media (max-width: 768px)": {
                order: -1
              }
            }}>
              <div style={{
  width: 140, 
  height: 140, 
  borderRadius: "50%",
  overflow: "hidden", 
  border: "3px solid #e8e3dc",
  boxShadow: "0 4px 20px rgba(28,25,22,0.08)",
  flexShrink: 0,
}}>
  <img src={dpImage} alt="Jeevandas M S" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
</div>

              {/* stat pair */}
              <div style={{ display: "flex", gap: 8, width: "100%" }}>
                {[
                  { n: "6th", sub: "of 540+\nIBM 2026" },
                  { n: "6+", sub: "shipped\nprojects" },
                ].map(s => (
                  <div key={s.n} style={{
                    flex: 1, background: "#f3efe8", border: "1px solid #e8e3dc",
                    padding: "10px 8px", textAlign: "center",
                  }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: "#1c1916", lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontSize: 10, color: "#aaa49c", lineHeight: 1.5, marginTop: 4, whiteSpace: "pre-line", letterSpacing: "0.02em" }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* EXPERIENCE */}
        <Section id="experience" label="experience">
          {data.experience.map(e => (
            <FadeIn key={e.company}>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.5rem", "@media (max-width: 768px)": { gridTemplateColumns: "1fr", gap: "0.75rem" } }}>
                <div style={{ minWidth: 130 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{e.company}</p>
                  <p style={{ fontSize: 12, color: accent, marginBottom: 3, fontWeight: 500 }}>{e.role}</p>
                  <p style={{ fontSize: 11, color: "#aaa49c", fontFamily: "monospace" }}>{e.period}</p>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {e.points.map((pt, i) => (
                    <li key={i} style={{ fontSize: 13, color: "#3a3530", lineHeight: 1.7, paddingLeft: 14, position: "relative", marginBottom: 6 }}>
                      <span style={{ position: "absolute", left: 0, color: accent, fontSize: 11 }}>→</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </Section>

        {/* PROJECTS */}
        <Section id="projects" label="projects">
          <p style={{ fontSize: 11, color: "#aaa49c", marginBottom: 16, letterSpacing: "0.06em" }}>
            click + to expand technical details
          </p>
          {data.projects.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
        </Section>

        {/* SKILLS */}
        <Section id="skills" label="skills">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {Object.entries(data.skills).map(([cat, items], i) => (
              <FadeIn key={cat} delay={i * 50}>
                <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 12, alignItems: "start", "@media (max-width: 768px)": { gridTemplateColumns: "1fr", gap: 6 } }}>
                  <p style={{ fontSize: 11, color: "#aaa49c", letterSpacing: "0.04em", paddingTop: 3 }}>{cat}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {items.map(s => <Pill key={s} label={s} />)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education" label="education">
          <FadeIn>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", "@media (max-width: 768px)": { flexDirection: "column", gap: 12 } }}>
              <div>
                <p style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{data.education.school}</p>
                <p style={{ fontSize: 13, color: "#6b6560", marginBottom: 4 }}>{data.education.degree}</p>
                <p style={{ fontSize: 11, color: "#aaa49c", fontFamily: "monospace" }}>{data.education.years}</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, "@media (max-width: 768px)": { textAlign: "left" } }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, lineHeight: 1 }}>
                  {data.education.gpa}
                  <span style={{ fontSize: 14, fontWeight: 400, color: "#aaa49c" }}> /10</span>
                </div>
                <p style={{ fontSize: 11, color: "#aaa49c", marginTop: 4 }}>GPA</p>
              </div>
            </div>
          </FadeIn>
        </Section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid #e8e3dc", padding: "2.5rem 0 4rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, "@media (max-width: 768px)": { flexDirection: "column", textAlign: "center" } }}>
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Jeevandas M S</p>
            <p style={{ fontSize: 11, color: "#aaa49c", display: "flex", alignItems: "center", gap: 4, "@media (max-width: 768px)": { justifyContent: "center" } }}>
              <LocationLogo /> {data.location}
            </p>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href={`mailto:${data.email}`} style={{ fontSize: 12, color: "#9a9289", textDecoration: "none", borderBottom: "1px solid #ddd8d0", paddingBottom: 1, display: "inline-flex", alignItems: "center" }}>
              <EmailLogo /> {data.email}
            </a>
            <a href={`tel:${data.phone.replace(/\s/g, "")}`} style={{ fontSize: 12, color: "#9a9289", textDecoration: "none", borderBottom: "1px solid #ddd8d0", paddingBottom: 1, display: "inline-flex", alignItems: "center" }}>
              <PhoneLogo /> {data.phone}
            </a>
          </div>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&family=Caveat:wght@600&display=swap');
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.65)} }
        @-webkit-keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.65)} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a:hover { opacity: 0.75; }
        @media (max-width: 768px) {
          nav button { display: block !important; }
        }
      `}</style>
    </div>
  );
}