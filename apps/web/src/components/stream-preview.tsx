export function StreamPreview() {
  return (
    <div
      style={{
        justifySelf: "center",
        display: "flex",
      }}
    >
      <iframe
        height={1080 * 0.5}
        width={1920 * 0.5}
        className="stream-preview"
        src="https://player.twitch.tv/?channel=moonmoon&parent=localhost&muted=true&autoplay=false"
      />
    </div>
  );
}
