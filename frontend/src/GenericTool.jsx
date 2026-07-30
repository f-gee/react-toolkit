import useApiTransform from './useApiTransform.js'
import IOForm from './IOForm.jsx'

function GenericTool({ endpoint, label }) {
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
        />
    )
}

export default GenericTool