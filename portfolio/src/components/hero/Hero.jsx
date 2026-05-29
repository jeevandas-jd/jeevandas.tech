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
    <section id="about" style={{ padding: `${theme.spacing.xl} 0` }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: theme.spacing.xl,
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        <div>
          <FadeIn>
            {/* Status Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 24,
                background: theme.accentBg,
                padding: '6px 14px',
                borderRadius: 30,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#22c55e',
                  animation: 'pulse 2s ease-in-out infinite',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: theme.accent,
                  fontWeight: 600,
                }}
              >
                Open to opportunities
              </span>
            </div>

            {/* Name */}
            <h1
              style={{
                fontFamily: theme.fonts.heading,
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: 16,
                color: theme.colors.text,
                letterSpacing: '-0.02em',
              }}
            >
              Jeevandas{' '}
              <span
                style={{
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accentLight} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                M S
              </span>
            </h1>

            {/* Role */}
            <div style={{ marginBottom: 12 }}>
              <span
                style={{
                  fontSize: 'clamp(0.9rem, 3vw, 1.2rem)',
                  fontWeight: 500,
                  color: theme.colors.textLight,
                  borderLeft: `3px solid ${theme.accent}`,
                  paddingLeft: 12,
                }}
              >
                {data.role}
              </span>
            </div>

            {/* Location & Education */}
            <p
              style={{
                fontSize: 13,
                color: theme.colors.textMuted,
                marginBottom: 28,
                fontFamily: theme.fonts.mono,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flexWrap: 'wrap',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <LocationIcon /> {data.location}
              </span>
              <span>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <EducationIcon /> {data.education.short}
              </span>
            </p>

            {/* Bio */}
            <p
              style={{
                fontSize: 'clamp(0.875rem, 3vw, 1rem)',
                lineHeight: 1.7,
                color: theme.colors.textLight,
                maxWidth: 520,
                marginBottom: 32,
                fontWeight: 400,
              }}
            >
              {data.bio}
            </p>

            {/* Links */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1.2rem',
                alignItems: 'center',
              }}
              className="hero-links"
            >
              <a
                href={`https://${data.links.github}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12,
                  color: theme.accent,
                  textDecoration: 'none',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <GithubIcon /> GitHub
              </a>
              <a
                href={`https://${data.links.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12,
                  color: theme.accent,
                  textDecoration: 'none',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  transition: 'transform 0.2s',
                }}
              >
                <LinkedinIcon /> LinkedIn
              </a>
              <a
                href={`https://${data.links.leetcode}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12,
                  color: theme.accent,
                  textDecoration: 'none',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <LeetcodeIcon /> LeetCode
              </a>
              <a
                href={`mailto:${data.email}`}
                style={{
                  fontSize: 12,
                  color: theme.accent,
                  textDecoration: 'none',
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <EmailIcon /> Email
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Right Column - Photo & Stats */}
        <FadeIn
          delay={150}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
          className="hero-right"
        >
          <div
            style={{
              width: 'clamp(100px, 25vw, 140px)',
              height: 'clamp(100px, 25vw, 140px)',
              borderRadius: '50%',
              overflow: 'hidden',
              border: `3px solid ${theme.colors.border}`,
              boxShadow: theme.shadows.md,
              flexShrink: 0,
            }}
          >
            <img
              src={dpImage}
              alt="Jeevandas M S"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
            />
          </div>
          <HeroStats stats={stats} />
        </FadeIn>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            text-align: center;
          }
          .hero-links {
            justify-content: center;
          }
          .hero-right {
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}