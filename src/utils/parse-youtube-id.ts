export function parseYoutubeId(url: string): string | boolean {
  const regexp =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const matches = url.match(regexp);

  return matches ? matches[1] : false;
}
