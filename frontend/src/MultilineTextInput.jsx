function MultilineTextInput({ value, onChange, placeholder, readOnly }) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={12}
            readOnly={readOnly}
        />
    );
}

export default MultilineTextInput;