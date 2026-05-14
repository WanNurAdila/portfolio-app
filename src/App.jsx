import { useState, useEffect, useRef } from 'react'
import './App.css'

// ===== Data =====

const PROJECTS = [
  {
    id: 'lumi',
    num: '01',
    name: 'Lumi',
    role: 'Solo · Design + Build',
    year: '2025',
    stack: ['Flutter', 'Dart', 'Riverpod', 'Firebase'],
    type: 'Mobile App',
    tag: 'iOS · Android',
    summary:
      'A warm, quiet habit tracker. Rituals replace streaks; reflection replaces guilt.',
    detail:
      'Designed and shipped a Flutter app focused on slow, deliberate routines. Custom motion, on-device storage, weekly reflection prompts. Currently in TestFlight.',
    repo: 'WanNurAdila/lumi',
    accentLabel: 'F-01',
    bg: '#3d2a1a',
    fg: '#efd5b0',
  },
  {
    id: 'pulse',
    num: '02',
    name: 'Pulse',
    role: 'Solo · Front-end',
    year: '2025',
    stack: ['React', 'TypeScript', 'Tailwind'],
    type: 'Dashboard',
    tag: 'Web · Desktop',
    summary:
      'An analytics dashboard with the speed of a terminal and the grace of an editorial.',
    detail:
      'Custom data-viz components, virtualized tables, command-K everywhere. Built to be the quietest tab in your browser while doing the most work.',
    repo: 'WanNurAdila/pulse',
    accentLabel: 'R-02',
    bg: '#1f2a2c',
    fg: '#d8e8e0',
  },
  {
    id: 'tbd',
    num: '03',
    name: 'In Development',
    role: 'Concept · Exploring',
    year: '2025',
    stack: ['TBD'],
    type: 'Coming Soon',
    tag: 'Sketching',
    summary:
      'Third piece in progress. Currently between two directions — letting the idea cure.',
    detail:
      'Possible directions: a tactile metronome for writers, or a small CLI for journaling.',
    repo: null,
    accentLabel: '???',
    bg: '#2a1f1a',
    fg: '#c9bca5',
  },
]

const EXPERIENCE = [
  {
    year: '2024 — Now',
    role: 'Application Developer',
    org: 'Ukuya Sdn Bhd',
    note: 'Web development + Playwright E2E automation',
  },
  {
    year: '2022 — 2024',
    role: 'Senior Front-end Developer',
    org: 'Xamble Technologies Sdn Bhd',
    note: 'Flutter app from beta to live release + distribution',
  },
  {
    year: '2019 — 2022',
    role: 'Front-end Developer',
    org: 'Redsquare Software Sdn Bhd',
    note: 'Built web & mobile apps in React and Flutter, from initiation to client handover',
  },
]

const CONTACT_EMAIL = 'wanadila94@yahoo.com'

// ===== Hooks =====

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const checkImmediate = () => {
      const rect = el.getBoundingClientRect()
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        el.classList.add('is-in')
      }
    }
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(checkImmediate)
    )

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    )
    io.observe(el)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])
  return ref
}

// ===== Shared components =====

