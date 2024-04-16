export function parseYoutubeId(url: string): string | boolean {
  const regexp: RegExp = new RegExp(
    '(?:youtube(?:-nocookie)?.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu.be/)([^"&?/s]{11})',
    "i"
  );
  const matches = url.match(regexp);

  return matches ? matches[1] : false;
}
