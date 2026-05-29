import { useState, useEffect, useRef, RefObject } from 'react'
import './App.css'
import pocketlyBanner from './assets/pocketly-banner.png'
import rhythmBanner from './assets/rhythm-app-banner.png'
import archiveWeb01 from './assets/archive-web-01.png'
import archiveWeb02 from './assets/archive-web-02.png'
import archiveWeb03 from './assets/archive-web-03.png'
import archiveWeb04 from './assets/archive-web-04.png'
import archiveWeb05 from './assets/archive-web-05.png'
import archiveApp01 from './assets/archive-app-01.png'
import archiveApp02 from './assets/archive-app-02.png'
import archiveApp03 from './assets/archive-app-03.png'
import archiveApp04 from './assets/archive-app-04.png'
import archiveApp05 from './assets/archive-app-05.png'

// ===== Types =====

interface Project {
  id: string
  num: string
  name: string
  role: string
  year: string
  stack: string[]
  type: string
  tag: string
  summary: string
  detail: string
  repo: string | null
  accentLabel: string
  bg: string
  fg: string
  bannerImg?: string
}

interface ExperienceEntry {
  year: string
  role: string
  org: string
  note: string
}

interface ArchiveProject {
  id: string
  kind: 'web' | 'app'
  name: string
  company: string
  role: string
  year: string
  summary: string
  stack: string[]
  aspect: string
}

// ===== Data =====

const PROJECTS: Project[] = [
    {
    id: 'Pocketly',
    num: '01',
    name: 'Pocketly',
    role: 'Solo · Design + Build · Testing',
    year: '2026',
    stack: ['Vue.js', 'React', 'Playwright', 'Robot Framework'],
    type: 'Website · Automation',
    tag: 'Playwright · Robot Framework',
    summary:
      'Third piece in progress. Currently between two directions — letting the idea cure.',
    detail:
      'A demo website to showcase my automation work with Playwright and Robot Framework. ',
    repo: 'WanNurAdila/pocketly',
    accentLabel: 'F-01',
    bg: '#2a1f1a',
    fg: '#c9bca5',
    bannerImg: pocketlyBanner,
  },
  {
    id: 'Rhythm',
    num: '02',
    name: 'Rhythm App',
    role: 'Solo · Design + Build',
    year: '2026',
    // stack: ['Flutter', 'Bloc Architecture', 'Supabase', 'Claude'],
    // type: 'Mobile App',
    // tag: 'Flutter · Android',
    stack: ['TBD'],
    type: 'Coming Soon',
    tag: 'Planning',
    summary:
      'A warm, quiet habit tracker. Rituals replace streaks; reflection replaces guilt.',
    detail:
      'A Flutter app focused on slow, deliberate routines. Custom motion, on-device storage, weekly reflection prompts. Designed in Claude Design. A portfolio build of the Android APK and an iOS walkthrough are on the repo.',
    repo: 'WanNurAdila/rhythm-app',
    accentLabel: 'F-02',
    bg: '#3d2a1a',
    fg: '#efd5b0',
    bannerImg: rhythmBanner,
  },
  {
    id: 'tbd',
    num: '03',
    name: 'In Development',
    role: 'Concept · Exploring',
    year: '2026',
    stack: ['TBD'],
    type: 'Coming Soon',
    tag: 'Sketching',
    summary:
      'Second piece in progress. Currently between two directions — letting the idea cure.',
    detail: 'Possible directions: a dashboard version of Pulse.',
    repo: null,
    accentLabel: '???',
    bg: '#2a1f1a',
    fg: '#c9bca5',
  },
]