function Reveal({
  as: Tag = 'div',
  children,
  stagger,
  style,
  className = '',
  ...rest
}) {
  const ref = useReveal()
  return (
    <Tag
      ref={ref}
      className={`${stagger ? 'pf-reveal-stagger' : 'pf-reveal'} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  )
}

function ArrowUpRight({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 11L11 5M11 5H6M11 5V10"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  )
}

// ===== TopBar =====

function TopBar({ theme, setTheme }) {
  return (
    <header
      className="pf-topbar"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        background:
          theme === 'light' ? 'rgba(244,236,221,0.88)' : 'rgba(22,17,13,0.88)',
        padding: '18px 56px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <span style={{ fontWeight: 600 }}>WAN ADILA</span>
        <span style={{ color: 'var(--paper-dim)' }}>/ INDEX</span>
      </div>

      <nav
        className="pf-nav-links"
        style={{ display: 'flex', gap: 28, justifyContent: 'center' }}
      >
        <a href="#about" className="pf-link">
          01 About
        </a>
        <a href="#work" className="pf-link">
          02 Work
        </a>
        <a href="#path" className="pf-link">
          03 Path
        </a>
        <a href="#contact" className="pf-link">
          04 Contact
        </a>
      </nav>

      <div
        style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            color: 'var(--paper-dim)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span className="pf-pulse" /> Available
        </span>
        <button
          className="pf-theme-btn"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '☀' : '☾'}
        </button>
        <a href={`mailto:${CONTACT_EMAIL}`} className="pf-email-btn">
          <span
            style={{
              width: 6,
              height: 6,
              background: 'var(--accent)',
              display: 'inline-block',
            }}
          />
          Email me
        </a>
      </div>
    </header>
  )
}

// ===== Hero =====

function Hero() {
  return (
    <section
      className="pf-section"
      style={{ padding: '80px 56px 60px', position: 'relative' }}
    >
      <Reveal>
        <div
          className="pf-hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'end',
          }}
        >
          <div>
            <div
              className="pf-mono"
              style={{
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--paper-dim)',
                marginBottom: 28,
              }}
            >
              Volume 01 · 2025
            </div>
            <h1
              className="pf-display pf-hero-h1"
              style={{
                fontSize: 130,
                lineHeight: 0.92,
                fontWeight: 400,
                letterSpacing: '-0.04em',
              }}
            >
              Front-end
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 300 }}>
                developer,
              </em>
              <br />
              <span style={{ color: 'var(--accent)' }}>building</span> with
              <br />
              Flutter{' '}
              <span
                className="pf-mono"
                style={{ fontSize: 28, verticalAlign: 'middle' }}
              >
                &amp;
              </span>{' '}
              React.
            </h1>
          </div>
          <div style={{ paddingBottom: 24 }}>
            <p style={{ fontSize: 19, lineHeight: 1.55, maxWidth: 480 }}>
              Wan Adila — independent front-end developer based in Kuala Lumpur,
              specializing in Flutter mobile apps and considered React
              interfaces. This is a working index of recent projects and the way
              I think about them.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 24,
                marginTop: 32,
                fontSize: 14,
                flexWrap: 'wrap',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="pf-pulse" /> Available for work
              </span>
              <span style={{ color: 'var(--paper-dim)' }}>·</span>
              <a href="#contact" className="pf-link">
                Read CV
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div
          className="pf-stats-grid"
          style={{
            marginTop: 80,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            borderTop: '1px solid var(--rule-strong)',
            borderBottom: '1px solid var(--rule-strong)',
            background: 'var(--rule)',
          }}
        >
          {[
            { k: 'Discipline', v: 'Front-end, mobile + web' },
            { k: 'Speciality', v: 'Flutter, React, motion' },
            { k: 'Location', v: 'Kuala Lumpur, MYS' },
            { k: 'Contact', v: CONTACT_EMAIL },
          ].map((c) => (
            <div
              key={c.k}
              style={{ background: 'var(--paper)', padding: '20px 24px' }}
            >
              <div
                className="pf-mono"
                style={{
                  fontSize: 9,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--paper-dim)',
                  marginBottom: 6,
                }}
              >
                {c.k}
              </div>
              <div style={{ fontSize: 13 }}>{c.v}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

// ===== About =====

function About() {
  const otherTools = ['Firebase', 'D3', 'Figma', 'Motion', 'Git', 'CI/CD']
  return (
    <section
      id="about"
      className="pf-section"
      style={{ padding: '100px 56px', borderTop: '1px solid var(--rule)' }}
    >
      <Reveal>
        <div
          className="pf-about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '120px 1fr 1fr',
            gap: 56,
          }}
        >
          <div
            className="pf-mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--accent-deep)',
            }}
          >
            § 01
            <br />
            About
          </div>
          <p
            className="pf-display"
            style={{
              fontSize: 36,
              lineHeight: 1.2,
              fontWeight: 400,
              letterSpacing: '-0.02em',
            }}
          >
            I treat interface work as a kind of editing — choosing what stays,
            what goes, and the exact weight of a heading.
          </p>
          <div
            style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--paper-dim)' }}
          >
            <p style={{ marginBottom: 16 }}>
              Three years building user-facing things. Most of my hours go to
              Flutter — its declarative model fits the way I think about UI as a
              tree of small, replaceable parts.
            </p>
            <p>
              On the web side, React with TypeScript, careful state, and motion
              that earns its keep. Off the keyboard, I read a lot of typography
              journals and over-think coffee brewing.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div
          style={{
            marginTop: 56,
            display: 'grid',
            gridTemplateColumns: '120px 1fr',
            gap: 56,
            alignItems: 'center',
          }}
        >
          <div
            className="pf-mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--paper-dim)',
            }}
          >
            Also fluent
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {otherTools.map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '6px 12px',
                  border: '1px solid var(--rule-strong)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ===== Work =====

function ProjectEntry({ project }) {
  const [hover, setHover] = useState(false)

  return (
    <Reveal>
      <article
        className="pf-work-entry"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr 1.2fr',
          gap: 48,
          padding: '48px 0',
          borderTop: '1px solid var(--rule-strong)',
        }}
      >
        {/* Number */}
        <div
          className="pf-display"
          style={{
            fontSize: 48,
            fontWeight: 400,
            color: 'var(--accent)',
            lineHeight: 1,
          }}
        >
          {project.num}
        </div>

        {/* Text */}
        <div>
          <div
            className="pf-mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--paper-dim)',
              marginBottom: 16,
            }}
          >
            {project.type} · {project.tag}
          </div>
          <h3
            className="pf-display pf-project-name"
            style={{
              fontSize: 84,
              lineHeight: 0.95,
              fontWeight: 500,
              letterSpacing: '-0.03em',
              marginBottom: 24,
            }}
          >
            {project.name}
          </h3>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              marginBottom: 28,
              maxWidth: 480,
            }}
          >
            {project.summary}
          </p>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: 'var(--paper-dim)',
              maxWidth: 480,
              marginBottom: 28,
            }}
          >
            {project.detail}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {project.stack.map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '5px 10px',
                  border: '1px solid var(--rule-strong)',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Thumbnail */}
        <div className="pf-work-thumb">
          <div
            style={{
              width: '100%',
              aspectRatio: '4 / 3',
              background: project.bg,
              color: project.fg,
              backgroundImage: `repeating-linear-gradient(-45deg, ${project.fg}10 0px, ${project.fg}10 8px, transparent 8px, transparent 16px)`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'flex-end',
                padding: 24,
                transition: 'transform 600ms cubic-bezier(0.2,0.7,0.2,1)',
                transform: hover ? 'translateY(0)' : 'translateY(4px)',
              }}
            >
              <div>
                <div
                  className="pf-display"
                  style={{
                    fontSize: 56,
                    lineHeight: 0.95,
                    fontWeight: 500,
                    letterSpacing: '-0.03em',
                    color: project.fg,
                  }}
                >
                  {project.name}
                </div>
                <div
                  className="pf-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: project.fg,
                    opacity: 0.7,
                    marginTop: 8,
                  }}
                >
                  {project.accentLabel} / {project.year}
                </div>
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                padding: '6px 10px',
                border: `1px solid ${project.fg}40`,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: project.fg,
              }}
            >
              {project.tag}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 14,
              fontSize: 12,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ color: 'var(--paper-dim)' }}>{project.role}</span>
            {project.repo ? (
              <a
                href={`https://github.com/${project.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pf-link"
                style={{
                  color: 'var(--accent-deep)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                github.com/{project.repo} <ArrowUpRight size={11} />
              </a>
            ) : (
              <span style={{ color: 'var(--paper-dim)' }}>Repo pending</span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  )
}

function Work() {
  return (
    <section
      id="work"
      className="pf-section"
      style={{
        padding: '100px 56px',
        borderTop: '1px solid var(--rule-strong)',
      }}
    >
      <Reveal>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 16,
          }}
        >
          <div
            className="pf-mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--accent-deep)',
            }}
          >
            § 02 · Selected Work
          </div>
          <div
            className="pf-mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--paper-dim)',
            }}
          >
            Three entries · MAY 2025
          </div>
        </div>
      </Reveal>
      <Reveal>
        <h2
          className="pf-display pf-work-h2"
          style={{
            fontSize: 96,
            lineHeight: 1,
            fontWeight: 400,
            letterSpacing: '-0.03em',
            marginBottom: 80,
            maxWidth: 1100,
          }}
        >
          A working{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 300 }}>index</em> of
          recent work, in the order I&apos;d show it.
        </h2>
      </Reveal>

      {PROJECTS.map((p) => (
        <ProjectEntry key={p.id} project={p} />
      ))}
    </section>
  )
}

