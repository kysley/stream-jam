export function StreamPreview() {
  return (
    <iframe
      height={1080}
      width={1920}
      style={{ border: "none" }}
      className="stream-preview"
      src="https://player.twitch.tv/?channel=moonmoon&parent=localhost&muted=true"
    />
  );
}
