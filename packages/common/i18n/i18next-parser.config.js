module.exports = {
  locales: ['ja', 'en'],
  sort: true,
  createOldCatalogs: false,
  lexers: {
    tsx: ['JsxLexer'],
  },
  input: ['../../../apps/**/*.{ts,tsx}', '../../../packages/**/*.{ts,tsx}'],
  namespaceSeparator: '||',
  keySeparator: '::',
  keepRemoved: true,
  defaultValue: (locale, namespace, key, value) => {
    if (locale === 'ja') {
      return key
    }
    return ''
  },
}
