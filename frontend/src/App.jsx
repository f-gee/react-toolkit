import { Routes, Route, Link } from 'react-router-dom'
import Header from './Header.jsx'
import GenericTool from './GenericTool.jsx'
import DiffChecker from './DiffChecker.jsx'
import { tools } from './toolsConfig.js'
import styles from './App.module.css'

const GROUP_ICONS = {
  json: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3.5c-1.5 0-2.5 1-2.5 2.5v3c0 1-.5 1.5-1.5 2 1 .5 1.5 1 1.5 2v3c0 1.5 1 2.5 2.5 2.5" />
      <path d="M16 3.5c1.5 0 2.5 1 2.5 2.5v3c0 1 .5 1.5 1.5 2-1 .5-1.5 1-1.5 2v3c0 1.5-1 2.5-2.5 2.5" />
    </svg>
  ),
  js: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 8 5 12l4 4" />
      <path d="M15 8l4 4-4 4" />
      <path d="M13 6l-2 12" />
    </svg>
  ),
  css: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 3.5h16l-1.4 15L12 20.5l-6.6-2 -1.4-15Z" />
      <path d="M7.5 7.5h9l-.3 3.2h-6l.2 2h5.6l-.4 4-3.6 1.1-3.6-1.1-.2-2.2" />
    </svg>
  ),
  base64: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="M7 10.5v3M10 10.5v3M13 10.5l1.5 1.5-1.5 1.5M20 10.5v3" />
    </svg>
  ),
  diff: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3v12a3 3 0 0 0 3 3h7" />
      <path d="M17 3v12a3 3 0 0 1-3 3H7" />
      <path d="m14 15 3 3 3-3M10 9 7 6 4 9" />
    </svg>
  ),
}

const GROUP_LABELS = {
  json: 'JSON',
  js: 'JavaScript',
  css: 'CSS',
  base64: 'Base64',
  diff: 'Compare',
}

function HomePage() {
  return (
    <div className={styles.homeWrapper}>
      <h1 className={styles.homeTitle}>Toolkit</h1>
      <p className={styles.homeSubtitle}>Quick formatting &amp; conversion tools</p>
      <ul className={styles.toolList}>
        {tools.map((tool) => (
          <li key={tool.path}>
            <Link to={tool.path} className={styles.toolCard}>
              <span className={`${styles.toolIcon} ${styles[`icon_${tool.group}`] || ''}`}>
                {GROUP_ICONS[tool.group]}
              </span>
              <span className={styles.toolText}>
                <span className={styles.toolLabel}>{tool.label}</span>
                <span className={styles.toolGroup}>{GROUP_LABELS[tool.group]}</span>
              </span>
              <span className={styles.toolArrow} aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {tools.map((tool) => (
          <Route
            key={tool.path}
            path={tool.path}
            element={
              tool.component === 'diff'
                ? <DiffChecker />
                : <GenericTool endpoint={tool.path} label={tool.label} note={tool.note} />
            }
          />
        ))}
      </Routes>
    </>
  )
}

export default App