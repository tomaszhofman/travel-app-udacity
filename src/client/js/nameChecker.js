export function checkForName(inputText) {
  const url = /^http:\/\/|^https:\/\//i;
  return url.test(inputText);
}