// ===== Mid-page CTA =====

function MidCTA() {
  return (
    <section style={{ borderTop: '1px solid var(--rule-strong)' }}>
      <Reveal>
        <a href={`mailto:${CONTACT_EMAIL}`} className="pf-mid-cta">
          <div
            className="pf-mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              opacity: 0.55,
            }}
          >
            ↳ Interlude
          </div>
          <div>
            <div
              className="pf-display"
              style={{
                fontSize: 56,
                lineHeight: 1.05,
                fontWeight: 400,
                letterSpacing: '-0.025em',
              }}
            >
              Like what you see?{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'var(--accent)',
                }}
              >
                Let&apos;s talk.
              </em>
            </div>
            <div style={{ fontSize: 14, marginTop: 10, opacity: 0.7 }}>
              {CONTACT_EMAIL} — replies within a day
            </div>
          </div>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              border: '1px solid currentColor',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ArrowUpRight size={20} />
          </div>
        </a>
      </Reveal>
    </section>
  )
}

// ===== Experience =====

function Experience() {
  return (
    <section
      id="path"
      className="pf-section"
      style={{
        padding: '100px 56px',
        borderTop: '1px solid var(--rule-strong)',
      }}
    >
      <Reveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '120px 1fr',
            gap: 56,
            marginBottom: 60,
          }}
        >
          <div
            className="pf-mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--accent-deep)',
            }}
          >
            § 03
            <br />
            Path
          </div>
          <h2
            className="pf-display"
            style={{
              fontSize: 64,
              lineHeight: 1,
              fontWeight: 400,
              letterSpacing: '-0.03em',
            }}
          >
            Where I&apos;ve been, briefly.
          </h2>
        </div>
      </Reveal>
      <Reveal stagger>
        {EXPERIENCE.map((e, i) => (
          <div
            key={i}
            className="pf-exp-row"
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 200px 1fr 1fr',
              gap: 56,
              padding: '28px 0',
              borderTop: '1px solid var(--rule)',
              alignItems: 'baseline',
            }}
          >
            <div
              className="pf-mono"
              style={{
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
              }}
            >
              0{i + 1}
            </div>
            <div
              className="pf-mono"
              style={{ fontSize: 13, letterSpacing: '0.05em' }}
            >
              {e.year}
            </div>
            <div>
              <div
                className="pf-display"
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                }}
              >
                {e.role}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'var(--paper-dim)',
                  marginTop: 2,
                }}
              >
                {e.org}
              </div>
            </div>
            <div
              style={{
                fontSize: 14,
                lineHeight: 1.55,
                color: 'var(--paper-dim)',
              }}
            >
              {e.note}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

