import { Routes, Route, Link } from 'react-router-dom'
import Header from './Header.jsx'
import GenericTool from './GenericTool.jsx'
import { tools } from './toolsConfig.js'
import styles from './App.module.css'

function HomePage() {
  return (
    <div className={styles.homeWrapper}>
      <h1>Toolkit</h1>
      <ul className={styles.toolList}>
        {tools.map((tool) => (
          <li key={tool.path}>
            <Link to={tool.path}>{tool.label}</Link>
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
            element={<GenericTool endpoint={tool.path} label={tool.label} />}
          />
        ))}
      </Routes>
    </>
  )
}

export default App