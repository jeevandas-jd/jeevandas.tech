import { useState, useEffect } from 'react';
import { theme } from '../../constants/theme';

export function Navbar({ active, items }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(item);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(250,248,245,0.98)' : 'rgba(250,248,245,0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${theme.colors.border}`,
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: '0 auto',
            padding: `0.7rem ${theme.spacing.sm}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <a
            href="/"
            style={{
              fontFamily: theme.fonts.cursive,
              fontSize: 'clamp(14px, 4vw, 18px)',
              color: theme.colors.textMuted,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            ← jeevandas.tech
          </a>

          {/* Desktop Navigation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
            }}
            className="desktop-nav"
          >
            {items.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                style={{
                  fontSize: 12,
                  letterSpacing: '0.04em',
                  color: active === item ? theme.accent : theme.colors.textMuted,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderBottom: active === item ? `2px solid ${theme.accent}` : '2px solid transparent',
                  paddingBottom: 4,
                  transition: 'all 0.2s',
                  textTransform: 'capitalize',
                }}
              >
                {item}
              </button>
            ))}
            <a
              href="mailto:jeevandasms2004@gmail.com"
              style={{
                fontSize: 11,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: theme.accent,
                color: '#ffffff',
                padding: '8px 20px',
                textDecoration: 'none',
                fontWeight: 600,
                borderRadius: 30,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer',
              color: theme.colors.text,
              padding: 8,
            }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 60,
            left: 0,
            right: 0,
            background: theme.colors.backgroundAlt,
            borderBottom: `1px solid ${theme.colors.border}`,
            padding: theme.spacing.md,
            zIndex: 999,
            boxShadow: theme.shadows.lg,
          }}
          className="mobile-nav"
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.sm,
            }}
          >
            {items.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                style={{
                  fontSize: 16,
                  color: active === item ? theme.accent : theme.colors.text,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: `${theme.spacing.xs} 0`,
                  textAlign: 'left',
                  textTransform: 'capitalize',
                  fontWeight: active === item ? 600 : 400,
                }}
              >
                {item}
              </button>
            ))}
            <a
              href="mailto:jeevandasms2004@gmail.com"
              style={{
                display: 'inline-block',
                textAlign: 'center',
                fontSize: 14,
                background: theme.accent,
                color: '#ffffff',
                padding: '12px',
                textDecoration: 'none',
                fontWeight: 600,
                borderRadius: 30,
                marginTop: theme.spacing.xs,
              }}
            >
              Hire Me
            </a>
          </div>
        </div>
      )}

      {/* Spacer to prevent content hiding under fixed navbar */}
      <div style={{ height: 60 }} />
    </>
  );
}