const EXPERIENCE: ExperienceEntry[] = [
  {
    year: '2024 — Now',
    role: 'Application Developer',
    org: 'Ukuya Sdn Bhd',
    note: 'Flutter Web development + Playwright E2E automation',
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

const ARCHIVE: ArchiveProject[] = [
  {
    id: 'archive-app',
    kind: 'app',
    name: 'Xamble Creators-Influencer App',
    company: 'Xamble Technologies Sdn Bhd',
    role: 'Flutter Developer',
    year: '2022',
    summary:
      'Worked on the Xamble Creators mobile app from the early concept stage through to its first release on Google Play. A platform that connects smaller influencers with brands for paid social media campaigns contributed to building the core parts of the experience, including creator sign-up and profiles, browsing and applying for campaigns, an in-app cash-out request flow that submits payout tickets to the backend for finance processing.',
    stack: ['Flutter', 'Dart', 'Bloc', 'Firebase'],
    aspect: '9 / 19.5',
  },
  {
    id: 'archive-web',
    kind: 'web',
    name: 'Sansols - Online Labour System',
    company: 'Ukuya Sdn Bhd',
    role: 'Flutter developer',
    year: '2024',
    summary:
      'Contributed to SANSOLS, a government labour system for Sarawak state that replaced the legacy platform and cut worker and foreign-worker processing time from 6–9 months to just 1–2 weeks, serving both administrators and employers. Joined after the core platform was established and added a new license renewal feature, then introduced end-to-end testing with Playwright to strengthen reliability and catch regressions across critical user flows.',
    stack: ['Flutter Web', 'Dart', 'Playwright', 'Typescript'],
    aspect: '16 / 10',
  },
]

const CONTACT_EMAIL = 'wanadila94@yahoo.com'

// ===== Hooks =====

function useReveal(): RefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null)
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

interface RevealProps {
  as?: React.ElementType
  children?: React.ReactNode
  stagger?: boolean
  style?: React.CSSProperties
  className?: string
  id?: string
}

function Reveal({
  as: Tag = 'div',
  children,
  stagger,
  style,
  className = '',
}: RevealProps) {
  const ref = useReveal()
  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`${stagger ? 'pf-reveal-stagger' : 'pf-reveal'} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  )
}

interface ArrowUpRightProps {
  size?: number
}

function ArrowUpRight({ size = 14 }: ArrowUpRightProps) {
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

type Theme = 'light' | 'dark'

interface TopBarProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

function TopBar({ theme, setTheme }: TopBarProps) {
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
        <a href="#archive" className="pf-link">
          03 Archive
        </a>
        <a href="#path" className="pf-link">
          04 Path
        </a>
        <a href="#contact" className="pf-link">
          05 Contact
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
              Volume 01 · 2026
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
              An independent front-end developer based in Kuala Lumpur,
              specializing in Flutter mobile apps and considered React
              interfaces. Below: recent work, and how I think about building it.
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
            background: 'var(--rule-strong)',
            borderTop: '1px solid var(--rule-strong)',
            borderBottom: '1px solid var(--rule-strong)',
          }}
        >
          {[
            { k: 'Discipline', v: 'Front-end, mobile + web' },
            { k: 'Speciality', v: 'Flutter, React, Playwright' },
            { k: 'Location', v: 'Kuala Lumpur, MYS' },
            { k: 'Contact', v: CONTACT_EMAIL },
          ].map((c) => (
            <div key={c.k} className="pf-stat-card">
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
  const otherTools = [
    'Firebase',
    'Playwright',
    'Supabase',
    'Figma',
    'Git',
    'Claude',
  ]
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
            I treat interface work as a kind of editing. Choosing what stays,
            what goes, and the exact weight of a heading.
          </p>
          <div
            style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--paper-dim)' }}
          >
            <p style={{ marginBottom: 16 }}>
              More than five years building user-facing things. Most of my hours
              go to Flutter, its declarative model fits the way I think about UI
              as a tree of small, replaceable parts.
            </p>
            <p>
              On the web side, React with TypeScript, careful state, and motion
              that earns its keep. Off the keyboard, I read fiction, lose hours
              to games, and overthink coffee brewing..
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

interface ProjectEntryProps {
  project: Project
}

function ProjectEntry({ project }: ProjectEntryProps) {
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
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid var(--rule-strong)',
              background: 'var(--surface)',
            }}
          >
            {project.bannerImg ? (
              <img
                src={project.bannerImg}
                alt={project.name}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `repeating-linear-gradient(-45deg, rgba(239,228,208,0.06) 0px, rgba(239,228,208,0.06) 8px, transparent 8px, transparent 16px)`,
                }}
              />
            )}

            {/* Top-right chip: fixed ink/cream — never affected by banner colors */}
            <div
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                padding: '6px 10px',
                background: '#16110d',
                color: '#efe4d0',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                zIndex: 2,
              }}
            >
              <span>{project.accentLabel}</span>
              <span style={{ opacity: 0.5 }}>/</span>
              <span>{project.year}</span>
            </div>

            {/* Bottom shelf: theme-aware surface — always legible regardless of banner */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                padding: '14px 18px',
                background: 'var(--surface)',
                color: 'var(--surface-text)',
                borderTop: '1px solid var(--rule-strong)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                zIndex: 2,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 12,
                  minWidth: 0,
                }}
              >
                <span
                  className="pf-display"
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {project.name}
                </span>
                <span
                  className="pf-mono"
                  style={{
                    fontSize: 9,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--paper-dim)',
                    flexShrink: 0,
                  }}
                >
                  {project.tag}
                </span>
              </div>
              <span
                style={{
                  color: 'var(--accent-deep)',
                  transition: 'transform 320ms cubic-bezier(0.2,0.7,0.2,1)',
                  transform: hover ? 'translate(3px, -3px)' : 'translate(0,0)',
                  flexShrink: 0,
                }}
              ></span>
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
            Three entries · MAY 2026
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

// ===== Archive =====

function BrowserShot({
  label,
  aspect,
  company,
  src,
}: {
  label: string
  aspect: string
  company?: string
  src?: string
}) {
  return (
    <div
      style={{
        border: '1px solid var(--rule-strong)',
        background: '#16110d',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: 28,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 12px',
          borderBottom: '1px solid rgba(239,228,208,0.15)',
          background: 'rgba(0,0,0,0.25)',
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#c8704d',
          }}
        />
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#d4a574',
          }}
        />
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#4a3b2a',
          }}
        />
        <span
          style={{
            marginLeft: 16,
            flex: 1,
            height: 14,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: 'rgba(239,228,208,0.4)',
            letterSpacing: '0.08em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {company ?? ''}
        </span>
      </div>
      <div style={{ aspectRatio: aspect, overflow: 'hidden' }}>
        {src ? (
          <img
            src={src}
            alt={label}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(239,228,208,0.3)',
            }}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  )
}

function PhoneShot({ label, src }: { label: string; src?: string }) {
  return (
    <div
      style={{
        border: '1px solid var(--rule-strong)',
        padding: 8,
        background: 'var(--paper)',
      }}
    >
      <div
        style={{
          position: 'relative',
          aspectRatio: '9 / 19.5',
          background: '#16110d',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {src ? (
          <img
            src={src}
            alt={label}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(239,228,208,0.3)',
            }}
          >
            {label}
          </span>
        )}
        <div
          style={{
            position: 'absolute',
            top: 6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 50,
            height: 6,
            borderRadius: 3,
            background: 'rgba(0,0,0,0.5)',
            pointerEvents: 'none',
          }}
        />
      </div>
      <div
        className="pf-mono"
        style={{
          fontSize: 9,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginTop: 8,
          color: 'var(--paper-dim)',
        }}
      >
        {label}
      </div>
    </div>
  )
}

interface ArchiveEntryProps {
  project: ArchiveProject
  index: number
}

function ArchiveEntry({ project, index }: ArchiveEntryProps) {
  const isWeb = project.kind === 'web'
  return (
    <Reveal>
      <article
        className="pf-archive-entry"
        style={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr',
          gap: 48,
          padding: '56px 0',
          borderTop: '1px solid var(--rule-strong)',
        }}
      >
        <div
          className="pf-display"
          style={{
            fontSize: 48,
            fontWeight: 400,
            color: 'var(--accent)',
            lineHeight: 1,
          }}
        >
          0{4 + index}
        </div>

        <div>
          <div
            className="pf-archive-meta"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 56,
              alignItems: 'baseline',
              marginBottom: 32,
            }}
          >
            <div>
              <div
                className="pf-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--paper-dim)',
                  marginBottom: 14,
                }}
              >
                {isWeb ? 'Web · Dashboard' : 'Mobile · iOS + Android'} ·{' '}
                {project.year}
              </div>
              <h3
                className="pf-display"
                style={{
                  fontSize: 56,
                  lineHeight: 1,
                  fontWeight: 500,
                  letterSpacing: '-0.025em',
                  marginBottom: 16,
                }}
              >
                {project.name}
              </h3>
              <div
                className="pf-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--paper-dim)',
                }}
              >
                {project.role} · {project.company}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.55, marginBottom: 20 }}>
                {project.summary}
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="pf-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '4px 9px',
                      border: '1px solid var(--rule-strong)',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {isWeb ? (
            <div>
              <div
                className="pf-archive-web-strip"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.7fr 1fr',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: 'repeat(2, 1fr)',
                    gap: 16,
                  }}
                >
                  <BrowserShot
                    label="01 · Overview"
                    aspect={project.aspect}
                    company={project.company}
                    src={archiveWeb01}
                  />
                  <BrowserShot
                    label="05 · Form"
                    aspect={project.aspect}
                    company={project.company}
                    src={archiveWeb05}
                  />
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: 'repeat(3, 1fr)',
                    gap: 16,
                  }}
                >
                  <BrowserShot
                    label="02 · Table view"
                    aspect={project.aspect}
                    company={project.company}
                    src={archiveWeb02}
                  />
                  <BrowserShot
                    label="03 · Detail"
                    aspect={project.aspect}
                    company={project.company}
                    src={archiveWeb03}
                  />
                  <BrowserShot
                    label="04 · Settings"
                    aspect={project.aspect}
                    company={project.company}
                    src={archiveWeb04}
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--paper-dim)',
                }}
              >
                05 screens · {project.company}
              </div>
            </div>
          ) : (
            <div>
              <div
                className="pf-archive-app-strip"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: 16,
                }}
              >
                {[
                  { label: '01 · Login', src: archiveApp01 },
                  { label: '02 · Home', src: archiveApp02 },
                  { label: '03 · Detail', src: archiveApp03 },
                  { label: '04 · Profile', src: archiveApp04 },
                  { label: '05 · Setting', src: archiveApp05 },
                ].map(({ label, src }) => (
                  <PhoneShot key={label} label={label} src={src} />
                ))}
              </div>
              <div
                style={{
                  marginTop: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--paper-dim)',
                }}
              >
                05 screens · iOS shown · {project.company}
              </div>
            </div>
          )}
        </div>
      </article>
    </Reveal>
  )
}

function Archive() {
  return (
    <section
      id="archive"
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
            § 03 · Archive
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
            Previous roles · 2022–24
          </div>
        </div>
      </Reveal>
      <Reveal>
        <h2
          className="pf-display pf-archive-h2"
          style={{
            fontSize: 96,
            lineHeight: 1,
            fontWeight: 400,
            letterSpacing: '-0.03em',
            marginBottom: 24,
            maxWidth: 1100,
          }}
        >
          Work from a{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 300 }}>previous</em>{' '}
          role — shown in screens, not links.
        </h2>
      </Reveal>
      <Reveal>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.55,
            maxWidth: 720,
            color: 'var(--paper-dim)',
            marginBottom: 64,
          }}
        >
          Two of the projects I shipped at my last position. Client and
          identifying details are withheld; happy to talk through the decisions
          in conversation.
        </p>
      </Reveal>

      {ARCHIVE.map((p, i) => (
        <ArchiveEntry key={p.id} project={p} index={i} />
      ))}
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
            § 04
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

interface ContactCardData {
  label: string
  title: string
  href: string
  meta: string
  external?: boolean
  download?: string
}

function ContactCard({
  label,
  title,
  href,
  meta,
  external,
  download,
}: ContactCardData) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      download={download}
      className="pf-contact-link"
    >
      <div>
        <div
          className="pf-mono"
          style={{
            fontSize: 10,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            opacity: 0.6,
            marginBottom: 14,
          }}
        >
          {label}
        </div>
        <div
          className="pf-display"
          style={{
            fontSize: 28,
            lineHeight: 1.1,
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 12, marginTop: 10, opacity: 0.55 }}>{meta}</div>
      </div>
      <div className="pf-contact-arrow">
        <ArrowUpRight size={22} />
      </div>
    </a>
  )
}

function Contact() {
  const cards: ContactCardData[] = [
    {
      label: 'Email',
      title: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
      meta: 'Replies within a day',
    },
    {
      label: 'Download',
      title: 'Resume · PDF',
      href: '/wan-adila-resume.pdf',
      meta: 'Updated May 2026',
      download: 'wan-adila-resume.pdf',
    },
    {
      label: 'GitHub',
      title: '@WanNurAdila',
      href: 'https://github.com/WanNurAdila',
      meta: 'github.com/WanNurAdila',
      external: true,
    },
  ]

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
            § 05
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
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 1,
                background: 'var(--rule-strong)',
                border: '1px solid var(--rule-strong)',
              }}
            >
              {cards.map((c) => (
                <ContactCard key={c.label} {...c} />
              ))}
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
      <span>© WAN ADILA 2026</span>
      <span style={{ textAlign: 'center' }}>
        Set in Space Grotesk &amp; Inter
      </span>
      <span style={{ textAlign: 'right' }}>Index v01 · Issue 05.26</span>
    </footer>
  )
}

// ===== Root =====

export default function App() {
  const [theme, setTheme] = useState<Theme>('light')

  return (
    <div className={`pf-root pf-${theme}`}>
      <TopBar theme={theme} setTheme={setTheme} />
      <Hero />
      <About />
      <Work />
      <Archive />
      <Experience />
      <Contact />
      <Footer />
    </div>
  )
}
