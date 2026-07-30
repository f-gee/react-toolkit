import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <header className={styles.header}>
            {!isHomePage && (
                <Link to="/" className={styles.backLink}>
                    ← Back to tools
                </Link>
            )}
            <h1 className={styles.title}>Toolkit</h1>
        </header>
    );
}

export default Header;