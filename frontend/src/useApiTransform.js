import { useState } from 'react';

function useApiTransform(endpoint) {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Something went wrong');
                setOutput('');
            } else {
                setOutput(data.result);
            }
        } catch (err) {
            setError('Failed to reach server: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return { input, setInput, output, error, loading, submit };
}

export default useApiTransform;