// ===== Contact =====

function Contact() {
  return (
    <section
      id="contact"
      className="pf-section"
      style={{
        padding: '120px 56px 80px',
        borderTop: '1px solid var(--rule-strong)',
      }}
    >
      <Reveal>
        <div
          style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 56 }}
        >
          <div
            className="pf-mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--accent-deep)',
            }}
          >
            § 04
            <br />
            Contact
          </div>
          <div>
            <h2
              className="pf-display pf-contact-h2"
              style={{
                fontSize: 120,
                lineHeight: 0.95,
                fontWeight: 400,
                letterSpacing: '-0.04em',
              }}
            >
              Tell me about
              <br />
              <em
                style={{
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'var(--accent)',
                }}
              >
                the project.
              </em>
            </h2>
            <div
              className="pf-contact-grid"
              style={{
                marginTop: 60,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 1,
                background: 'var(--rule-strong)',
                border: '1px solid var(--rule-strong)',
              }}
            >
              <a href={`mailto:${CONTACT_EMAIL}`} className="pf-contact-link">
                <div>
                  <div
                    className="pf-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      marginBottom: 6,
                      opacity: 0.6,
                    }}
                  >
                    Email
                  </div>
                  <div
                    className="pf-display"
                    style={{ fontSize: 24, fontWeight: 500 }}
                  >
                    {CONTACT_EMAIL}
                  </div>
                </div>
                <ArrowUpRight size={20} />
              </a>
              <a
                href="https://github.com/WanNurAdila"
                target="_blank"
                rel="noopener noreferrer"
                className="pf-contact-link"
              >
                <div>
                  <div
                    className="pf-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      marginBottom: 6,
                      opacity: 0.6,
                    }}
                  >
                    GitHub
                  </div>
                  <div
                    className="pf-display"
                    style={{ fontSize: 24, fontWeight: 500 }}
                  >
                    github.com/WanNurAdila
                  </div>
                </div>
                <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ===== Footer =====

function Footer() {
  return (
    <footer
      style={{
        padding: '32px 56px',
        borderTop: '1px solid var(--rule-strong)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--paper-dim)',
      }}
    >
      <span>© WAN ADILA 2025</span>
      <span style={{ textAlign: 'center' }}>
        Set in Space Grotesk &amp; Inter
      </span>
      <span style={{ textAlign: 'right' }}>Index v01 · Issue 05.25</span>
    </footer>
  )
}

// ===== Root =====

export default function App() {
  const [theme, setTheme] = useState('light')

  return (
    <div className={`pf-root pf-${theme}`}>
      <TopBar theme={theme} setTheme={setTheme} />
      <Hero />
      <About />
      <Work />
      <MidCTA />
      <Experience />
      <Contact />
      <Footer />
    </div>
  )
}
