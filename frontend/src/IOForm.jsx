import MultilineTextInput from './MultilineTextInput.jsx';
import styles from './IOForm.module.css';

function IOForm({ input, onInputChange, output, onSubmit, loading, error, buttonLabel, note }) {
    return (
        <div className={styles.wrapper}>
            {note && (
                <p className={styles.note}>
                    {note.text}{' '}
                    <a href={note.linkHref} target="_blank" rel="noopener noreferrer">
                        {note.linkLabel}
                    </a>
                </p>
            )}

            <div className={styles.ioRow}>
                <MultilineTextInput
                    value={input}
                    onChange={onInputChange}
                    placeholder="Paste input here..."
                />

                <button onClick={onSubmit} disabled={loading} className={styles.button}>
                    {loading ? 'Processing...' : buttonLabel}
                </button>

                <MultilineTextInput
                    value={output}
                    readOnly
                    placeholder="Result will appear here..."
                />
            </div>

            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}

export default IOForm