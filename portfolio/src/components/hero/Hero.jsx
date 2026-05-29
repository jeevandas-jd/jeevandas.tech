import { FadeIn } from '../common/FadeIn';
import { HeroStats } from './HeroStats';
import { LocationIcon } from '../icons/LocationIcon';
import { EducationIcon } from '../icons/EducationIcon';
import { GithubIcon } from '../icons/GithubIcon';
import { LinkedinIcon } from '../icons/LinkedinIcon';
import { LeetcodeIcon } from '../icons/LeetcodeIcon';
import { EmailIcon } from '../icons/EmailIcon';
import dpImage from '../../assets/images/jeevandas_dp.png';
import { theme } from '../../constants/theme';

export function Hero({ data }) {
  const stats = [
    { n: "6th", sub: "of 540+\nIBM 2026" },
    { n: "6+", sub: "shipped\nprojects" },
  ];

  return (
    <section id="about" style={{ padding: "5rem 0 3rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "3rem",
          alignItems: "start",
        }}
      >
        <div>
          <FadeIn>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 24,
                background: theme.accentBg,
                padding: "4px 12px",
                borderRadius: 20,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                  animation: "pulse 2s ease-in-out infinite",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: theme.accent,
                  fontWeight: 600,
                }}
              >
                Open to opportunities
              </span>
            </div>

            <h1
              style={{
                fontFamily: theme.fonts.heading,
                fontSize: "clamp(3rem, 7vw, 5rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: 16,
                color: theme.colors.text,
                letterSpacing: "-0.02em",
              }}
            >
              Jeevandas{" "}
              <span
                style={{
                  fontWeight: 600,
                  color: theme.accent,
                  background: `linear-gradient(135deg, ${theme.accent} 0%, #d4844a 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                M S
              </span>
            </h1>

            <div style={{ marginBottom: 12 }}>
              <span
                style={{
                  fontSize: "clamp(1rem, 3vw, 1.2rem)",
                  fontWeight: 500,
                  color: "#4a4540",
                  borderLeft: `3px solid ${theme.accent}`,
                  paddingLeft: 12,
                }}
              >
                {data.role}
              </span>
            </div>

            <p
              style={{
                fontSize: 13,
                color: theme.colors.textMuted,
                marginBottom: 28,
                fontFamily: theme.fonts.mono,
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                <LocationIcon /> {data.location}
              </span>
              <span>•</span>
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                <EducationIcon /> {data.education.short}
              </span>
            </p>

            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: theme.colors.textLight,
                maxWidth: 520,
                marginBottom: 32,
                fontWeight: 400,
              }}
            >
              {data.bio}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5rem",
                alignItems: "center",
              }}
            >
              <a
                href={`https://${data.links.github}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12,
                  color: theme.accent,
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "opacity 0.15s",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <GithubIcon /> Github
              </a>
              <a
                href={`https://${data.links.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12,
                  color: theme.accent,
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "opacity 0.15s",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <LinkedinIcon /> Linkedin
              </a>
              <a
                href={`https://${data.links.leetcode}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12,
                  color: theme.accent,
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "opacity 0.15s",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <LeetcodeIcon /> Leetcode
              </a>
              <a
                href={`mailto:${data.email}`}
                style={{
                  fontSize: 12,
                  color: theme.accent,
                  textDecoration: "none",
                  fontWeight: 500,
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <EmailIcon /> Email
              </a>
            </div>
          </FadeIn>
        </div>

        <FadeIn
          delay={150}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            paddingTop: 8,
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid #e8e3dc",
              boxShadow: "0 4px 20px rgba(28,25,22,0.08)",
              flexShrink: 0,
            }}
          >
            <img
              src={dpImage}
              alt="Jeevandas M S"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
            />
          </div>
          <HeroStats stats={stats} />
        </FadeIn>
      </div>
    </section>
  );
}