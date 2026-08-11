const hjsonNote = {
    text: 'Accepts plain JSON as well as HJSON (comments, unquoted keys, trailing commas, etc). Output is always standard JSON.',
    linkLabel: 'Learn more about HJSON',
    linkHref: 'https://hjson.github.io/',
};

export const tools = [
    { path: '/json/beautify', label: 'JSON Beautify', group: 'json', note: hjsonNote },
    { path: '/json/minify', label: 'JSON Minify', group: 'json', note: hjsonNote },
    { path: '/js/beautify', label: 'JS Beautify', group: 'js' },
    { path: '/js/minify', label: 'JS Minify', group: 'js' },
    { path: '/base64/encode', label: 'Base64 Encode', group: 'base64' },
    { path: '/base64/decode', label: 'Base64 Decode', group: 'base64' },
];