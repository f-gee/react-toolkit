import useApiTransform from './useApiTransform.js'
import IOForm from './IOForm.jsx'

function GenericTool({ endpoint, label, note }) {
    const { input, setInput, output, error, loading, submit } = useApiTransform(endpoint)

    return (
        <IOForm
            input={input}
            onInputChange={(e) => setInput(e.target.value)}
            output={output}
            onSubmit={submit}
            loading={loading}
            error={error}
            buttonLabel={label}
            note={note}
        />
    )
}

export default GenericTool