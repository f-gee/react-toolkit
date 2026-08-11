import { useMemo, useState } from 'react';
import { diffLines } from 'diff';
import MultilineTextInput from './MultilineTextInput.jsx';
import styles from './DiffChecker.module.css';

function buildRows(original, changed) {
    const parts = diffLines(original, changed);
    const rows = [];

    parts.forEach((part) => {
        const type = part.added ? 'added' : part.removed ? 'removed' : 'unchanged';
        const lines = part.value.split('\n');
        // A trailing newline produces an empty final element from split(); drop it
        // so we don't render a phantom blank row.
        if (lines[lines.length - 1] === '') lines.pop();
        lines.forEach((line) => rows.push({ type, line }));
    });

    return rows;
}

function DiffChecker() {
    const [original, setOriginal] = useState('');
    const [changed, setChanged] = useState('');

    const rows = useMemo(() => buildRows(original, changed), [original, changed]);
    const additions = rows.filter((r) => r.type === 'added').length;
    const deletions = rows.filter((r) => r.type === 'removed').length;
    const hasContent = original.length > 0 || changed.length > 0;
    const isIdentical = hasContent && additions === 0 && deletions === 0;

    return (
        <div className={styles.wrapper}>
            <div className={styles.ioRow}>
                <div className={styles.inputCol}>
                    <span className={styles.inputLabel}>Original</span>
                    <MultilineTextInput
                        value={original}
                        onChange={(e) => setOriginal(e.target.value)}
                        placeholder="Paste original text here..."
                    />
                </div>
                <div className={styles.inputCol}>
                    <span className={styles.inputLabel}>Changed</span>
                    <MultilineTextInput
                        value={changed}
                        onChange={(e) => setChanged(e.target.value)}
                        placeholder="Paste changed text here..."
                    />
                </div>
            </div>

            {hasContent && (
                <div className={styles.resultSection}>
                    <div className={styles.stats}>
                        <span className={styles.statAdded}>+{additions}</span>
                        <span className={styles.statRemoved}>-{deletions}</span>
                        {isIdentical && <span className={styles.identical}>No differences</span>}
                    </div>

                    <div className={styles.diffOutput}>
                        {rows.map((row, i) => (
                            <div key={i} className={`${styles.diffLine} ${styles[row.type]}`}>
                                <span className={styles.marker}>
                                    {row.type === 'added' ? '+' : row.type === 'removed' ? '−' : '\u00A0'}
                                </span>
                                <span className={styles.lineText}>{row.line || '\u00A0'}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DiffChecker;
