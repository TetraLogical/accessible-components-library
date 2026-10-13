export function unslugify (string) {
  return string.replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toLowerCase())
    .replace(/^[a-zA-Z]/, c => c.toUpperCase());
}
