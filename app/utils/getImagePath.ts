export default function (path: string) {
  if (!path) return "/so-user-circle.png";
  return `https://image.tmdb.org/t/p/w500${path}`;
}
